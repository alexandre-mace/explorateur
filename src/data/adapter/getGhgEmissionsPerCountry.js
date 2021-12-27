import data from "../dataset/ghg/emissions/ghg-emissions-per-country.json";
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

const getGhgEmissionsPerCountry = (selectedCountries, year) => {
    const years = data.filter(datum => datum.Entity === 'Afghanistan').map(datum => datum.Year);
    const allCountries = Array.from(new Set(
        data
            .filter(datum => typeof countries.getName(datum.Code, "fr", {select: "official"}) !== 'undefined')
            .map(datum => countries.getName(datum.Code, "fr", {select: "official"}))
    ))

    if (year) {
        let chartData = [];
        selectedCountries.forEach(country => {
            chartData.push({
                name: country,
                y: []
            })
        })

        data.filter(datum => parseInt(datum.Year) === parseInt(year)).forEach(datum => {
            if (selectedCountries.includes(countries.getName(datum.Code, "fr", {select: "official"}))) {
                chartData
                    .find(chartDatum => chartDatum.name === countries.getName(datum.Code, "fr", {select: "official"}))
                    .y = parseFloat((datum['Total GHG emissions including LUCF (CAIT)'] / 1000000).toFixed(2))
            }
        })

        return {
            countries: allCountries,
            years: years,
            data: chartData
        }
    }

    let chartData = [];
    selectedCountries.forEach(country => {
        chartData.push({
            name: country,
            data: []
        })
    })

    data.forEach(datum => {
        if (selectedCountries.includes(countries.getName(datum.Code, "fr", {select: "official"}))) {
            chartData
                .find(chartDatum => chartDatum.name === countries.getName(datum.Code, "fr", {select: "official"}))
                .data.push(parseFloat((datum['Total GHG emissions including LUCF (CAIT)'] / 1000000).toFixed(2)))
        }
    })

    return {
        countries: allCountries,
        years: years.reverse(),
        data: chartData
    }
}

export default getGhgEmissionsPerCountry