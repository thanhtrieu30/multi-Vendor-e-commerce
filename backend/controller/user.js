const router = require("express").Router();
const User = require("../model/user");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");

/// dang ky user
router.post("/register-user", async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;
    /// neu da co email dang ky roi
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      /// nếu có email --> ko upload avatar
      ///
      return next(new ErrorHandler("Email đã tồn tại", 400));
    }
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });
    ///

    ///

    const user = {
      name: name,
      password: password,
      email: email,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };

    // tạo user database
    // const newUser = await User.create(user);
    // console.log(newUser);

    const activationToken = createActivationToken(user);
    const activaionUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Kích hoạt email khách hàng",
        message: `Xin chào ${user.name}, hãy xác nhận email bằng cách bấm vào link : ${activaionUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Hãy kiểm tra email của bạn : ${user.email}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

/// tạo token user
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET_KEY, {
    expiresIn: "1m",
  });
};

module.exports = router;
