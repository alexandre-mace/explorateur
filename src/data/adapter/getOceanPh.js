import data from "../dataset/climate-change/ocean-ph.json";

const getTemperatureAnomaly = () => {
    const chartData = data.filter(datum => datum['ocean_ph_yearly_average'] !== '').map(datum => datum['ocean_ph_yearly_average'])
    const dates = data.filter(datum => datum['ocean_ph_yearly_average'] !== '').map(datum => datum.Day)

    return {
        dates: dates,
        data: [{
            name: 'Acidification de l\'océan',
            data: chartData
        }]
    }
}

export default getTemperatureAnomaly