import data from "../dataset/energy/primary-direct-energy-consumption-by-source.json";
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

const getPrimaryDirectEnergyConsumptionBySource = (country, year) => {
    let chartCountries = Array.from(
        new Set(
            (data
                .map(datum => datum.Entity)
            )
        )
    )

    if (country && year) {
        const countryData = data.filter(datum => country === datum.Entity && parseInt(datum.Year) === parseInt(year))

        let chartData = []
        countryData.forEach(countryDatum => {
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
            years: countryData.map(datum => datum.Year)
        }
    }

    if (country) {
        const countryData = data.filter(datum => country === datum.Entity)
        const years = countryData.map(datum => datum.Year)
        let chartData = []

        countryData.forEach(countryDatum => {
            Object.keys(countryDatum).filter(key => key.includes('TWh')).forEach(key => {
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
    let convertedLabel = label.replace(' Consumption - TWh', '').replace(' Generation - TWh', '').replace(' - TWh', '')
    return  convertedLabel.charAt(0).toUpperCase() + convertedLabel.slice(1);
}

export default getPrimaryDirectEnergyConsumptionBySource