const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hãy nhập Tên của bạn !"],
  },
  email: {
    type: String,
    required: [true, "Hãy nhập Email của bạn !"],
  },
  password: {
    type: String,
    required: [true, "Hãy nhập Password của bạn !"],
    minLength: [4, "nhập Password lớn hơn 4 ký tự"],
    select: false,
  },
  avatar: {
    type: String,
    required: true,
  },
  //   phoneNumber:{
  //     type: Number,
  //   },
  //   addresses:[
  //     {
  //       country: {
  //         type: String,
  //       },
  //       city:{
  //         type: String,
  //       },
  //       address1:{
  //         type: String,
  //       },
  //       address2:{
  //         type: String,
  //       },
  //       zipCode:{
  //         type: Number,
  //       },
  //       addressType:{
  //         type: String,
  //       },
  //     }
  //   ],
  role: {
    type: String,
    default: "user",
  },

  //  createdAt:{
  //   type: Date,
  //   default: Date.now(),
  //  },
  resetPasswordToken: String, // để lưu trữ mã thông báo (token) để đặt lại mật khẩu người dùng
  resetPasswordTime: Date, // dùng để lưu thời điểm yêu cầu đặt lại mật khẩu được tạo ra
});

//  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// jwt token
// userSchema.methods.getJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

module.exports = mongoose.model("User", userSchema);
