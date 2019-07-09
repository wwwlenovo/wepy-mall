// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const orderCollection = db.collection('Order')


// 云函数入口函数
exports.main = async (event, context) => {
    let co = await orderCollection.add({
        data:{
            orderItemList:event.list,
            openId:event.openId,
            totalPrice: event.totalPrice,
            createTime: new Date(),
            status:event.status,
            address:event.address
       }
    });
    return co;
}
