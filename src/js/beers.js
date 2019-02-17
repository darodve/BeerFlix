import striptags from 'striptags';
import { openHeader } from './ui';
import api from './api';
import defaultImg from './../images/default.jpg';

const { getBeers } = api();

const NUM_MAX_BEERS = 6;
const NUM_MAX_PPAL_BEERS = 2;


const templateBeer = ({ beerId, name, image, description, likes, price, principal}) => `
    <div id="${beerId}" class="card ${principal ? 'principal' : 'secondary close'}">
        <header class="card-header">
            <h2><a href="./detail.html?id=${beerId}">${name}</a></h2>
        </header>
        <div class="card-content">
            <div class="card-content-image">
                <img src="${ image ? image : defaultImg }">
            </div>
            <div class="card-content-text">
                <p>${striptags(description)}
                </p>
                <div class="rating-container">
                 <span class="fas fa-thumbs-up"></span><span class="likes">${likes}</span>
                </div>
            </div>
        </div>
    </div>

`;

const renderBeers = (element, beers) => {
    const htmlBeers = beers.slice(0, NUM_MAX_BEERS).map((beer, index) => {
        if(index < NUM_MAX_PPAL_BEERS){
            return templateBeer({
                ...beer,
                principal: true
            });
        }
        return templateBeer({...beer, principal: false});
    }).join('');
    element.innerHTML = htmlBeers;
    const headers = document.querySelectorAll('.card.secondary .card-header');
    headers.forEach((header) => {
        const id = header.parentNode.getAttribute('id');
        header.addEventListener('click', openHeader(id));
    });
};

export const renderDOMBeers = async (query) => {
    try{
        const fetchBeers = await getBeers(query);
        const beerSection = document.getElementById('beer-section');
        renderBeers(beerSection, fetchBeers);
    } catch(e) {
        console.error(e);
    }
};

renderDOMBeers();