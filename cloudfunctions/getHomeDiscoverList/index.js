// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const CategoriesCollection = db.collection('Categories')

// 云函数入口函数
exports.main = async (event, context) => {
  const count = await CategoriesCollection.where({}).count();
  const page = event.page;
  const size = event.size;
  const res = await CategoriesCollection.where({}).skip((page-1)*size).limit(size).field({
    Category_Code:true,
    Category_Name:true,
    Category_Logo:true,
    Target_Url:true
  }).get();
  res['total'] = count.total;
  return res;
}