import countries from "i18n-iso-countries";

const getCountryLabel = (country) => {
    if (country === 'World') {
        return 'Monde'
    }

    if (countries.getName(countries.getAlpha3Code(country, 'en'), 'fr') === undefined) {
        return country
    }

    return countries.getName(countries.getAlpha3Code(country, 'en'), 'fr')
}

export default getCountryLabel