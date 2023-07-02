module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};

//Middleware này được sử dụng để bắt lỗi trong các hàm xử lý
//  yêu cầu (request handler). Nó đảm bảo rằng bất kỳ lỗi nào
//  xảy ra trong hàm theFunc sẽ được bắt và chuyển tiếp đến
//  middleware xử lý lỗi tiếp theo (next).
