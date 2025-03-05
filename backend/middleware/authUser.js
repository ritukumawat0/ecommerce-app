// we will authenticate the user
// whenever user add the product in the cart or update the cart data or user place this order
// then we will use the middleware.
// this middleware will convert the users token in the users id .

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "not authorized login again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
