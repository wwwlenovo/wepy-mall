// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const cartCollection = db.collection('Cart')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const OPENID= wxContext.OPENID;
  const goods = await cartCollection.where({
      openId:OPENID,
      goodsId:event.goodsId,
      skuVal:event.skuVal
  }).get();
  if(goods.data.length === 0){
     return await cartCollection.add({
       data:{
        openId:OPENID,
        goodsId:event.goodsId,
        skuVal:event.skuVal,
        orderNum: event.orderNum,
        price: event.price,
        logo: event.logo,
        goodsName: event.goodsName,
        isChecked: event.isChecked
        }
      });
  }else {
      return await cartCollection.where({
        openId:OPENID,
        goodsId:event.goodsId,
        skuVal:event.skuVal
    }).update({
        data:{
         orderNum: event.orderNum,
         price: event.price,
         logo: event.logo,
         goodsName: event.goodsName
         }
       });
  }
}