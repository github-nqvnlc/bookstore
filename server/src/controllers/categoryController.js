import categorySevice from "../services/categoryService"

//category
let createCategory = async (req, res) => {
    let message = await categorySevice.createCategoryService(req.body)
    return res.status(200).json(message)
}
let getCategory = async (req, res) => {
    let id = req.query.id;
    let category = await bookService.getCategoryService(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: "oke",
        category
    })
}
let editCategory = async (req, res) => {
    let data = req.body;
    let message = await bookService.editCategoryService(data);
    return res.status(200).json(message)
}

let deleteCategory = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: "Missing required parameters!",
        })
    }

    let message = await bookService.deleteCategoryService(req.body.id);
    return res.status(200).json(message)
}


module.exports = {
    //category
    createCategory: createCategory,
    getCategory: getCategory,
    editCategory: editCategory,
    deleteCategory: deleteCategory,

}