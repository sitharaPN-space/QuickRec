import jwt from "jsonwebtoken";

// check the validity of token

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const isCustomAuth = token?.length < 500; // custom auth or google auth

    let decodeData;

    if (!token) return res.status(404).json({ message: "Token missing !" });
    else if (isCustomAuth) {
      decodeData = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        async (err) => {
          if (err) {
            return res
              .status(401)
              .json({ message: "This session has expired. Please login" });
          }
        }
      );
    } else {
      // google auth
      decodeData = jwt.decode(token);
      if (decodeData?.exp <= Date.now() / 1000) {
        return res
          .status(401)
          .json({ message: "This session has expired. Please login" });
      }
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "session expired" });
    console.log(error);
  }
};

export default auth;
