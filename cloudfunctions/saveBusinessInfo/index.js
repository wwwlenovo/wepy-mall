const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const busiInfoCollection = db.collection('BusinessInfo')

exports.main = async (event, context) => {
    let info = await busiInfoCollection.where({
        openId: event.openId
    }).get();
    if(info.data.length !==0){
        return info;
    } else {
        return await busiInfoCollection.add({
            data:{
                openId:event.openId,
                businessName: event.businessName,
                telephone: event.telephone,
                pass:0
            }
        });
    }
}