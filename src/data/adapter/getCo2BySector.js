import data from "../dataset/co2/co2-emissions-by-sector.json";
import defaultOwidAdapter from "./owid/defaultOwidAdapter";

const getCo2BySector = (country, year) => {
    return defaultOwidAdapter(data, country, year, (key) => key.includes('CAIT'))
}

export default getCo2BySector