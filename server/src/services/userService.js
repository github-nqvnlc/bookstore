import bcrypt from "bcryptjs";
import db from "../models/index";
import { generateToken } from "../middleware/JWTAction"

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      console.log(e);
    }
  });
};

let handleUserLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
      let userData = {};
      let isExist = checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["id", "email", "roleId", "password", "lastName"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user?.password);
          if (check) {
            let token = await generateToken(user?.id,user?.email, user?.roleId, user?.lastName)
            res.status(200).json({
              errCode: 0,
              message: "Oke!",
              token: `Bearer ${token}`,
              userId: user.id,
              email: user.email,
              lastName: user.lastName,
              roleId: user.roleId,
            });
          } else {
            res.status(401).json({
              errCode: 3,
              message: "Wrong password!",
            });
          }
        } else {
          res.status(401).json({
            errCode: 2,
            message: "User doesn't exist in the system!",
          });
        }
      } else {
        res.status(401).json({
          errCode: 1,
          message: "User doesn't exist in the system!",
        });
      }
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password",  "createdAt", "updatedAt"],
          },
          included: [{
            model: db.Role,
            as: "roleData"
          }],
          raw: true,
          nest: true,
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
          included: [
            {
              model: db.Role,
              as: "roleData"
            }
          ],
          raw: true,
          nest: true,
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "This email already exists",
        });
      } else {
        let hashPasswordBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
          image: data.image
        });
        resolve({
          errCode: 0,
          errMessage: "oke",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.gender = data.gender;
        user.roleId = data.roleId;
        if (data.image) {
          user.image = data.image
        }
        await user.save();
        resolve({
          errCode: 0,
          errMessage: "Edit user successful!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: `This user does not exist!`,
      });
    }

    await db.User.destroy({
      where: { id: id },
    });

    resolve({
      errCode: 0,
      errMessage: "Delete user successful!",
    });
  });
};

let getRoleService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing require role"
        })
      } else if (id === "role") {
        let res = {}
        let role = await db.Role.findAll();
        res.errCode = 0;
        res.data = role
        resolve(res);
      }
      else {
        let res = {}
        let role = await db.Role.findAll({
          where: { id: id }
        });
        res.errCode = 0;
        res.data = role
        resolve(res);
      }



    } catch (e) {
      reject(e)
    }
  })
}

let getUserImageService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 2,
          errMessage: "missing input"
        })
      } else {
        let user = await db.User.findOne({
          where: {id: id}
        })
        if (user && user !== null) {
          resolve({
            errCode: 0,
            errMessage: "oke",
            image: user.image
          })
        } else resolve({
          errCode: 3,
          errMessage: "User not found",
          image: {}
        })
        
      }
    } catch (e) {
      reject(e)
    }
  })
}
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  editUser: editUser,
  deleteUser: deleteUser,

  getRoleService: getRoleService,
  getUserImageService: getUserImageService,
};
