var columnify = require("columnify"),
  t = columnify([
    {
      name: "currencyconverter",
      url: "https://cdn.noadev.me/.netlify/functions/currencyconverter",
      params: ":from :to :amount",
    },
    {
      name: "gsjson",
      url: "https://cdn.noadev.me/.netlify/functions/gsjson",
      params: ":id [:sheet]",
    },
    {
      name: "mailcheck",
      url: "https://cdn.noadev.me/.netlify/functions/mailcheck",
      params: ":email",
    },
    {
      name: "status",
      url: "https://cdn.noadev.me/.netlify/functions/status",
      params: "",
    },
  ]);
exports.handler = async (n, e) => {
  try {
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
};
