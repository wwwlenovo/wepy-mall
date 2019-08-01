// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const cartCollection = db.collection('Cart')
const addressCollection = db.collection('Address')

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID= wxContext.OPENID;
    let order;
    if(!event.isCart && event.goodsId && event.skuVal){
        order = await cartCollection.where({
            openId: OPENID,
            goodsId: event.goodsId,
            skuVal:event.skuVal
        }).get();
        if(order.data.length!==0){
            let totalPrice = order.data[0].price * order.data[0].orderNum;
            order.data[0]['totalPrice'] = totalPrice;
        }
    }else {
        order = await cartCollection.where({
            openId: OPENID,
            isChecked:true
        }).get();
        order.data.forEach((value,index)=>{
            order.data[index]['totalPrice'] = value.price*value.orderNum; 
        })
    }

    let address = await addressCollection.where({
        openId: OPENID,
        isDefault: 1
    }).get();
    if(address.data.length!==0){
        order.hasDefaultAddress = true;
        order.defaultAddress = address.data[0];
    }
    return order;
}