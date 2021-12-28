import frenchData from "../dataset/energy/final-consumption-by-source-france.json";
import worldData from "../dataset/energy/final-consumption-by-source-world.json";

const getFinalConsumptionBySource = (country, year) => {
    const countries = ['Monde', 'France']
    let countryData = worldData
    if (country === 'France') {
        countryData = frenchData
    }

    if (country && year) {
        let chartData = []

        countryData.forEach(countryDatum => {
            Object.keys(countryDatum).filter(key => (!['Year', 'Units'].includes(key)) && parseInt(year) === countryDatum.Year).forEach(key => {
                chartData.push({
                    name: key,
                    y: countryDatum[key]
                })
            })
        })


        return {
            years: countryData.map(datum => datum.Year).reverse(),
            countries: countries,
            data: chartData
        }
    }

    if (country) {
        let chartData = []

        countryData.forEach(countryDatum => {
            Object.keys(countryDatum).filter(key => !['Year', 'Units'].includes(key)).forEach(key => {
                if (!chartData.find(datum => datum.name === key)) {
                    chartData.push({
                        name: key,
                        data: []
                    })
                }

                chartData.find(datum => datum.name === key).data.push(countryDatum[key])
            })
        })

        return {
            countries: countries,
            years: countryData.map(datum => datum.year),
            data: chartData
        }
    }

}

export default getFinalConsumptionBySource