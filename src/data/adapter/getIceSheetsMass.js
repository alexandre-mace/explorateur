import data from "../dataset/climate-change/ice-sheets-mass.json";

const getIceSheetMass = (glacier) => {
    const relatedData = data
        .filter(datum => (datum['Entity'] === (glacier === 'Groenland' ? 'Greenland' : 'Antarctica')) && datum['ice_mass_change'] !== '' && datum['land_ice_mass'] === '')

    return {
        dates: relatedData.map(datum => datum.Day),
        data: [{
            name: 'Modification de la masse des calottes glaciaires - ' + glacier,
            data: relatedData.map(datum => datum['ice_mass_change'])
        }]
    }
}

export default getIceSheetMass