import db from "../models/index";


//book
let getBookService = (bookId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let book = "";
            if (bookId === "ALL") {
                book = await db.Book.findAll({
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                    // include: "categoryData"
                })
            }
            if (bookId && bookId !== "ALL") {
                book = await db.Book.findOne({
                    where: {id: bookId}
                })
            }
            resolve(book);

        } catch (e) {
            reject(e)
        }
    })
}

let createNewBookService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Book.create({
                name: data.name,
                description: data.description,
                price: data.price,
                discount: data.discount,
                quantity: data.quantity,
                vote: data.vote,
                image: data.image,
                authorId: data.authorId,
                categoryId: data.categoryId,
                publisherId: data.publisherId,
                typeId: data.typeId,
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

let editBookService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters!",
                });
            }
            let book = await db.Book.findOne({
                where: { id: data.id },
                raw: false,
            });

            if (book) {
                book.name = data.name;
                book.description = data.description;
                book.price = data.price;
                book.discount = data.discount;
                book.quantity = data.quantity;
                book.vote = data.vote;
                book.image = data.image;
                book.authorId = data.authorId;
                book.categoryId = data.categoryId;
                book.publisherId = data.publisherId;
                book.typeId = book.typeId;
                await book.save();
                resolve({
                    errCode: 0,
                    errMessage: "Edit book successful!"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Book not found!",
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteBookService = (id) => {
    return new Promise(async (resolve, reject) => {
        let book = await db.Book.findOne({
            where: { id: id },
        });
        if (!book) {
            resolve({
                errCode: 2,
                errMessage: "This book does not exist!"
            });
        }
        await db.Book.destroy({
            where: { id: id },
        })
        resolve({
            errCode: 0,
            errMessage: "Delete book successful!"
        });
    });
};


//Category

let createAuthorService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Author.create({
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

let getAuthorService = (authorId) => {

}

let editAuthorService = (data)=> {

}

let deleteAuthorService = (id)=> {

}

module.exports = {
    getBookService: getBookService,
    createNewBookService: createNewBookService,
    editBookService: editBookService,
    deleteBookService: deleteBookService,

    //author
    createAuthorService: createAuthorService,
    getAuthorService: getAuthorService,
    editAuthorService: editAuthorService,
    deleteAuthorService: deleteAuthorService,

}