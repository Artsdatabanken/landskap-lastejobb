const { io, json, url } = require("lastejobb");

let tre = json.arrayToObject(io.lesTempJson("landskap"), {
  uniqueKey: "kode"
});

new url(tre).assignUrls();
io.skrivBuildfil("type", tre);
