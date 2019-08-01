// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const cartCollection = db.collection('Cart')

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const OPENID= wxContext.OPENID;
  let goods = await cartCollection.where({
      openId:OPENID
  }).get();
  for(let i=0;i<goods.data.length;i++){
      let item = goods.data[i];
      item["totalPrice"] = item.price*item.orderNum; 
  }
  return goods;
}