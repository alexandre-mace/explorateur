import data from "../dataset/atmospheric-concentration/global-co2-concentration-ppm.json";

const getCo2Concentration = () => {
    const chartData = data.map(datum => [datum.Year, datum['CO2 concentrations (NOAA, 2018)']])

    return {
        data: [{
            name: 'CO2 concentrations (NOAA, 2018)',
            data: chartData
        }]
    }
}

export default getCo2Concentration