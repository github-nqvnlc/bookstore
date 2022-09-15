import bcrypt from "bcryptjs";
import db from "../models/index";

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

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["id","email", "roleId", "password", "lastName", ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Oke";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Password wrong";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found!`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your email isn't exist in system!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
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
            exclude: ["password", "createdAt", "updatedAt"],
          },
          included: [db.Role],
          raw: true,
          nest: true,
        });
        console.log()
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password", "image", "createdAt", "updatedAt"],
          },
          included: [
            {
              model: db.Role,
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
      console.log(check);
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
      console.log('lỗi')
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
        console.log(user)
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
