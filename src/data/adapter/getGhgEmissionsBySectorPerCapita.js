import data from "../dataset/ghg/emissions/ghg-emissions-by-sector-per-capita.json";
import defaultOwidAdapter from "./owid/defaultOwidAdapter";

const getGhgEmissionsBySectorPerCapita = (country, year) => {
    return defaultOwidAdapter(data, country, year, (key) => key.includes('per capita'))
}

export default getGhgEmissionsBySectorPerCapita