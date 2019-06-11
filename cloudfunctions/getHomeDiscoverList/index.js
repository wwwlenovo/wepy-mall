// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const productsCollection = db.collection('Products')

// 云函数入口函数
exports.main = async (event, context) => {
  const count = await productsCollection.where({
    inDiscoverList:true
  }).count();
  const page = event.page;
  const size = event.size;
  const res = await productsCollection.where({inDiscoverList:true}).skip((page-1)*size).limit(size).field({
    Products_Name:true,
    logo:true
  }).get();
  res['total'] = count.total;
  return res;
}