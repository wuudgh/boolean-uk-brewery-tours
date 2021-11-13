// Step One: Listen to the form
// a: querySelect #select-state-form

// Step Two: Update state with user input
// a: eventListener type "submit"

// Step Three: Get data from API using the user input
let state = {
  selectStateInput: "",
  breweries: [],
  cities: [],
  filters: {
    type: "",
    city: [],
    search: ""
  }
};

function render() {
  renderBreweriesList(state);
}

function setState(newState) {
  state = { ...state, ...newState };
  render();
}

function filterBreweries(data) {
  const breweriesFiltered = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].brewery_type === "micro") {
      breweriesFiltered.push(data[i]);
    }
    if (data[i].brewery_type === "regional") {
      breweriesFiltered.push(data[i]);
    }
    if (data[i].brewery_type === "brewpub") {
      breweriesFiltered.push(data[i]);
    }
  }
  return breweriesFiltered;
}

const selectStateForm = document.querySelector("#select-state-form");

const mainEl = document.querySelector("main");

selectStateForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const selectStateInput = document.querySelector("#select-state");

  const stateInput = selectStateInput.value;

  console.log("Form Submitted!", stateInput);

  fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateInput}`)
    .then((response) => response.json())
    .then((object) => {
      //console.log("Data from API: ", object);

      const breweries = filterBreweries(object);
      setState({ breweries });
    });
});

const headerH1 = document.createElement("h1");
headerH1.innerText = "List of Breweries";
mainEl.append(headerH1);

const header = document.createElement("header");
header.className = "search-bar";
mainEl.append(header);

const searchForm = document.createElement("form");
searchForm.id = "search-breweries-form";
header.append(searchForm);

const serchLable = document.createElement("label");
serchLable.setAttribute("for", "search-breweries");

searchForm.append(serchLable);

const h2Label = document.createElement("h2");
h2Label.innerText = "search breweries:";
serchLable.append(h2Label);

const searchInput = document.createElement("input");
searchInput.id = "search-breweries";
/*searchInput.name = "search-breweries";
searchInput.type = "text";*/
searchInput.innerText = `${h2Label.value}`;
searchForm.append(searchInput);

const artEl = document.createElement("article");
mainEl.append(artEl);

const listEl = document.createElement("ul");
listEl.className = "breweries-list";
artEl.append(listEl);
//console.log(listEl);
//})
function renderBreweriesList(state) {
  const breweries = state.breweries;
  renderFilter(state.breweries);
  //console.log("breweries", state.breweries);
  for (let i = 0; i < breweries.length; i++) {
    let brewery = breweries[i];
    //console.log("Inside renderBreweriesList: ", breweries);

    //console.log("Inside brewery loop: ", breweries[i].street);

    const listItemEl = document.createElement("li");
    listEl.append(listItemEl);

    const h2Elment = document.createElement("h2");
    h2Elment.innerText = breweries[i].name;
    listItemEl.append(h2Elment);

    const divEl = document.createElement("div");
    divEl.className = "type";
    divEl.innerText = `${breweries[i].brewery_type};`;
    listItemEl.append(divEl);

    const addressSection1 = document.createElement("section");
    addressSection1.className = "address";
    listItemEl.append(addressSection1);

    const addressHeading2 = document.createElement("h3");
    addressHeading2.innerText = "Address:";
    addressSection1.append(addressHeading2);

    const addressSection3 = document.createElement("p");
    addressSection3.innerText = breweries[i].street;
    addressSection1.append(addressSection3);

    const postCodeEl = document.createElement("p");
    const postCodeElOne = document.createElement("strong");
    postCodeEl.append(postCodeElOne);
    postCodeElOne.innerText = `${breweries[i].city}, ${breweries[i].postal_code}`;
    addressSection1.append(postCodeEl);

    const section2 = document.createElement("section");
    section2.className = "phone";
    listItemEl.append(section2);

    const h3El = document.createElement("h3");
    h3El.innerText = "Phone:";
    section2.append(h3El);

    const pElment = document.createElement("p");
    pElment.innerText = `${breweries[i].phone}`;
    section2.append(h3El, pElment);

    const section3 = document.createElement("section");
    section3.className = "link";
    listItemEl.append(section3);

    const aElement = document.createElement("a");
    aElement.href = `${breweries[i].website_url}`;
    aElement.target = "_blank";
    aElement.innerText = "Vist Website";
    section3.append(aElement);
  }
}
/*add it to state for the 'filter by city' section
- For filter by type use a select element to capture user input
- For filter by city use a list of checkbox elements to capture user input*/

function renderFilter(stateData) {
  const asideEl = document.createElement("aside");
  asideEl.className = "filter-section";
  mainEl.append(asideEl);

  const h2Elment = document.createElement("h2");
  h2Elment.innerText = "Filter By";
  asideEl.append(h2Elment);
  //console.log(asideEl);
  //console.log("Inside filterList: ", "breweries");

  const filterForm1 = document.createElement("form");
  filterForm1.id = "filter-by-type-form";
  asideEl.append(filterForm1);

  const labelEl = document.createElement("label");
  labelEl.setAttribute("for", "filter-by-type");
  filterForm1.append(labelEl);

  const h3El = document.createElement("h3");
  h3El.innerText = "Type of Brewery";
  labelEl.append(h3El);

  const selectEl = document.createElement("select");
  selectEl.id = "filter-by-type";
  filterForm1.append(selectEl);

  const filterOptionType = document.createElement("option");
  filterOptionType.innerText = "select type";
  filterOptionType.value = "";
  selectEl.append(filterOptionType);

  const filterByNameMicro = document.createElement("option");
  filterByNameMicro.innerText = "Micro";
  filterByNameMicro.value = "micro";
  selectEl.append(filterByNameMicro);

  const filterByNameRegional = document.createElement("option");
  filterByNameRegional.innerText = "Regiona";
  filterByNameRegional.value = "regional";
  selectEl.append(filterByNameRegional);

  const filterByNameBrewpub = document.createElement("option");
  filterByNameBrewpub.innerText = "Brewpub";
  filterByNameBrewpub.value = "brewpub";
  selectEl.append(filterByNameBrewpub);

  const divEl = document.createElement("div");
  divEl.className = "filer-by-city-heading";
  asideEl.append(divEl);

  const cities = document.createElement("h3");
  cities.innerText = "cities";
  divEl.append(cities);

  const buttonEl = document.createElement("button");
  buttonEl.className = "clear-all-btn";
  buttonEl.innerText = "clear all";
  divEl.append(buttonEl);

  const filterForm2 = document.createElement("form");
  filterForm2.id = "filter-by-city-form";
  asideEl.append(filterForm2);

  const inputEl = document.createElement("input");
  inputEl.type = "checkbox";
  inputEl.name = "chardon";
  inputEl.value = "chardon";
  filterForm2.append(inputEl);

  const inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", "chardon");
  inputLabel.innerText = "chardon";
  inputEl.append("inputLabel");
}
