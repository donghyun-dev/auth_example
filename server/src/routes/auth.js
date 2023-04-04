const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

// login
router.post('/login', (req, res) => {
    const {email} = req.body;
    User.findOne({ email }, (err, user) => {
      if (!user)
        return res.json({
          isSuccess: false,
          message: '인증하는데 실패했습니다.\n이메일을 찾을 수 없습니다.',
        });
  
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            isSuccess: false,
            message: '비밀번호을 잘못입력하셨습니다.',
          });
  
        user.generateToken((err, user, tokenInfo) => {
          if (err) return res.status(400).send(err);
          res.cookie('auth_token_Exp', tokenInfo.tokenExp);
          res
           .cookie('auth_token', tokenInfo.token)
           .status(200).json({
            isSuccess: true,
            userId: user._id,
          });
        });
      });
    });
  });
  
  // logout
  router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '', tokenExp: '' },
      (err, doc) => {
        if (err) return res.json({ isSuccess: false, err });
        return res.status(200).send({
          isSuccess: true,
        });
      },
    );
  });

  module.exports = router;