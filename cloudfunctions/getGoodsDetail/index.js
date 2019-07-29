// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const productsCollection = db.collection('Products')
const businessProductsCollection = db.collection('BusinessProducts')

exports.main = async (event, context) => {
    const id = event.id;
    if(event.isBusiness){
        return  await businessProductsCollection.where({_id:id}).get();
    } else{
        return  await productsCollection.where({_id:id}).get();
    }
}