const { io, json, log } = require("lastejobb");
const typesystem = require("@artsdatabanken/typesystem");

const r = {};

flett("landskap");
flett("la_farger");
flett("kart_index");
flett("landskapsgradient");
flett("landskap_relasjon_til_natursystem");
flett("landskap-ubehandlet/Typeinndeling/type");

sjekkAtTitlerEksisterer();
capsTitler();
typesystem.kobleForeldre(r);
propagerNedFlaggAttributt();

function flettAttributter(o) {
  for (let kode of Object.keys(o))
    r[kode] = json.mergeDeep(r[kode] || {}, o[kode]);
}

function flett(filename) {
  var data = io.lesTempJson(filename);
  let o = data;
  if (o.items) o = json.arrayToObject(data.items, { uniqueKey: "kode" });
  flettAttributter(o);
}

function propagerNedFlaggAttributt() {
  for (let kode of Object.keys(r)) {
    const node = r[kode];
    for (const fkode of node.foreldre) {
      const foreldernode = r[fkode];
      if (!foreldernode)
        throw new Error(`Forelderen ${fkode} til ${kode} mangler.`);
      if (r[fkode].type === "flagg") node.type = "flagg";
      if (r[fkode].type === "gradient") node.type = "gradientverdi";
    }
    if (kode.startsWith("NN-NA-LKM"))
      if (!node.type) log.warn("Missing type attribute on: " + kode);
  }
}

function capsTitler() {
  for (let key of Object.keys(r)) {
    const tittel = r[key].tittel;
    Object.keys(tittel).forEach(lang => {
      let tit = tittel[lang].replace(/\s+/g, " "); // Fix double space issues in source data
      if (tit) tittel[lang] = tit.replace(tit[0], tit[0].toUpperCase());
      else log.warn("Mangler tittel: ", key);
    });
  }
}

function sjekkAtTitlerEksisterer() {
  const notitle = [];
  for (let key of Object.keys(r)) {
    const node = r[key];
    if (!node.se) {
      if (!node.tittel) {
        log.warn(`Mangler tittel for ${key}: ${JSON.stringify(node)}`);
        notitle.push(key);
      } else {
        node.tittel = Object.entries(node.tittel).reduce((acc, e) => {
          if (!e[1])
            log.warn(`Mangler tittel for ${key}: ${JSON.stringify(node)}`);
          acc[e[0]] = e[1].trim();
          return acc;
        }, {});
        if (r[key].kode) {
          debugger;
          log.warn("Har allerede unødig kode property: ", key);
        }
      }
    }
  }

  if (notitle.length > 0) {
    log.warn("Mangler tittel: " + notitle.join(", "));
    notitle.forEach(key => delete r[key]);
  }
}

io.skrivDatafil("landskap", json.objectToArray(r, "kode"));
