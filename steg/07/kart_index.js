const { io } = require("lastejobb");

const r = {};
let kode2index = io.readJson("nin-data/Natur_i_Norge/Landskap/la_index.json");

Object.keys(kode2index).forEach(kode => {
  const node = {};
  node.kart = node.kart || {};
  node.kart.format = node.kart.format || {};
  node.kart.format.raster_indexed = node.kart.format.raster_indexed || {};
  node.kart.format.raster_indexed.index = kode2index[kode];
  r[kode] = node;
});
io.skrivDatafil(__filename, r);
