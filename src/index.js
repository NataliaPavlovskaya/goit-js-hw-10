import './css/styles.css';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs ={
searchBox: document.querySelector('#search-box'),
countryList: document.querySelector('.country-list'),
countryInfo: document.querySelector('.country-info'),
}


refs.searchBox.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY))

function onCountryInput() {
  const name = refs.searchBox.value.trim()
  if (name === '') {
    return (refs.countryList.innerHTML = ''),(refs.countryInfo.innerHTML = '')
  }

  fetchCountries(name)
    .then(countries => {
        refs.countryList.innerHTML = ''
        refs.countryInfo.innerHTML = ''
      if (countries.length === 1) {
        refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
        refs.countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries))
      } else if (countries.length >= 10) {
        alertTooManyMatches()
      } else {
        refs.countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
      }
    })
    .catch(alertWrongName)
}

function renderCountryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `
    })
    .join('')
  return markup;
}

function renderCountryInfo(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      return `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
        </ul>
        `
    })
    .join('')
  return markup;
}

function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name')
}

function alertTooManyMatches() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}









// const refs = {
//     searchBox: document.querySelector('#search-box'),
//     countryList: document.querySelector('.country-list'),
//     countryInfo: document.querySelector('.country-info'),
//   };

//   refs.searchBox.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));


// function clearData() {
//     refs.countryList.innerHTML = '';
//     refs.countryInfo.innerHTML = '';
//   };

// function handleSearch(event) {
//     const inputValue = event.target.value.trim();
//     if (inputValue === '') {
//       clearData();
//       return;
//     }
//     fetchCountries(inputValue)
//       .then(countries => {
//         if (countries.length > 10) {
//           clearData();
//           Notiflix.Notify.info('Too many matches found. Please enter a more specific query!');
//           return;
//         }
//         else if (countries.length === 1) {
//           const country = countries[0];
//           refs.countryInfo.innerHTML = `
//           <div class="info-title">
//           <img src = "${country.flag}" alt = Flag of"${country.name}">
//           <h1>${country.name}</h1>
//           <p><span>Capital:</span> ${country.capital}</p>
//           <p><span>Population:</span> ${country.population}</p>
//           <p><span>Languages:</span> ${country.languages}</p>
//           </div>
//           `;
//           refs.countriesList.innerHTML = '';
//           return;
//         }
//         refs.countryInfo.innerHTML = '';
//         refs.countriesList.innerHTML = countries.map(country => {
//           return `
//           <li>
//           <span>${country.name}</span>
//           </li>
//           `;
//         }).join('');
//       })
//       .catch(error => {
//         Notiflix.Notify.failure('Oops, there is no country with that name');
//       });
//   }
