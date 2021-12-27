const sortToLowest = (a, b) => {
    if (typeof a.data === 'undefined') {
        return 0
    }

    if (a.data[a.data.length - 1] < b.data[b.data.length - 1]){
        return 1;
    }
    if (a.data[a.data.length - 1] > b.data[b.data.length - 1]){
        return -1;
    }
    return 0;
}

export default sortToLowest