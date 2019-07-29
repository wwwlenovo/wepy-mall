const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const busiInfoCollection = db.collection('BusinessInfo')

exports.main = async (event, context) => {
    let info = await busiInfoCollection.where({
        openId: event.openId
    }).get();
    return info;
}