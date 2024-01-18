const randomNumber = (digits) => {
    if (digits <= 0) {
        console.error('Please provide a positive number of digits.')
        return null
    }

    const min = 10 ** (digits - 1)
    const max = 10 ** digits - 1

    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {
    randomNumber,
}
