module.exports = (time) => {
    let total = Math.round(time) / 60
    let [min, percentage] = String(total).split('.')
    if (percentage == undefined) percentage = '0'
    let sec = Math.round((percentage.substring(0, 2) * 60) / 100)
    let hour = 0
    if (min > 59) {
        total = min / 60
        ;[hour, percentage] = String(total).split('.')
        if (percentage == undefined) percentage = '0'
        min = Math.round((percentage.substring(0, 2) * 60) / 100)
    }
    if (hour < 10) hour = `0${hour}`
    if (min < 10) min = `0${min}`
    if (sec < 10) sec = `0${sec}`
    return hour + ':' + min + ':' + sec
}
