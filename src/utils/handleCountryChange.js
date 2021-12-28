const handleCountryChange = (value, setCountry) => {
    if (value.target.innerText !== undefined && value.target.innerText !== '') {
        setCountry(value.target.innerText)
    }
}

export default handleCountryChange