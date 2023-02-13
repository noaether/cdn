const L=require("public-google-sheets-parser");exports.handler=async function(e,r){try{return{statusCode:200,body:JSON.stringify(await new L(e.queryStringParameters.id,e.queryStringParameters.sheet).parse())}}catch(e){return console.log(e),{statusCode:500,body:JSON.stringify({error:"Failed fetching data"})}}};
exports.module = {
    name: 'gsjson',
    params: [':id', '[:sheet]'],
    example: 'gsjson?id=165dm0hupkekakXbNnxvzSPUNcfFYqlhAD-5D2bXYie0'
}