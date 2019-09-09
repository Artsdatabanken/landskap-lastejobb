const { io } = require("lastejobb");
const tinycolor = require("tinycolor2");

let r = {};

function settFarger(kilde, mapper) {
  Object.keys(kilde).forEach(kode => {
    let farge = mapper(kilde[kode]);
    r[kode] = farge.toHexString();
  });
}

const bareFargen = node => tinycolor(node.farge);

settFarger(io.lesDatafil("la_farger"), bareFargen);

io.skrivBuildfil(__filename, r);
