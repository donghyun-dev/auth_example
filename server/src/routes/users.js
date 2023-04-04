const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

//=================================
//             User
//=================================

router.get('/', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// signup
router.post('/', (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ isSuccess: false, msg: '존재하는 이메일입니다.' });
    return res.status(200).json({
      isSuccess: true,
    });
  });
});

module.exports = router;
