import bookService from "../services/bookService"

let getBook = async (req, res) => {
    let id = req.query.id;
    let book = await bookService.getBookService(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: "oke",
        book
    })
}

let createNewBook = async (req, res) => {
    let message = await bookService.createNewBookService(req.body)
    return res.status(200).json(message)
}

let editBook = async (req, res) => {
    let data = req.body;
    let message = await bookService.editBookService(data);
    return res.status(200).json(message)
}

let deleteBook = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: "Missing required parameters!",
        })
    }

    let message = await bookService.deleteBookService(req.body.id);
    return res.status(200).json(message)
}


//author
let createAuthor = async (req, res) => {
    let message = await bookService.createAuthorService(req.body)
    return res.status(200).json(message)
}
let getAuthor = async (req, res) => {
    let id = req.query.id;
    let author = await bookService.getAuthorService(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: "oke",
        author
    })
}
let editAuthor = async (req, res) => {
    let data = req.body;
    let message = await bookService.editAuthorService(data);
    return res.status(200).json(message)
}

let deleteAuthor = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: "Missing required parameters!",
        })
    }

    let message = await bookService.deleteAuthorService(req.body.id);
    return res.status(200).json(message)
}

module.exports = {
    //book
    createNewBook: createNewBook,
    getBook: getBook,
    editBook: editBook,
    deleteBook: deleteBook,

    
    //author
    createAuthor: createAuthor,
    getAuthor: getAuthor,
    editAuthor: editAuthor,
    deleteAuthor: deleteAuthor,

}