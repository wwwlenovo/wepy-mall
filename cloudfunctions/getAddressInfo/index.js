const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const addressCollection = db.collection('Address')

exports.main = async (event, context) => {
    const address = await addressCollection.where({_id:event.id}).get();
}