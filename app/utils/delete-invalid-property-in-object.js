module.exports = (data = {}, blackListFields) => {
    let badData = ['', ' ', '0', null, undefined]

    Object.keys(data).forEach((key) => {
        if (blackListFields.includes(key)) delete data[key]
        if (typeof data[key] === 'string') data[key] = data[key].trim()
        if (Array.isArray(data[key]) && data[key].length === 0) delete data[key]
        if (Array.isArray(data[key]) && data[key].length > 0)
            data[key] = data[key].map((item) => item.trim())
        if (badData.includes(data[key])) delete data[key]
    })
}
