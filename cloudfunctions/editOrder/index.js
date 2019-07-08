// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const orderCollection = db.collection('Order')


// 云函数入口函数
exports.main = async (event, context) => {
    if(event.flag == 0){ //update
        return;
    } else if(event.flag == 1){//delete
        return await orderCollection.where({
            _id:event.orderId
        }).remove();
    }
}
