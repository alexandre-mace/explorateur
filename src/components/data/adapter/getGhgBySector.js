import data from "../dataset/historical_emissions.json";
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

const getGhgBySector = (country, year) => {
    const years = Object.keys(data[0]).filter(datum => !isNaN(datum))
    let chartCountries = Array.from(
        new Set(
            (data
                .filter(datum => typeof countries.getName(datum.Country, "fr", {select: "official"}) !== 'undefined')
                .map(datum => countries.getName(datum.Country, "fr", {select: "official"}))
            )
        )
    )
    chartCountries.unshift('Monde')

    if (country && year) {
        const chartData = data.filter(datum =>
            (
                (countries.getName(datum.Country, "fr", {select: "official"}) === country) ||
                (country === 'Monde' && datum.Country === 'WORLD')
            ) &&
            datum.Gas === "All GHG" &&
            !["Total including LUCF", "Total excluding LUCF", "Energy"].includes(datum.Sector)
        ).map(datum => ({
             name: datum.Sector,
             y: datum[year.toString()]
        }))

        return {
            countries: chartCountries,
            years: years.reverse(),
            data: chartData
        }
    }

    if (country) {
        const chartData = data.filter(datum =>
            (
                (countries.getName(datum.Country, "fr", {select: "official"}) === country) ||
                (country === 'Monde' && datum.Country === 'WORLD')
            ) &&
            datum.Gas === "All GHG" &&
            !["Total including LUCF", "Total excluding LUCF", "Energy"].includes(datum.Sector)
        ).map(datum => ({
            name: datum.Sector,
            data: Object.keys(datum).filter(key => !isNaN(key)).map(key => datum[key])
        }))

        return {
            countries: chartCountries,
            years: years.reverse(),
            data: chartData
        }
    }
}

export default getGhgBySector