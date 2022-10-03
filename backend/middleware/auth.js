
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors=require("./catchAsyncError")

const jwt = require("jsonwebtoken");
const userModel=require("../model/user")

isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.AUTH_SECRET_KEY);

  req.user = await userModel.findById(decodedData.id);

  next();
});

authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};


module.exports={
    
    isAuthenticatedUser,
    authorizeRoles
}