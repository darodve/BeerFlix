import striptags from 'striptags';
import './styles/detail.scss';
import api from './js/api';
import './js/quoteForm';
import defaultImage from './images/default.jpg';

const { getBeerDetail } = api();

const detailTemplate = ({ beerId, name, description, image, price, likes }) => `
    <header id="${beerId}">
        <div class="title-section">
            <h1>${name}</h1>
        </div>
        <div class="image-container">
            <img src="${image ? image : defaultImage }"
        </div>
    </header>
    <div class="content">
        ${striptags(description)}
    </div>
`;

const renderDetail = async () => {
    try{
        const [, id] = window.location.search ?
            window.location.search.split('=') : [];
        const beer = await getBeerDetail(id);
        const beerHTML = detailTemplate(beer);

        document.getElementById('detail').innerHTML = beerHTML;

    } catch(e) {
        console.error(e);
    }
};

renderDetail();

console.log('DETAIL!!');