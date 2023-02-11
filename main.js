const countriesElem = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const dropElem = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const regionName = document.getElementsByClassName("regionName");
const search = document.querySelector(".search");
const countryName = document.getElementsByClassName("countryName");
const toggle = document.querySelector(".toggle");
const moon = document.querySelector(".moon");

async function getCountry() {
  const url = await fetch("https://restcountries.com/v2/all");
  const res = await url.json();
  console.log(res);
  res.forEach((element) => {
    showCountry(element);
  });
}

getCountry();
function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = ` <div class="country-img">
            <img src="${data.flag}"alt=" ">
        </div>
        <div class="country-info">
            <h5 class="countryName">${data.name}</h5>
            <p><strong>Population </strong> ${data.population}</p>
             <p class="regionName"><strong>Region </strong> ${data.region}</p>
              <p><strong>Capital </strong>${data.capital}</p>
        </div>`;
  countriesElem.appendChild(country);
  country.addEventListener("click", () => {
    showCountryDetails(data);
  });
}
dropDown.addEventListener("click", () => {
  dropElem.classList.toggle("showDropDrown");
});
region.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element);
    Array.from(regionName).forEach((el) => {
      if (
        el.innerText.includes(element.innerText) ||
        element.innerText == "All"
      ) {
        el.parentElement.parentElement.style.display = "grid";
      } else {
        el.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
search.addEventListener("input", () => {
  console.log(search.value);
});
search.addEventListener("input", () => {
  Array.from(countryName).forEach((el) => {
    if (el.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      el.parentElement.parentElement.style.display = "grid";
    } else {
      el.parentElement.parentElement.style.display = "none";
    }
  });
});
const countryModal = document.querySelector(".countryModal");
function showCountryDetails(data) {
  countryModal.classList.toggle("show");
  countryModal.innerHTML = ` 
   <button class="back">Back</button>
          <div class="modal">
            <div class="leftModal">
              <img src="${data.flag}" alt=" " />
            </div>
            <div class="rightModal">
              <h1> ${data.name}</h1>
              <div class="modalinfo">
                <div class="innerLeft inner">
                  <p><strong>Native Name </strong> ${data.nativeName}</p>
                  <p><strong>Popolation </strong> ${data.population}</p>
                  <p><strong>Region </strong>${data.region}</p>
                  <p><strong>Sub Region </strong>${data.subregion}</p>
                </div>
                <div class="innerRight inner">
                  <p><strong>Capital </strong> ${data.capital}</p>
                  <p><strong>Top Level Domain </strong> ${data.topLevelDomain.map(
                    (el) => el
                  )}</p>
                  <p><strong>Currencies </strong>${data.currencies.map(
                    (el) => el.code
                  )}</p>
                  <p><strong>Languages </strong>${data.languages.map(
                    (el) => el.name
                  )}</p>
                </div>
              </div>
            </div>
          </div>
  `;
  const back = countryModal.querySelector(".back");
  back.addEventListener("click", () => {
    countryModal.classList.toggle("show");
  });
}
