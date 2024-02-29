const mongoose = require('mongoose')
var UserSchema = new mongoose.Schema(
  {
    username: {
        type : String,
        unique: true,
        require: true
    },
    password: {
      type : String,
      require : true
    },
    role: {
        type: String,
        require: true
    },
  },
  {
    versionKey: false //optional (to remove _v: 0 when add new data)
  }
)

//Note: tham số cuối cùng bắt buộc phải là tên của collection (table) trong DB
var UserModel = mongoose.model('user', UserSchema, 'user')
module.exports = UserModel