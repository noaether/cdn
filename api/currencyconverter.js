const C = require("currency-converter-lt");exports.handler=async function(r,t){try{const t=r.queryStringParameters;return{statusCode:200,body:JSON.stringify({result:await(new C).from(t.from).to(t.to).amount(parseInt(t.of)).convert()})}}catch(r){return console.log(r),{statusCode:500,body:JSON.stringify({error:"Failed fetching data"})}}}
exports.module = {
    name: 'currencyconverter',
    params: [':from', ':to', ':of'],
    example: 'currencyconverter?from=CAD&to=USD&of=100'
}