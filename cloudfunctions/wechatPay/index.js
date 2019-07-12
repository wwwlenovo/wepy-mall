const cloud = require('wx-server-sdk')
const request = require('request');
cloud.init()
const db = cloud.database()
const wxContext = cloud.getWXContext()
const MCHID = "1544536871";


exports.mian = async (event, context) => {
let postBody = `
    <xml>
    <appid>${wxContext.APPID}</appid>
    <attach>支付测试</attach>
    <body>JSAPI支付测试</body>
    <mch_id>${MCHID}</mch_id>
    <detail><![CDATA[{}]]></detail>
    <nonce_str>${}</nonce_str>
    <notify_url>http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php</notify_url>
    <openid>${wxContext.OPENID}</openid>
    <out_trade_no>${}</out_trade_no>
    <spbill_create_ip>${}</spbill_create_ip>
    <total_fee>${}</total_fee>
    <trade_type>JSAPI</trade_type>
    <sign>${}</sign>
 </xml>`;
    
}