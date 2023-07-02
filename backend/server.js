const app = require("./app");
const connectDatabase = require("./db/Database");

//handling uncaught exception -- xử lý ngoại lệ
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Đã bắt lỗi và thông tin - xử lý ngoại lệ`);
});

// config -- nếu ko phải môi trường production thì sẽ truy cập env chạy port 8000
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}
//ket noi database monggoDB
connectDatabase();

//khởi tạo server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server đang chạy trên port ${process.env.PORT}`);
});

// unhandled promise rejection -- ghi lại thông tin về Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Tắt server vì lỗi ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
