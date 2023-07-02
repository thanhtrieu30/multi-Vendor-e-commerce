const mongoose = require("mongoose");

/// ket nối monggoDB
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Đã kết nói Database MonggoDB : ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("Lỗi kết nối tới MongoDB:", error);
    });
};

module.exports = connectDatabase;
