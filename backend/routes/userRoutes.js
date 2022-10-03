const express = require("express")
const { registerUser, loginUser, logoutUser, getUserDetails, updatePassword, updateProfile,
     getAllUser, getSingleUser, updateUserAcsess,deleteUser} = require("../constroller/userController")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")
const userRouter = express.Router()




userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").get(logoutUser)
userRouter.route("/profile").get(isAuthenticatedUser, getUserDetails)
userRouter.route("/password/update").put(isAuthenticatedUser,updatePassword)
userRouter.route("/profile/update").put(isAuthenticatedUser,updateProfile)
userRouter.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser)
userRouter.route("/admin/user/:id")
.get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserAcsess)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)


module.exports = userRouter