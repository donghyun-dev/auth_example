const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config/dev");

const auth = {
  //비밀번호검증
  comparePassword: async (userPassword, savedPassword) => {
    return await bcrypt.compare(userPassword, savedPassword);
  },

  //토큰 생성
  generateToken: (payLoad) => {
    const token = jwt.sign(payLoad, SECRET, {
      algorithm: "HS256",
      expiresIn: "2m",
    });
    return token;
  },

  // reflesh 토큰 생성
  generateRefleshToken: () => {
    const token = jwt.sign({}, SECRET, {
      algorithm: "HS256",
      expiresIn: "3d",
    });
    return token;
  },

  // 토큰 검증
  verifyToken: async (token) => {
    try {
      const decoded = jwt.verify(token, SECRET);
      return { isDecode: true, decoded };
    } catch (error) {
      if (error.message === "jwt expired") {
        return {isDecode: false, message: error.message};
      } else {
        throw error.message;
      }
    }
  },
  // reflesh 토큰 검증
  verifyRefleshToken: (token, savedToken, done) => {
    return jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return err;
      return decoded;
    });
  },
};

const {
  comparePassword,
  generateToken,
  generateRefleshToken,
  verifyToken,
  verifyRefleshToken,
} = auth;
module.exports = {
  comparePassword,
  generateToken,
  generateRefleshToken,
  verifyToken,
  verifyRefleshToken,
};
