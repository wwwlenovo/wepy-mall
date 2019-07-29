const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const userInfoCollection = db.collection('UserInfo')

exports.main = async (event, context) => {
    let res = await userInfoCollection.where({
        openId:event.openId
    }).get();
    if(res.data.length==0){
        return await userInfoCollection.add({
            data:{
                openId:event.openId,
                UserInfo:event.userInfo,
                systemInfo:event.systemInfo
            }
        })
    }else {
        return await userInfoCollection.where({
            openId:event.openId
        }).update({
            data:{
                UserInfo:event.userInfo,
                systemInfo:event.systemInfo
            } 
        })
    }
}