const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
//const {compare} = require("bcryptjs");
const {genneralAccessToken, genneralRefreshToken} = require("./JwtService");
//const {promise, reject} = require("bcrypt/promises");

//sign-up
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, confirmPassword} = newUser;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser !== null) {
                resolve({
                    status: "ERR",
                    message: "Email này đã tồn tại",
                });
            }
            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                name,
                email,
                password: hash,
            });
            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdUser,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

//sign-in
const loginUser = (Userlogin) => {
    return new Promise(async (resolve, reject) => {
        const {email, password} = Userlogin;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "Email này không tồn tại",
                });
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                resolve({
                    status: "ERR",
                    message: "Mật khẩu không chính xác",
                });
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            resolve({
                status: "OK",
                message: "Đăng nhập thành công",
                access_token,
                refresh_token,
            });
        } catch (e) {
            reject(e);
        }
    });
};

//update User

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "Người dùng không được xác định",
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, {new: true});
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

//delete user
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "Người dùng không được xác định",
                });
            }
            await User.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Xóa người dùng thành công",
            });
        } catch (e) {
            reject(e);
        }
    });
};

//getAllUser
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find().sort({createdAt: -1, updatedAt: -1});
            resolve({
                status: "OK",
                message: "Success",
                data: allUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

//getDetailsUser
const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
            });
            if (user === null) {
                resolve({
                    status: "ERR",
                    message: "Người dùng không được xác định",
                });
            }
            resolve({
                status: "OK",
                message: "SUCESS",
                data: user,
            });
        } catch (e) {
            reject(e);
        }
    });
};

//deletemany user
const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await User.deleteMany({_id: ids})
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
};
