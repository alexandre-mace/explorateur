const handleCountryChange = (value, setCountry) => {
    if (value.target.innerText !== undefined) {
        setCountry(value.target.innerText)
    }
}

export default handleCountryChange