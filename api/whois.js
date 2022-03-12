const fetch = require("node-fetch");exports.handler=async function(t,e){try{const e=t.queryStringParameters;let a=await fetch(`https://api.nationalize.io/?name=${e.name}`);a=await a.json();let n=await fetch(`https://api.agify.io/?name=${e.name}&country_id=${a.country[0].country_id}`);n=await n.json();let i=await fetch(`https://api.genderize.io/?name=${e.name}&country_id=${a.country[0].country_id}`);return i=await i.json(),{statusCode:200,body:JSON.stringify({age:n.age,gender:i.gender,nationalize:a.country[0].country_id})}}catch(t){return console.log(t),{statusCode:500,body:JSON.stringify({error:"Failed fetching data"})}}};
exports.module = {
    name: 'whois',
    params: [':name'],
    example: 'whois?name=noa'
}