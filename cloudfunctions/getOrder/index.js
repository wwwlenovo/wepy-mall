// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const orderCollection = db.collection('Order')


// 云函数入口函数
exports.main = async (event, context) => {
    const page = event.page;
    const size = event.size;
    let count,order;
    const wxContext = cloud.getWXContext();
    const OPENID= wxContext.OPENID;
    if (event.orderStatus == undefined) {
         count = await orderCollection.where({
            openId: OPENID
        }).count();
         order = await orderCollection.where({
            openId: OPENID
        }).skip((page - 1) * size).limit(size).get();
    } else {
         count = await orderCollection.where({
            openId: OPENID,
            status: event.orderStatus
        }).count();
         order = await orderCollection.where({
            openId: OPENID,
            status: event.orderStatus
        }).skip((page - 1) * size).limit(size).get();
    }
    order['total'] = count.total;
    order['page_total'] = Math.ceil(count.total / size);
    return order;
}
