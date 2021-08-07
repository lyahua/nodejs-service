
var mongoose = require('mongoose')

module.exports=mongoose.model("infos",new mongoose.Schema({
  name1:String, // 个人姓名
  major1:String,// 学校专业
  school1:String,// 毕业院校
  hobby1:String,// 个人爱好
  create_time:Number,// 入库时间

  gender:String,
  date:String,
  // national:String,
  // bol:String,
  political:String,
  native:String,
  schooling:String,
  location:String,
  // email:String,
  // moblie:String,
  // time:String,
  // gradeSchool:String,
  // major2:String,
  // skill:String,
  // self:String

}))

