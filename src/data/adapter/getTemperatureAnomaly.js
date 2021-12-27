import data from "../dataset/climate-change/temperature-anomaly.json";

const getTemperatureAnomaly = () => {
    const chartData = data.map(datum => datum['temperature_anomaly'])
    const dates = data.map(datum => datum.Day)

    return {
        dates: dates,
        data: [{
            name: 'Réchauffement climatique',
            data: chartData
        }]
    }
}

export default getTemperatureAnomaly