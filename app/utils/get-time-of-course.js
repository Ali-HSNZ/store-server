module.exports = (chapters = []) => {
    let time,
        hour,
        minute,
        second = 0

    for (const chapter of chapters) {
        if (Array.isArray(chapter?.episodes)) {
            for (const episode of chapter.episodes) {
                if (episode?.time) time = episode.time.split(':')
                else time = '00:00:00'
                if (time.length === 3) {
                    second += Number(time[0]) * 3600
                    second += Number(time[1]) * 60
                    second += Number(time[2])
                } else if (time.length === 2) {
                    second += Number(time[1]) * 60
                    second += Number(time[2])
                }
            }
        }
    }
    hour = Math.floor(second / 3600)
    minute = Math.floor(second / 60) % 60
    second = Math.floor(second % 60)

    if (String(hour).length === 1) hour = `0${hour}`
    if (String(minute).length === 1) minute = `0${minute}`
    if (String(second).length === 1) second = `0${second}`

    return hour + ':' + minute + ':' + second
}
