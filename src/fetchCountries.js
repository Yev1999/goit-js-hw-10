import { Notify } from 'notiflix/build/notiflix-notify-aio';

function fetchCountries(name) {
    const url = `https://restcountries.com/v2/name/${name}`
    const params = `?fields=name,capital,population,flag,languages`;

    return fetch(url+params)
                    .then(response => {
                        // Response handling
                        if (!response.ok) {
                            throw new Error(response.status);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        // Error handling
                        console.log(error);
                        Notify.failure('Oops, there is no country with that name');
                    });
   
};

export {fetchCountries};