// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command;
const cartCollection = db.collection('Cart')


exports.main = async (event, context) => {
    return await cartCollection.where({
        openId:event.openId,
        _id:_.in(event.ids)
    }).remove();
}