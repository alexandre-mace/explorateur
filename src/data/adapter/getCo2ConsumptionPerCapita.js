import data from "../dataset/co2/consumption/co2-consumption-per-capita.json";
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

const getCo2ConsumptionPerCapita = (countries, year) => {
    const years = data.filter(datum => datum.Entity === 'Africa').map(datum => datum.Year);
    const allCountries = Array.from(new Set(data.map(datum => datum.Entity)))

    if (year) {
        let chartData = [];
        countries.forEach(country => {
            chartData.push({
                name: country,
                y: []
            })
        })

        data.filter(datum => parseInt(datum.Year) === parseInt(year)).forEach(datum => {
            if (countries.includes(datum.Entity)) {
                chartData.find(chartDatum => chartDatum.name === datum.Entity).y = parseFloat((datum['Annual consumption-based CO2 emissions (per capita)']).toFixed(2))
            }
        })

        return {
            countries: allCountries,
            years: years,
            data: chartData
        }
    }

    let chartData = [];
    countries.forEach(country => {
        chartData.push({
            name: country,
            data: []
        })
    })

    data.forEach(datum => {
        if (countries.includes(datum.Entity)) {
            chartData.find(chartDatum => chartDatum.name === datum.Entity).data.push(parseFloat((datum['Annual consumption-based CO2 emissions (per capita)']).toFixed(2)))
        }
    })

    return {
        countries: allCountries,
        years: years.reverse(),
        data: chartData
    }
}

export default getCo2ConsumptionPerCapita