const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const addressCollection = db.collection('Address')

exports.main = async (event, context) => {
    if(event.id){
        return await addressCollection.where({
            _id:event.id,
            openId:event.openId
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
                openId:event.openId,
                address: event.address,
                isDefault: event.isDefault,
                province:event.province,
                city:event.city,
                area:event.area
            }
        });
    }
}