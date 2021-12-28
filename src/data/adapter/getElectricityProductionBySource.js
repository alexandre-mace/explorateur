import data from "../dataset/electricity/electricity-production-by-source.json";
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

const getElectricityProductionBySource = (country, year) => {
    let chartCountries = Array.from(
        new Set(
            (data
                .filter(datum => typeof countries.getName(datum.Code, "fr", {select: "official"}) !== 'undefined')
                .map(datum => countries.getName(datum.Code, "fr", {select: "official"}))
            )
        )
    )
    chartCountries.unshift('Monde')

    if (country && year) {
        const countryData = data.filter(datum =>
            (
                (countries.getName(datum.Code, "fr", {select: "official"}) === country) ||
                ((country === 'Monde' && datum.Code === 'WORLD') || (country === 'Monde' && datum.Code === 'OWID_WRL'))
            )
        )

        let chartData = []

        countryData.filter(datum => parseInt(datum.Year) === parseInt(year)).sort((a, b) => parseInt(a.Year) - parseInt(b.Year)).forEach(countryDatum => {
            Object.keys(countryDatum).filter(key => key.includes('TWh')).forEach(key => {
                chartData.push({
                    name: convertLabels(key),
                    y: countryDatum[key]
                })
            })
        })

        return {
            countries: chartCountries,
            data: chartData,
            years: countryData.sort((a, b) => parseInt(a.Year) - parseInt(b.Year)).map(datum => datum.Year).reverse()
        }
    }

    if (country) {
        const countryData = data.filter(datum =>
            (
                ((countries.getName(datum.Code, "fr", {select: "official"}) === country) ||
                ((country === 'Monde' && datum.Code === 'WORLD') || (country === 'Monde' && datum.Code === 'OWID_WRL')))
            )
        )

        const years = countryData.sort((a, b) => parseInt(a.Year) - parseInt(b.Year)).map(datum => datum.Year)
        let chartData = []

        countryData.forEach(countryDatum => {
            Object.keys(countryDatum).filter(key => key.includes('TWh')).forEach(key => {
                if (!chartData.find(datum => convertLabels(datum.name) === convertLabels(key))) {
                    chartData.push({
                        name: convertLabels(key),
                        data: []
                    })
                }

                chartData
                    .find(datum => convertLabels(datum.name) === convertLabels(key))
                    .data.push((isNaN(parseFloat(countryDatum[key])) ? 0 : parseFloat(countryDatum[key])))
            })
        })

        return {
            countries: chartCountries,
            years: years,
            data: chartData
        }
    }
}

const convertLabels = (label) => {
    let convertedLabel = label.replace('Electricity from ', '').replace(' (TWh)', '')
    return  convertedLabel.charAt(0).toUpperCase() + convertedLabel.slice(1);
}

export default getElectricityProductionBySource