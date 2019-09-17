const log = require("log-less-fancy")();
const { io } = require("lastejobb");
const { blend } = require("@artsdatabanken/color-blend");

const farger = io.readJson("data/landskap-ubehandlet/farger.json");
let la = io.lesDatafil("landskap.json");

let r = {};

Object.keys(la).forEach(kode => blandDelta(kode));

function blandDelta(kode) {
  const node = la[kode];
  if (!node.relasjon) return;
  const stack = [];
  for (var relasjon of node.relasjon) {
    const klg = relasjon.kode;
    const delta = farger[klg];
    if (!delta) {
      log.warn("Mangler delta for " + klg);
      continue;
    }
    if (delta.vekt) {
      if (!Array.isArray(delta.vekt))
        delta.vekt = [delta.vekt, delta.vekt, delta.vekt];
      stack.push({
        farge: delta.fargebidrag,
        vekt: [...delta.vekt],
        kode: klg
      });
    }
  }

  normalize(stack);

  switch (stack.length) {
    case 0:
      break;
    case 1:
      r[kode] = { farge: stack[0].farge };
      break;
    default:
      r[kode] = { farge: blend(stack) };
      break;
  }
}

function normalize(stack) {
  let total = [0, 0, 0];
  stack.forEach(delta => {
    total[0] += delta.vekt[0];
    total[1] += delta.vekt[1];
    total[2] += delta.vekt[2];
  });
  stack.forEach(delta => {
    delta.vekt[0] /= total[0];
    delta.vekt[1] /= total[1];
    delta.vekt[2] /= total[2];
  });
}

Object.keys(farger).forEach(kode => (r[kode] = farger[kode]));

io.skrivDatafil(__filename, r);
