const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // lỗi nội bộ trên máy chủ
  err.message = err.message || "Lỗi máy chủ nội bộ";

  // wrong mongodb id error  // lỗi sai id monggo
  if (err.name === "CastError") {
    const message = `Không tìm thấy id ... ${err.path} không hợp lệ`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error  // lỗi trùng khóa
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error    // lỗi  token
  if (err.name === "JsonWebTokenError") {
    const message = `Url của bạn không hợp lệ , vui lòng thử lại!`;
    err = new ErrorHandler(message, 400);
  }

  // jwt expired   // lỗi token hết hạn
  if (err.name === "TokenExpiredError") {
    const message = `Url của bạn hết hạn , vui lòng gửi lại!`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
