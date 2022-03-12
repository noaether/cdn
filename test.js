const fetch = require("node-fetch");
const { readdirSync } = require('fs');
const apiFiles = readdirSync('./api').filter(file => file.endsWith('.js'));

(async () => {
    try {
        let aray = []
        let array = [];
        for (const file of apiFiles) {
            console.log(file)
            const api = require(`./api/${file}`);
            const response = await fetch(`https://cdn.noadev.me/.netlify/functions/${api.module.example}`);
            const status = await response.status;
            const statusText = await response.statusText;
            aray.push({ name: api.module.name, status: status, statusText: statusText })
        }
        for (const file of apiFiles) {
            const api = await require(`./api/${file}`);
            array.push({
              name: api.module.name,
              url: `https://cdn.noadev.me/.netlify/functions/${api.module.name}`,
              params: Array(api.module.params).join(' '),
              example: `https://cdn.noadev.me/.netlify/functions/${api.module.example}`
            })
          }
        console.log(aray);
        console.log(array);
    } catch (error) {
        console.log(error);
    }
})();
