const fetch = require("node-fetch");

exports.handler=async function(event, context) {
  try {
    const main = await fetch('https://noadev.me/')
    const links = await fetch('https://links.noadev.me/');
    const blog = await fetch('https://blog.noadev.me/');
    return { statusCode: 200, body: JSON.stringify({main : main.status, links : links.status, blog : blog.status}) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
}
exports.module = {
  name: 'status',
  params: [' '],
  example: 'status'
}