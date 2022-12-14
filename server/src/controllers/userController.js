import userService from "../services/userService";

let handleLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(401).json({
      errCode: 1,
      message: "Email and password must be not null!",
    });
  }

  await userService.handleUserLogin(req, res);
};


let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //ALL, SINGLE
  let users = await userService.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "oke",
    users
  })
}

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.editUser(data);
  return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    })
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
}

let getRole = async (req, res) => {
  try {
    console.log(req.query.id)
    let data = await userService.getRoleService(req.query.id);
    return res.status(200).json(data);
    
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Server error"
    })
  }
}

let getUserImage = async (req, res) => {
  try {
    let image = await userService.getUserImageService(req.query.id);
    return res.status(200).json(image)
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Server error"
    })
  }
}

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,

  getRole: getRole,
  getUserImage: getUserImage,
};
