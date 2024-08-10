const { UserModel } = require('../models/users')
const copyObject = require('./copy-object')

module.exports = async (userId) => {
    const userDetail = await UserModel.aggregate([
        { $match: { _id: userId } },
        { $project: { basket: 1 } },
        {
            $lookup: {
                from: 'products',
                localField: 'basket.products.productId',
                foreignField: '_id',
                as: 'productDetail',
            },
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'basket.courses.courseId',
                foreignField: '_id',
                as: 'courseDetail',
            },
        },
        {
            $addFields: {
                productDetail: {
                    $function: {
                        body: function (productDetail, products) {
                            return productDetail.map((product) => {
                                const basketProductsCount = products.find(
                                    (item) => item.productId.valueOf() === product._id.valueOf()
                                ).count

                                const totalPrice = basketProductsCount * product.price

                                return {
                                    ...product,
                                    basketCount: basketProductsCount,
                                    totalPrice: totalPrice,
                                    finalPrice: totalPrice - (product.discount / 100) * totalPrice,
                                }
                            })
                        },
                        args: ['$productDetail', '$basket.products'],
                        lang: 'js',
                    },
                },
                courseDetail: {
                    $function: {
                        body: function (courseDetail) {
                            return courseDetail.map((course) => ({
                                ...course,
                                finalPrice: course.price - (course.discount / 100) * course.price,
                            }))
                        },
                        args: ['$courseDetail'],
                        lang: 'js',
                    },
                },
                payDetail: {
                    $function: {
                        body: function (courseDetail, productDetail, products) {
                            // calculate course amount
                            const courseAmount = courseDetail.reduce(function (total, course) {
                                return (
                                    total + (course.price - (course.discount / 100) * course.price)
                                )
                            }, 0)

                            // calculate product amount
                            const productAmount = productDetail.reduce(function (total, product) {
                                const productCountInBasket = products.find(
                                    (item) => item.productId.valueOf() === product._id.valueOf()
                                ).count

                                const totalPrice = productCountInBasket * product.price

                                return total + (totalPrice - (product.discount / 100) * totalPrice)
                            }, 0)

                            const courseIds = courseDetail.map((course) => course._id.valueOf())
                            const productIds = productDetail.map((product) => product._id.valueOf())

                            return {
                                courseAmount,
                                productAmount,
                                paymentAmount: courseAmount + productAmount,
                                courseIds,
                                productIds,
                            }
                        },
                        args: ['$courseDetail', '$productDetail', '$basket.products'],
                        lang: 'js',
                    },
                },
            },
        },
        {
            $project: {
                basket: 0,
            },
        },
    ])

    return copyObject(userDetail)
}
