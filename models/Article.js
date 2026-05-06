const mongoose = require("mongoose"); // نعرف الاداة اللي نزلناها

const Schema = mongoose.Schema; // نعرف كلاس المخطط ونضعه بثابت عشان ناخد منه كائن بعدين

// نعمل كائن من كلاس المخطط ونضع القيم اللي بدنا اياها وبالفاليو نحط نوع البيانات
const articleSchema = new Schema({
  title: String,
  body: String,
  numberOfLikes: Number,
});

const Article = mongoose.model("Article", articleSchema); // هنا نعرف المودل واللي تتعامل معه هاي الاداة ونضع اسم الجدول او الدوكيومينت ومخططه اللي عرفناه سابقا
// ثم الداتا بيز تحول الاسم
// Article → articles

module.exports = Article; // التصدير عشان اعرف استوردها
