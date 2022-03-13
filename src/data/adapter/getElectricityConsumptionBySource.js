import data from "../dataset/electricity/electricity-consumption-by-source-per-capita.json";
import defaultOwidAdapter from "./owid/defaultOwidAdapter";

const getElectricityConsumptionBySource = (country, year) => {
    return defaultOwidAdapter(data, country, year, (key) => key.includes('kWh'))
}

export default getElectricityConsumptionBySource