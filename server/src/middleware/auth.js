import jwt from "jsonwebtoken";

// check the validity of token

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const isCustomAuth = token.length < 500; // custom auth or google auth

    let decodeData;

    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } else {
      // google auth
      decodeData = jwt.decode(token);
    }
    if (decodeData?.exp <= Date.now() / 1000) {
      throw Error("session expired");
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "session expired" });
    console.log(error);
  }
};

export default auth;
