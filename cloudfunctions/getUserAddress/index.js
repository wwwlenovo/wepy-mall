const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const addressCollection = db.collection('Address')

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID= wxContext.OPENID;
    
    return await addressCollection.where({openId:OPENID}).get();
}