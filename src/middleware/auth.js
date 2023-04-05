const { User } = require("../models/users");
const { verifyToken, generateToken } = require("../utils/auth");

let auth = async (req, res, next) => {
  const token =
    req.headers.hasOwnProperty("authorization") &&
    req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "인증이 필요합니다. " });
  }

  try {
    const decodedToken = await verifyToken(token);
    console.log(decodedToken);

    if (decodedToken.isDecode) {
      console.log('토큰이 유효함')
      req.decodedToken = decodedToken;
      next();
    } else {
      // 토큰이 만료된 경우
      console.log('token 만료된 경우');
      return res.status(401).json({ message: "토큰이 만료되었습니다. 다시 로그인해주세요" });
    }
  } catch (error) {
    console.log('토큰 유효하지 않음', error)
    return res.status(401).json({ message: "인증이 필요합니다. " });
  }
};

module.exports = { auth };
