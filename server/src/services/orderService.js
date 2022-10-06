import db from "../models/index";

//create oder

let createOrderService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Order.create({
                createBy: data.createBy,
                totalPrice: data.totalPrice,
                shippingAdress: data.shippingAdress,
                shippingPhone: data.shippingPhone
            });
            resolve({
                errCode: 0,
                errMessage: "oke",
            });
        } catch (e) {
            reject(e)
        }
    })
}

let getOrderService = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (orderId) {
                let order = await db.Order.findAll()
                resolve(order)
            }
            resolve({
                errCode: 2,
                errMessage: "Get order failed!",
            });
        } catch (e) {
            reject(e)
        }
    })
}

let getOderByUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (user) {
                let order = await db.Order.findOne({
                    where: { createBy: user },
                    include: [
                        { model: db.Book, as: "orderData" },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve(order)
            }
            resolve({
                errCode: 2,
                errMessage: "Get order failed!",
            });
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrderService: createOrderService,
    getOrderService: getOrderService,
    getOderByUser: getOderByUser,

}