import formatLabels from "../../../utils/formatLabels";

const defaultOwidAdapter = (data, country, year, keyDifferentiator, countries = null) => {
    let chartCountries = Array.from(new Set(data.map(datum => datum.Entity)))
    const countryData = countries ? data : data.filter(datum => country === datum.Entity)

    if (country && year) {
        const yearCountryData = countryData.filter(datum => parseInt(datum.Year) === parseInt(year))

        let chartData = []
        yearCountryData.forEach(countryDatum => {
            Object.keys(countryDatum).filter(key => keyDifferentiator(key)).forEach(key => {
                chartData.push({
                    name: formatLabels(key),
                    y: countryDatum[key]
                })
            })
        })

        return {
            countries: countries ?? chartCountries,
            years: countryData.map(datum => datum.Year).reverse(),
            data: chartData
        }
    }

    if (country) {
        let chartData = []
        countryData.forEach(countryDatum => {
            Object.keys(countryDatum).filter(key => keyDifferentiator(key)).forEach(key => {
                if (!chartData.find(datum => formatLabels(datum.name) === formatLabels(key))) {
                    chartData.push({
                        name: formatLabels(key),
                        data: []
                    })
                }

                chartData.find(datum => formatLabels(datum.name) === formatLabels(key)).data.push((isNaN(parseFloat(countryDatum[key])) ? 0 : parseFloat(countryDatum[key])))
            })
        })

        return {
            countries: countries ?? chartCountries,
            years: countryData.map(datum => datum.Year),
            data: chartData
        }
    }
}

export default defaultOwidAdapter