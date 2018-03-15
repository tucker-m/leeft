const formatDate = (timestamp: number) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const date = new Date(timestamp)
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    const hour = date.getHours() % 12
    const meridian = (date.getHours() / 12) <= 1 ? 'am' : 'pm'
    const minutes = date.getMinutes()
    return month + ' ' + day + ', ' + year + ' at ' + hour + ':' + minutes.toString().padStart(2, '0') + meridian
}

const combineStyles = (styles: Array<string>) => {
    return styles.join(' ')
}

export default {
    formatDate,
    combineStyles,
};
