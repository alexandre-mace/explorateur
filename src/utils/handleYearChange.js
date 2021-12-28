const handleYearChange = (value, setYear) => {
    if (value.target.innerText !== undefined && value.target.innerText !== '') {
        setYear(value.target.innerText)
    }
}

export default handleYearChange