const columnify = require("columnify");
exports.handler=async function(n, e) {
  try {
    var t = columnify([
      {
        name: 'currencyconverter',
        url: 'https://cdn.noadev.me/.netlify/functions/currencyconverter',
        params: ':from,:to,:of',
        example: 'https://cdn.noadev.me/.netlify/functions/currencyconverter?from=CAD&to=USD&of=100'
      },
      {
        name: 'functions',
        url: 'https://cdn.noadev.me/.netlify/functions/functions',
        params: ' ',
        example: 'https://cdn.noadev.me/.netlify/functions/functions'
      },
      {
        name: 'gsjson',
        url: 'https://cdn.noadev.me/.netlify/functions/gsjson',
        params: ':id,[:sheet]',
        example: 'https://cdn.noadev.me/.netlify/functions/gsjson?id=165dm0hupkekakXbNnxvzSPUNcfFYqlhAD-5D2bXYie0'
      },
      {
        name: 'helloworld',
        url: 'https://cdn.noadev.me/.netlify/functions/helloworld',
        params: ' ',
        example: 'https://cdn.noadev.me/.netlify/functions/helloworld'
      },
      {
        name: 'mailcheck',
        url: 'https://cdn.noadev.me/.netlify/functions/mailcheck',
        params: ':email',
        example: 'https://cdn.noadev.me/.netlify/functions/mailcheck?email=foo@bar.baz'
      },
      {
        name: 'status',
        url: 'https://cdn.noadev.me/.netlify/functions/status',
        params: ' ',
        example: 'https://cdn.noadev.me/.netlify/functions/status'
      },
      {
        name: 'whois',
        url: 'https://cdn.noadev.me/.netlify/functions/whois',
        params: ':name',
        example: 'https://cdn.noadev.me/.netlify/functions/whois?name=noa'
      }
    ]);
    return { statusCode: 200, body: t };
  } catch (n) {
    return (
      console.log(n),
      {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed fetching data" }),
      }
    );
  }
}
exports.module = {
  name: 'functions',
  params: [' '],
  example: 'functions'
}
