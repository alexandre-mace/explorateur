import data from "../dataset/nitrous-oxide/nitrous-oxide-emissions-by-sector.json";
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

const getNitrousOxideBySector = (country, year) => {
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
            ) &&
            parseInt(datum.Year) === parseInt(year)
        )

        let chartData = []

        countryData.forEach(countryDatum => {
            Object.keys(countryDatum).filter(key => key.includes('CAIT')).forEach(key => {
                chartData.push({
                    name: convertLabels(key),
                    y: countryDatum[key]
                })
            })
        })

        return {
            countries: chartCountries,
            data: chartData,
            years: countryData.map(datum => datum.Year)
        }
    }

    if (country) {
        const countryData = data.filter(datum =>
            (
                ((countries.getName(datum.Code, "fr", {select: "official"}) === country) ||
                ((country === 'Monde' && datum.Code === 'WORLD') || (country === 'Monde' && datum.Code === 'OWID_WRL'))) &&
                parseInt(datum.Year) > 1830
            )
        )

        const years = countryData.map(datum => datum.Year)
        let chartData = []

        countryData.forEach(countryDatum => {
            Object.keys(countryDatum).filter(key => key.includes('CAIT')).forEach(key => {
                if (!chartData.find(datum => convertLabels(datum.name) === convertLabels(key))) {
                    chartData.push({
                        name: convertLabels(key),
                        data: []
                    })
                }

                chartData.find(datum => convertLabels(datum.name) === convertLabels(key)).data.push(countryDatum[key])
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
    let convertedLabel = label.replace(' (N2O emissions, CAIT)', '')
    return  convertedLabel.charAt(0).toUpperCase() + convertedLabel.slice(1);
}

export default getNitrousOxideBySector