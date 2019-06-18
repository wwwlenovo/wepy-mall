// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const categoriesCollection = db.collection('Categories')
const productsCollection = db.collection('Products')

exports.main = async (event, context) => {
    const code = event.cateCode;
    const count = await productsCollection.where({Category:code}).count();
    const page = event.page;
    const size = event.size;
    const category = await categoriesCollection.where({Category_Code:code}).get();
    const res = await productsCollection.where({Category:code}).skip((page - 1) * size).limit(size).get();
    res['total'] = count.total;
    res['category'] = category.data[0];
    return res;
}