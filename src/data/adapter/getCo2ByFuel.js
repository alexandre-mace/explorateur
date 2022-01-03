import data from "../dataset/co2/co2-by-source-1830.json";
import defaultOwidAdapter from "./owid/defaultOwidAdapter";

const getCo2ByFuel = (country, year) => {
    return defaultOwidAdapter(data, country, year, (key) => key.includes('Annual'))
}

export default getCo2ByFuel