// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const productsCollection = db.collection('Products')

exports.main = async (event, context) => {
    const id = event.id;
    const res = await productsCollection.where({_id:id}).get();
    return res;
}