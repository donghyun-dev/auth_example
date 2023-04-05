const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const { comparePassword, generateToken } = require("../utils/auth");

const auth = {
  signUp: async (req, res) => {
    const { email, username, password } = req.body;
    try {
      const isUser = await User.exists({ email });
      if (isUser) {
        return {
          status: 409,
          isOk: false,
          messsage: "이미 존재하는 아이디입니다.",
        };
      }
      const salt = await bcrypt.genSalt(10);
      // 비번 암호화
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
      });

      await newUser.save();
      return {
        status: 200,
        isOk: true,
        messsage: "성공적으로 회원가입이 되었습니다.",
      };
    } catch (err) {
      return { status: 500, isOk: false, messsage: "데이터베이스 에러가 발생했습니다." };
    }
  },
  logIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({email});
      if (!user) {
        return { status: 401, isOk: false, messsage: "유저가 존재하지 않습니다." };
      }

      // 유저가 존재한다면 비밀번호 검증
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return {
          status: 401,
          isOk: false,
          messsage: "비밀번호가 일치하지 않습니다.",
        };
      } else {
        // TODO: Create a token for the user
        const accessToken  = generateToken({email: user.email});
        return {
          status: 200,
          isOk: true,
          accessToken
        };
      }
    } catch (err) {
      return {
        status: 500,
        isOk: false,
        messsage: "데이터베이스 에러가 발생했습니다.",
      };
    }
  },
};

module.exports = auth;
