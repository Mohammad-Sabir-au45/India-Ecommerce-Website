// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    
    const token = user.getJWTToken();
  
    // options for cookie
    const options = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      
    };
  
    res.status(statusCode).cookie("token", token, options).send({
      success: true,
      user,
      token,
    });
  };
  
  module.exports = sendToken;