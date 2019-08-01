const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const addressCollection = db.collection('Address')

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID= wxContext.OPENID;
    if(event.id!== ""){
        return await addressCollection.where({
            _id:event.id,
            openId:OPENID
        }).update({
            data:{            
                address: event.address,
                isDefault: event.isDefault,
                province:event.province,
                city:event.city,
                area:event.area
            }
        });
    } else {
        return await addressCollection.add({
            data:{
                openId:OPENID,
                address: event.address,
                isDefault: event.isDefault,
                province:event.province,
                city:event.city,
                area:event.area
            }
        });
    }
}