// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const cartCollection = db.collection('Cart')

exports.main = async (event, context) => {
    let update = await cartCollection.where({
        openId:event.openId,
        goodsId:event.goodsId,
        skuVal:event.skuVal
    }).update({
        data:{
            orderNum: event.orderNum,
         }
    });

    let order = await cartCollection.where({
        openId: event.openId,
        goodsId: event.goodsId,
        skuVal: event.skuVal
    }).get();
    if(order.data.length!==0){
        let totalPrice = order.data[0].price * order.data[0].orderNum;
        order.data[0]['totalPrice'] = totalPrice;
    }else {
        order.data[0]['totalPrice'] = 0;
    }
    return order;
}