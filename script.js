'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  // const languages = Object.values(data.languages);
  // const currencies = Object.values(data.currencies);
  ///////////////////////////////////////////////////////
  // <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
  // <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
  ///////////////////////////////////////////////////////////////
  const html = `<article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 10000000
        ).toFixed(1)} people</p>

        <p class="country__row"><span>🗣️</span>${
          data.languages[Object.keys(data.languages)[0]]
        }</p>
     <p class="country__row"><span>💰</span>${
       data.currencies[Object.keys(data.currencies)[0]].name
     }</p>
      </div>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     ///////////////////////////////////////////////////////
//     const languages = Object.values(data.languages);
//     // const currencies = Object.values(data.currencies);
//     ///////////////////////////////////////////////////////
//     // <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
//     // <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
//     ///////////////////////////////////////////////////////////////
//     const html = `<article class="country">
//       <img class="country__img" src="${data.flags.png}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 10000000
//         ).toFixed(1)} people</p>

//         <p class="country__row"><span>🗣️</span>${languages}</p>
//      <p class="country__row"><span>💰</span>${
//        data.currencies[Object.keys(data.currencies)[0]].name
//      }</p>
//       </div>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('india');

// const getCountryAndNeighbour = function (country) {
//   //AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     ///////////////////////////////////////////////////////
//     renderCountry(data);

//     // const neighbors =data.borders?.[0]  ////////For countries with no borders
//     const [neighbors] = data.borders;

//     if (!neighbors) return;
//     //AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbors}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       // console.log(this.responseText);
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryAndNeighbour('india');
// getCountryAndNeighbour('pakistan');
// // getCountryAndNeighbour('usa');

// setTimeout(() => {
//   console.log('1 sec passes');
//   setTimeout(() => {
//     console.log('1 sec passes');
//     setTimeout(() => {
//       console.log('1 sec passes');
//       setTimeout(() => {
//         console.log('1 sec passes');
//         setTimeout(() => {
//           console.log('1 sec passes');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]); //[0] cause the data is in array format. so [0] means the first entry of the data which is the country
//     });
// };

const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbors = data[0].borders?.[0];//////////////to check for countries with no borders
//       // const neighbors = data[0].borders[0];
//       const neighbors = 'dwwdw';
//       if (!neighbors) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbors}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })

//     // err => alert(err)

//     .then(data => {
//       // console.log(data);
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.log(err);
//       renderError(`Something went wrong ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then(data => {
      console.log(data);

      renderCountry(data[0]);
      const neighbors = data[0].borders?.[0]; //////////////to check for countries with no borders
      // const neighbors = data[0].borders[0];
      if (!neighbors) throw new Error('Country Does not have any neighbors');

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbors}`,
        `Country not found`
      );
    })

    // err => alert(err)

    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.log(err);
      renderError(` ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});
getCountryData('australia');
