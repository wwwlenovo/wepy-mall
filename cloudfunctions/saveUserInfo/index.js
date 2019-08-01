const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const userInfoCollection = db.collection('UserInfo')

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const OPENID= wxContext.OPENID;
    let res = await userInfoCollection.where({
        openId:OPENID
    }).get();
    if(res.data.length==0){
        return await userInfoCollection.add({
            data:{
                openId:OPENID,
                UserInfo:event.userInfo,
                systemInfo:event.systemInfo
            }
        })
    }else {
        return await userInfoCollection.where({
            openId:OPENID
        }).update({
            data:{
                UserInfo:event.userInfo,
                systemInfo:event.systemInfo
            } 
        })
    }
}