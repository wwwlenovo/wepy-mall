// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const cartCollection = db.collection('Cart')

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID= wxContext.OPENID;
    if(event.all){
        return await cartCollection.where({
            openId:OPENID
        }).update({
            data:{
                isChecked: event.isChecked
             }
        });
    }else {
        return await cartCollection.where({
            openId:OPENID,
            _id:event.id
        }).update({
            data:{
                isChecked: event.isChecked
             }
        });
    }
}