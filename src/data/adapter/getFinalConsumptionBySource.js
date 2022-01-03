import frenchData from "../dataset/energy/final-consumption-by-source-france.json";
import worldData from "../dataset/energy/final-consumption-by-source-world.json";
import defaultOwidAdapter from "./owid/defaultOwidAdapter";

const getFinalConsumptionBySource = (country, year) => {
    const countries = ['Monde', 'France']
    let countryData = worldData
    if (country === 'France') {
        countryData = frenchData
    }

    return defaultOwidAdapter(countryData, country, year, (key) => (!['Year', 'Units'].includes(key)), countries)
}

export default getFinalConsumptionBySource