require("dotenv").config();
import jwt from "jsonwebtoken";
import db from "../models/index";


export const isAuth = (req, res, next) => {
    
    const authorization = req.headers.authorization;
    console.log(req.headers.authorization)
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        console.log(token)

        jwt.verify(
            token,
            process.env.JWT_SECRET || 'nqvnlc',
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Invalid Token' });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};

export const isAdmin = async (req, res, next) => {
    console.log(req.user)
    console.log( await getRoleName(req.user.roleId))

    if (req.user && await getRoleName(req.user.roleId) === 'Admin') {
        next();
    } else {
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
};

export const isManager = (req, res, next) => {
    if (req.users && getRoleName(req.users.roleId) === 'Manager') {
        next();
    } else {
        res.status(401).send({ message: 'Invalid Manager Token' });
    }
};

export const isCustomer = (req, res, next) => {
    if (req.user && getRoleName(req.user.roleId) === 'Customer') {
        next();
    } else {
        res.status(401).send({ message: 'Invalid Customer Token' });
    }
};

const getRoleName = async (roleId) => {
    let role = await db.Role.findOne({
        where: { id: roleId }
    });

    return role.name
}