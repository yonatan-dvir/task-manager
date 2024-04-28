const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Authenticate user
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismysecret");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.send({ error: "Please authenticate." });
  }
};

module.exports = auth;
