import db from "../models/index";

//Category
let createCategoryService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Category.create({
                name: data.name,
                description: data.description
            })
            resolve({
                errCode: 0,
                errMessage: "oke"
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getCategoryService = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = "";
            if (categoryId === "ALL") {
                category = await db.Category.findAll({
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                })
            }
            if (categoryId && categoryId !== "ALL") {
                category = await db.Category.findOne({
                    where: {
                        id: categoryId
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                })
            }
            resolve(category)
        } catch (e) {
            reject(e)
        }
    })
}

let editCategoryService = (data) => {

}

let deleteCategoryService = (id) => {

}

module.exports = {
    //category
    createCategoryService: createCategoryService,
    getCategoryService: getCategoryService,
    editCategoryService: editCategoryService,
    deleteCategoryService: deleteCategoryService,
}