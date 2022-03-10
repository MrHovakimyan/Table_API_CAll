import { BASE_URL, FLAG_URL } from "../config.js";

class COVID19CountryData {
  #endpoint = "countries";

  async fetchCountry(code) {
    // Addflag
    // function getFlag(code) {
    //   const response = await fetch(`${FLAG_URL}`);
    // }
    try {
      code.toLowerCase();
      const response = await fetch(`${BASE_URL}${this.#endpoint}/${code}`);
      const data = await response.json();

      return this.#transform(data);
    } catch (error) {
      alert("Please enter valid country code", error);
    }
  }

  async fetchCountries() {
    try {
      const response = await fetch(`${BASE_URL}${this.#endpoint}`);
      const dataObj = await response.json();

      return dataObj.data.map(this.#transformAll);
    } catch (error) {
      console.log("Ooooops", error);
    }
  }

  #transformAll(item) {
    return {
      countryCode: item.code,
      countryName: item.name,
      population: item.population,
      deaths: item.latest_data.deaths,
      confirmed: item.latest_data.confirmed,
      recovered: item.latest_data.recovered,
      updatedAt: item.updated_at,
    };
  }
  #transform(item) {
    return {
      countryCode: item.data.code,
      countryName: item.data.name,
      population: item.data.population,
      deaths: item.data.latest_data.deaths,
      confirmed: item.data.latest_data.confirmed,
      recovered: item.data.latest_data.recovered,
      updatedAt: item.data.updated_at,
    };
  }
}

export default new COVID19CountryData();
