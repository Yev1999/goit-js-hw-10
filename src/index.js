import './css/styles.css';
let debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

const countryList = document.querySelector('.country-list');
const country_Info = document.querySelector('.country-info');


input.addEventListener("input", debounce((event) => {if (event.target.value.trim() !== "")
                                                            {fetchCountries(event.target.value.trim())
                                                                            .then(countries => {if (countries)
                                                                                 (renderCountries(countries))})}
                                                    else {
                                                        // TODO: remove markup
                                                        countryList.innerHTML = "";
                                                        country_Info.innerHTML= "";
                                                    }}, DEBOUNCE_DELAY)); 

function renderCountries(countries) { 
    countryList.innerHTML = "";
    country_Info.innerHTML= "";
    console.log(countries);
    
    if (countries.length > 1) {
        if (countries.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');

        } else {

        // TODO : all countries
        const countryList = document.querySelector('.country-list');

        countries.map(country => {
            let listItem = `<li class="flex">
                                <img class="flag" src="${country.flag}" />
                                <span class="contry_name">${country.name}</span>
                            </li>`;
            countryList.insertAdjacentHTML('beforeend', listItem);
        });
        }

    } else {
        // TODO : one country
        const countryData = countries[0];
        const country_Info = document.querySelector('.country-info');
        let languages = "";
        countryData.languages.map(language => {
             languages = languages + `${language.name}, `;
            });

        const countryInfo = `<h1 class="contry_name_info">
            <img class="flag" src="${countryData.flag}" />
            ${countryData.name}
        </h1>
        <p class="info_text">Capital: ${countryData.capital}</p>
        <p class="info_text">Population: ${countryData.population}</p>
        <p class="info_text">Languages: ${languages.substring(0, languages.length - 2)}</p>`;
        country_Info.insertAdjacentHTML('beforeend', countryInfo);
    }
}
