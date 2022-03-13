const formatLabels = (label) => {
    label = label
        .replace(' Consumption - TWh', '')
        .replace(' Generation - TWh', '')
        .replace(' - TWh', '')
        .replace(' (CH4 emissions, CAIT)', '')
        .replace('Electricity from ', '')
        .replace(' (TWh)', '')
        .replace(' (per capita) (GHG Emissions, CAIT)', '')
        .replace(' (N2O emissions, CAIT)', '')
        .replace(' (CAIT, 2020)', '')
        .replace('Annual CO2 emissions from ', '')
        .replace(' (zero filled)', '')
        .replace(' electricity per capita (kWh)', '')

    switch (label) {
        case 'Oil':
        case 'oil':
        case 'Oil products':
            return 'Pétrole 🛢️'
        case 'Crude oil':
            return 'Pétrole non raffiné 🛢️'
        case 'Coal':
        case 'coal':
            return 'Charbon 🚂'
        case 'Gas':
        case 'gas':
        case 'Natural gas':
            return 'Gaz 😶‍🌫️'
        case 'Electricity':
            return 'Électricité ⚡'
        case 'Electricity/Heat':
        case 'Electricity & Heat':
            return 'Électricité ⚡ / Chauffage ♨️'
        case 'Transportation':
        case 'Transport':
            return 'Transport 🚋'
        case 'Agriculture':
            return 'Agriculture 🐄'
        case 'Manufacturing/Construction':
        case 'Manufacturing & Construction':
            return 'Construction 🏗️'
        case 'Waste':
            return 'Pertes 🍂'
        case 'Building':
            return 'Bâtiment 🏢'
        case 'Industrial Processes':
            return 'Processus industriels 🏭'
        case 'Industry':
            return 'Industrie 🏭'
        case 'Other Fuel Combustion':
            return 'Autre combustion de carburant'
        case 'Fugitive Emissions':
            return 'Émissions fugitives'
        case 'Land-Use Change and Forestry':
            return 'Changement d\'affectation des terres et foresterie 🌱'
        case 'Bunker Fuels':
            return 'Combustibles de soute 🔥'
        case 'Hydro':
        case 'hydro':
            return 'Hydro 💦'
        case 'Nuclear':
        case 'nuclear':
            return 'Nucléaire ☢️'
        case 'Wind':
        case 'wind':
            return 'Vent 🌬️'
        case 'Heat':
            return 'Chaleur ♨️'
        case 'Solar':
        case 'solar':
            return 'Solaire ☀️'
        case 'Wind, solar, etc.':
            return 'Vent, Solaire, etc. ♻️'
        case 'Geo Biomass Other':
        case 'Biofuels and waste':
            return 'Géo Biomasse Autres 🌱'
        case 'other renewables':
            return 'Autre renouvelables 🌱'
        case 'Cement':
        case 'cement':
            return 'Ciment'
        case 'Flaring':
        case 'flaring':
            return 'Torchage'
        case 'Other industry':
        case 'other industry':
            return 'Autres de l\'ìndustrie'
        default:
            return label.charAt(0).toUpperCase() + label.slice(1)
    }
}

export default formatLabels