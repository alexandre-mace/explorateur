import data from "../dataset/nitrous-oxide/nitrous-oxide-emissions-by-sector.json";
import defaultOwidAdapter from "./owid/defaultOwidAdapter";

const getNitrousOxideBySector = (country, year) => {
    return defaultOwidAdapter(data, country, year, (key) => key.includes('CAIT'))
}

export default getNitrousOxideBySector