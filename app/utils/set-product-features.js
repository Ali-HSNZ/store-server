module.exports = (body) => {
    let feature = {}
    let type = 'physical'

    const { model, madeIn, color, width, height, weight, length } = body

    if (model || madeIn || color || width || height || weight || length) {
        type = 'virtual'
    }

    model ? (feature.model = model) : (feature.model = [])
    madeIn ? (feature.madeIn = madeIn) : (feature.madeIn = '')
    color ? (feature.color = color) : (feature.color = '')
    width ? (feature.width = width) : (feature.width = 0)
    height ? (feature.height = height) : (feature.height = 0)
    weight ? (feature.weight = weight) : (feature.weight = 0)
    length ? (feature.length = length) : (feature.length = 0)

    return { feature, type }
}
