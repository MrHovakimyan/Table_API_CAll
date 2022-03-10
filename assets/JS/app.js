// Imports
import countryData from "./api/countryData.js";
import { countryMarkUp } from "./markups/dataMarkUp.js";
import { checkObj } from "./helpers/checkObj.js";
import sortByProp from "./helpers/sortTable.js";
import pagination, { renderPages } from "./helpers/pagination.js";

// Elements
const $tableBody = document.querySelector("#tbody");
const $inputSearch = document.querySelector(".inputSearch");
const $fetch = document.querySelector(".fetch");
const $fetchAll = document.querySelector(".fetchAll");
const $countryCode = document.querySelector("#countryCode");
const $countryName = document.querySelector("#countryName");
const $population = document.querySelector("#population");
const $updatedAt = document.querySelector("#updatedAt");
const $inputCountryCode = document.querySelector("#inputCountryCode");
const $inputCountryName = document.querySelector("#inputCountryName");
const $inputCountryPopulation = document.querySelector("#inputCountryPopulation");
const $inputDeaths = document.querySelector("#inputDeaths");
const $inputConfirmed = document.querySelector("#inputConfirmed");
const $inputRecovered = document.querySelector("#inputRecovered");
const $inputUpdatedAt = document.querySelector("#inputUpdatedAt");
const $submitFormBtn = document.querySelector("#formBtn");

// Initial Data
const covidCountries = [];
let countriesForRender = [];
let itemDroppedOverIndex;
let up = 0;
let prevSortStr = "";
let dataPerPage = 10;
let currentPage = 1;
let pageCount = 0;

//---------------- Event Listeners ----------------//
$fetch.addEventListener("click", handleFetchCountry);
$fetchAll.addEventListener("click", handleFetchCountries);
$inputSearch.addEventListener("input", search);
$countryCode.addEventListener("click", () => {
  handleCountriesSort("countryCode");
});
$countryName.addEventListener("click", () => {
  handleCountriesSort("countryName");
});
$population.addEventListener("click", () => {
  handleCountriesSort("population");
});
$updatedAt.addEventListener("click", () => {
  handleCountriesSort("updatedAt");
});

//------------------------ Submit Form Listeners -----------------------------------------//

$submitFormBtn.addEventListener("click", handleSubmit);

//------------------------ Drag&Drop & PageButtons listeners ------------------------//
function addListenersToDraggables() {
  const $draggables = document.querySelectorAll(".draggable");
  $draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", handleDragStart);
    draggable.addEventListener("dragend", handleDragEnd);
    draggable.addEventListener("dragover", handleDragOver);
  });
}
function addListenersToPageButtons() {
  const $pageBtn = document.querySelectorAll(".page-list_item");
  $pageBtn.forEach((pBtn) => {
    const pageIndex = Number(pBtn.getAttribute("data-id"));
    pBtn.addEventListener("click", () => {
      handlePageination(pageIndex);
    });
  });
}

//------------------- Event handlers/functions -------------------//

//----- Handle Drag Events Start -----///
function handleDragStart(evn) {
  evn.target.classList.add("dragging");
  console.log("drag starts", evn.target);
}

function handleDragEnd(evn) {
  const element = document.querySelector(".dragging");
  console.log("element", element);
  const pageStartIndex = (currentPage - 1) * dataPerPage;
  console.log("pageStartIndex", pageStartIndex);
  const elemIndex = pageStartIndex + Number(element.getAttribute("data-index"));
  // Number(element.getAttribute("data-index")) => is the number of the item in current page/slicedArray
  console.log("elemIndex: ", elemIndex, "itemDroppedOverIndex: ", itemDroppedOverIndex);

  if (elemIndex < itemDroppedOverIndex) {
    // e.g. [1, 2, 3, 4]
    covidCountries.splice(itemDroppedOverIndex, 0, covidCountries[elemIndex]); // replacing itemDroppedOverIndex
    covidCountries.splice(elemIndex, 1); // removing elemIndex
  } else if (elemIndex > itemDroppedOverIndex) {
    const removed = covidCountries.splice(elemIndex, 1);
    covidCountries.splice(itemDroppedOverIndex, 0, removed[0]);
  }
  evn.target.classList.remove("dragging");
  render();
  itemDroppedOverIndex = undefined;
}

function handleDragOver() {
  const pageStartIndex = (currentPage - 1) * dataPerPage;

  itemDroppedOverIndex = pageStartIndex + Number(this.getAttribute("data-index"));
}
//----- Handle Drag Events End -----//

async function handleFetchCountry() {
  let countryCode = prompt("Please enter valid country code", "am");

  try {
    const data = await countryData.fetchCountry(countryCode);
    console.log("fetched country data", data);
    checkObj(covidCountries, data);
    checkObj(countriesForRender, data);
    countriesForRender = [...covidCountries];
    console.log("ourArr called after entering countryCody", covidCountries);
    $inputSearch.value = "";
    render();
  } catch (error) {
    console.log(error);
  }
}

async function handleFetchCountries() {
  try {
    const data = await countryData.fetchCountries();
    console.log("All fetched data", data);
    if (covidCountries.length < data.length) {
      covidCountries.push(...data);
      // countriesForRender = [...covidCountries];
      render();
    }
    console.log("Our arr: covidCountries", covidCountries);
    $inputSearch.value = "";
  } catch (error) {
    console.log(error);
  }
}

function handleCountriesSort(sortBy) {
  if (prevSortStr === sortBy) {
    // clicked same sortBtn 2 or 3... time
    up++;
    if (up > 2) {
      up = 0;
      prevSortStr = "";
      render();
      return;
    }
  } else {
    // to call sort function when previous state(prevSortStr) defers form current sortBy,
    // have been clicked on other SortBtn
    up = 1;
  }
  prevSortStr = sortBy;
  console.log("up", up);
  let sortedArr = sortByProp(countriesForRender, sortBy, up);
  render(sortedArr);
}

function handlePageination(pageIndex) {
  currentPage = pageIndex;
  render();
}

function handleSubmit(e) {
  e.preventDefault();
  let countryCodeSubmit = $inputCountryCode.value;
  let submitData = {
    countryCode: countryCodeSubmit.toUpperCase(),
    countryName: $inputCountryName.value,
    population: $inputCountryPopulation.value,
    deaths: $inputDeaths.value,
    confirmed: $inputConfirmed.value,
    recovered: $inputRecovered.value,
    updatedAt: $inputUpdatedAt.value,
  };
  checkObj(covidCountries, submitData);
  render();
  console.log("OurArr-covidCountries after submit:", covidCountries);

  $inputCountryCode.value = "";
  $inputCountryName.value = "";
  $inputCountryPopulation.value = "";
  $inputDeaths.value = "";
  $inputConfirmed.value = "";
  $inputRecovered.value = "";
  $inputUpdatedAt.value = "";
}
//------------------------------------------------------------------//

//---------------------- Serving Functions ----------------------//

function render(countriesData) {
  let canAddListeners = false;
  if (!countriesData) {
    canAddListeners = true;
    pageCount = renderPages(covidCountries, dataPerPage, currentPage);
    addListenersToPageButtons();
    countriesData = pagination(covidCountries, dataPerPage, currentPage);
    console.log("countriesData: RenderPerPage", countriesData);
    countriesForRender = [...countriesData];
  }

  $tableBody.innerHTML = countriesData.map(countryMarkUp).join("");
  canAddListeners && addListenersToDraggables();
}

function search() {
  const searchValue = $inputSearch.value.toLowerCase();
  if (!searchValue) {
    // If there is nothing to search, then render by Sliced/paginated covidCountries
    render();
    return;
  }
  const countryDataValues = covidCountries.map((data) =>
    Object.values(data).join("_").toLowerCase()
  );
  // console.log(countryDataValues); => it's an array with strings, each one represents given object's values
  const filteredCountries = covidCountries.filter((_countryData, i) =>
    countryDataValues[i].includes(searchValue)
  );
  countriesForRender = sortByProp(filteredCountries, prevSortStr, up);
  render(countriesForRender);
}
