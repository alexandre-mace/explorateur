const handleYearChange = (value, setYear) => {
    if (value.target.innerText !== undefined) {
        setYear(value.target.innerText)
    }
}

export default handleYearChange