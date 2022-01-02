const formatLabels = (label) => {
    switch (label) {
        case 'Oil':
            return 'Pétrole 🛢️'
        case 'Coal':
            return 'Charbon 🚂'
        case 'Gas':
            return 'Gaz 😶‍🌫️'
        case 'Hydro':
            return 'Hydro 💦'
        case 'Nuclear':
            return 'Nucléaire ☢️'
        case 'Wind':
            return 'Vent 🌬️'
        case 'Solar':
            return 'Solaire ☀️'
        case 'Geo Biomass Other':
            return 'Géo Biomasse Autres 🌱'
    }

    return label
}

export default formatLabels