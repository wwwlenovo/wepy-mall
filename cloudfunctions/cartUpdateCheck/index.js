// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const cartCollection = db.collection('Cart')

exports.main = async (event, context) => {
    if(event.all){
        return await cartCollection.where({
            openId:event.openId
        }).update({
            data:{
                isChecked: event.isChecked
             }
        });
    }else {
        return await cartCollection.where({
            openId:event.openId,
            _id:event.id
        }).update({
            data:{
                isChecked: event.isChecked
             }
        });
    }
}