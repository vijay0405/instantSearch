
const search_input = document.getElementById('search');

let search_term = '';

search_input.addEventListener('input', e => {
    search_term = e.target.value;
    showCountries();
});

let countries;

const fetchCountries = async () => {
    countries = await fetch(
        'https://restcountries.eu/rest/v2/all'
    ).then(res => res.json());
};

const results = document.getElementById('results');



const showCountries = async () => {
    results.innerHTML = '';

    await fetchCountries();

    const ul = document.createElement('ul');
    ul.classList.add('countries');

    countries
        .filter(country =>
            country.name.toLowerCase().includes(search_term.toLowerCase())
        ).forEach(country => {
            const li = document.createElement('li');
            li.classList.add('country-item');

            const country_flag = document.createElement('img');
            country_flag.src = country.flag;
            country_flag.classList.add('country-flag');

            const country_name = document.createElement('h3');
            country_name.innerText = country.name;
            country_name.classList.add('country-name');

            const country_info = document.createElement('div');
            country_info.classList.add('country-info');

            const country_population = document.createElement('h2');
            country_population.innerText = numberWithCommas(country.population);
            country_population.classList.add('country-population');

            const country_popupation_text = document.createElement('h5');
            country_popupation_text.innerText = 'Population';
            country_popupation_text.classList.add('country-population-text');

            country_info.appendChild(country_population);
            country_info.appendChild(country_popupation_text);

            const currency_info = document.createElement('div');
            currency_info.classList.add('currency-info');
          
            const currency_name = document.createElement('h2');
            currency_name.innerText = numberWithCommas(country.currencies[0].name) + '(' + country.currencies[0].symbol + ')';
            currency_name.classList.add('country-population');
            currency_info.appendChild(currency_name);
            li.appendChild(country_flag);
            li.appendChild(country_name);
            li.appendChild(country_info);
            li.appendChild(currency_info);

            ul.appendChild(li);
            // ul.appendChild(currency_info);

        });

    results.appendChild(ul);
};

showCountries();

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}