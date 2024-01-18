const moment = require('moment')

const timeDifference = (expiresTimestamp) => {
    const currentMoment = moment(new Date().getTime())
    const expiresMoment = moment(expiresTimestamp)

    const diff = expiresMoment.diff(currentMoment)
    const duration = moment.duration(diff)

    const hours = Math.floor(duration.asHours()).toString().padStart(2, '0')
    const minutes = duration.minutes().toString().padStart(2, '0')
    const seconds = duration.seconds().toString().padStart(2, '0')

    const isFutureTime = expiresMoment.isAfter(currentMoment)

    return {
        formattedTime: `${hours !== '00' ? `${hours}:` : ''}${minutes}:${seconds}`,
        hours,
        minutes,
        seconds,
        isFutureTime,
    }
}

module.exports = { timeDifference }
