const countriesContainer = document.getElementById("countries");
const statusText = document.getElementById("status");
const searchInput = document.getElementById("search");

let allCountries = [];

// Loading state
statusText.textContent = "🌍 Loading countries...";

// Fetch API
fetch("https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags")
  .then(response => response.json())
  .then(data => {
    allCountries = data;
    statusText.textContent = "";
    displayCountries(allCountries);
  })
  .catch(error => {
    statusText.textContent = "❌ Unable to load data. Check internet or try again.";
  });

// Display function
function displayCountries(countries) {
  countriesContainer.innerHTML = "";

  if (countries.length === 0) {
    statusText.textContent = "🔍 No country found.";
    return;
  }

  statusText.textContent = "";

  countries.forEach(country => {
    const card = document.createElement("div");
    card.className = "country-card";

    card.innerHTML = `
      <img src="${country.flags.png}" alt="Flag">
      <h3>${country.name.common}</h3>
      <p><b>Capital:</b> ${country.capital ? country.capital[0] : "N/A"}</p>
      <p><b>Region:</b> ${country.region}</p>
      <p><b>Population:</b> ${country.population.toLocaleString()}</p>
    `;

    countriesContainer.appendChild(card);
  });
}

// Search feature
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allCountries.filter(country =>
    country.name.common.toLowerCase().includes(value)
  );

  displayCountries(filtered);
});
