const API_KEY='0WVVAEF-1XYMK8G-QPVB9Q0-1ZZ2QNP';

const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/') => {
    const SEARCH_API_URL = `${API_URL}beers?search=`;
    const BEERS_URL = `${API_URL}beers`;
    return {
        createComment: async (id, text) => {
            try{
                const response = await fetch(`${BEERS_URL}/${id}/comment`, {
                    method: 'POST',
                    body: JSON.stringify({
                        quote: text
                    }),
                    headers: {
                        'Content-type': 'application/json',
                        'X_API_KEY': API_KEY
                    }
                });
                if(!response.ok){
                    throw 'Error';
                }
                const beer = await fetch(`${BEERS_URL}/${id}`, {
                    method: 'GET',
                    headers: {
                      'X-API-KEY': API_KEY,
                    },
                  });
                  const json = await beer.json();
                  return json.beer;
                //const quote = await response.json();
                //return quote;
            } catch(e) {
                console.error(e);
                throw e;
            }
        },
        getBeers: async (query) => {
            try{
                const requestUrl = query ?
                    `${SEARCH_API_URL}${query}` :
                    BEERS_URL;
                const response = await fetch(requestUrl,{
                    method: 'GET',
                    headers: {
                        'X-API-KEY': API_KEY
                    }
                });
                const data = await response.json();
                return data.beers;
            } catch(e) {
                console.error(e);
                throw e;
            }
        },
        getBeerDetail: async (id) => {
            try{
                const response = await fetch(`${BEERS_URL}/${id}`,{
                    method: 'GET',
                    headers: {
                        'X-API-KEY': API_KEY
                    }
                });
                const datum = await response.json();
                return datum.beer;
            } catch(e) {
                console.error(e);
            }
            
        }
    };

};

export default api; 