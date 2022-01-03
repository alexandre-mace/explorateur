import data from "../dataset/ch4/ch4-emissions-by-sector.json";
import defaultOwidAdapter from "./owid/defaultOwidAdapter";

const getCh4EmissionsBySector = (country, year) => {
    return defaultOwidAdapter(data, country, year, (key) => key.includes('CAIT'))
}

export default getCh4EmissionsBySector