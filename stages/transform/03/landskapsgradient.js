const { io } = require("lastejobb");

let klg = io.lesTempJson("landskapsgradient.csv.json");

const r = {};

klg.forEach(inn => {
  if (inn.KLG_trinn_kode)
    r["NN-LA-" + hack(inn.KLG_trinn_kode)] = {
      tittel: { nb: inn.Trinn_navn },
      nivå: "Gradienttrinn",
      min: inn.verdier_klg_indekser,
      max: inn.verdier_klg_indekser,
      ingress: { nb: inn.Beskrivelse_KLG },
      intervall: {
        minTekst: inn.mintekst,
        maxTekst: inn.makstekst,
        min: inn.min,
        max: inn.maks,
        måleenhet: inn.måleenhet
      }
    };
  else {
    r["NN-LA-" + hack(inn.kode)] = {
      tittel: { nb: inn.KLG_Navn },
      nivå: "Landskapsgradient",
      måleenhet: inn.måleenhet,
      ingress: { nb: inn.Beskrivelse_KLG }
    };
  }
});

function hack(kode) {
  kode = kode.replace("RE-", "RE");
  kode = kode.replace("ID-KF", "IDKF");
  kode = kode.replace("AI-KS", "AIKS");
  return kode.split("_").join("-");
}

io.skrivDatafil(__filename, r);
