const { io, json, url } = require("lastejobb");

let tre = json.arrayToObject(io.lesDatafil("landskap").items, {
  uniqueKey: "kode"
});
debugger;
new url(tre, "Natur_i_Norge").assignUrls();
io.skrivBuildfil("type", tre);
