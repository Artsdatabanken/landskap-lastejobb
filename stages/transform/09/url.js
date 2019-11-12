const { io, json, url } = require("lastejobb");

let tre = json.arrayToObject(io.lesDatafil("landskap").items, {
  uniqueKey: "kode"
});

new url(tre).assignUrls();
io.skrivBuildfil("type", tre);
