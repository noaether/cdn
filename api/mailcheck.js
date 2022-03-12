const b = require("node-deep-email-validator");exports.handler=async function(e,t){try{const t=e.queryStringParameters;if(['noadev.me', 'pocoyo.rf.gd'].includes(t.email.split("@")[1]))return{statusCode:200,body:JSON.stringify({valid:!0})};const a=await b(t.email);return console.log(a),{statusCode:200,body:JSON.stringify({valid:a.result,reason:a.failReason})}}catch(e){return console.log(e),{statusCode:500,body:JSON.stringify({error:"Failed fetching data"})}}}
exports.module = {
    name: 'mailcheck',
    params: [':email'],
    example: 'mailcheck?email=foo@bar.baz'
}