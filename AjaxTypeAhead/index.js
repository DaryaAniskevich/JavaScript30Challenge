const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then((data) => data.json())
  .then((data) => cities.push(...data));

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

function filterCities(searchValue, cities) {
  const regExp = new RegExp(searchValue, 'gi');
  return cities.filter((place) => {
    return place.city.match(regExp) || place.state.match(regExp);
  });
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(e) {
  suggestions.innerHTML = filterCities(e.target.value, cities)
    ?.map((place) => {
      const regex = new RegExp(e.target.value, 'gi');
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${e.target.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${e.target.value}</span>`
      );
      return `<li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>`;
    })
    .join('');
}
