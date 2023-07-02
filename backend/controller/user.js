const router = require("express").Router();
const path = require("path");
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

router.post("/register-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  /// neu da co email dang ky roi
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    /// nếu có email --> ko upload avatar
    const fileName = req.file.filename;
    const filePath = `uploads/${fileName}`;
    ///  --> xóa avatar , module fs.unlink()
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Lỗi xóa avatar" });
      } else {
        res.json({ message: "Avatar đã xóa" });
      }
    });
    ///
    return next(new ErrorHandler("Email đã tồn tại", 400));
  }
  ///

  ///lay du lieu file
  const fileName = req.file.filename;
  const fileUrl = path.join(fileName);

  const user = {
    name: name,
    password: password,
    email: email,
    avatar: fileUrl,
  };

  // tạo user database
  const newUser = await User.create(user);
  console.log(newUser);
});

module.exports = router;
