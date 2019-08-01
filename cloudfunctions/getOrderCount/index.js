// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const orderCollection = db.collection('Order')


// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID= wxContext.OPENID;
    let count0 = await orderCollection.where({
        openId:OPENID,
        status: 0
    }).count();
    let count1 = await orderCollection.where({
        openId:OPENID,
        status: 1
    }).count();
    
    return {noPaidOrderCount:count0.total, paidOrderCount:count1.total};
}