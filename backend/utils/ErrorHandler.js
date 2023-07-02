class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); //  gọi phương thức khởi tạo của lớp cơ sở Error và truyền message vào.
    this.statusCode = statusCode; // được gán cho thuộc tính statusCode của đối tượng lỗi.

    // Error.captureStackTrace(this,this.constructor);   // don dẹp dấu vết trong ngăn xếp
  }
}
module.exports = ErrorHandler;
