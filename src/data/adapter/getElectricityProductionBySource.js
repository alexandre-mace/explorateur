import data from "../dataset/electricity/electricity-production-by-source.json";
import defaultOwidAdapter from "./owid/defaultOwidAdapter";

const getElectricityProductionBySource = (country, year) => {
    return defaultOwidAdapter(data, country, year, (key) => key.includes('TWh'))
}

export default getElectricityProductionBySource