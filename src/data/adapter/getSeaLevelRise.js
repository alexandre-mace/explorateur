import data from "../dataset/climate-change/sea-level-rise.json";

const getTemperatureAnomaly = () => {
    const chartData = data.map(datum => datum['sea_level_rise_average'])
    const dates = data.map(datum => datum.Day)

    return {
        dates: dates,
        data: [{
            name: 'Montée du niveau de la mer',
            data: chartData
        }]
    }
}

export default getTemperatureAnomaly