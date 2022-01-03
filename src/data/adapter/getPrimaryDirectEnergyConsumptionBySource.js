import data from "../dataset/energy/primary-direct-energy-consumption-by-source.json";
import defaultOwidAdapter from "./owid/defaultOwidAdapter";

const getPrimaryDirectEnergyConsumptionBySource = (country, year) => {
    return defaultOwidAdapter(data, country, year, (key) => key.includes('TWh'))
}

export default getPrimaryDirectEnergyConsumptionBySource