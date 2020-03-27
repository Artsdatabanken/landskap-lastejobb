const { csv, io } = require("lastejobb");

importer("Typeinndeling/type.csv", "landskap", { from_line: 1, delimiter: '\t', quote: null });
importer("Landskapsgradient/gradient.csv", "landskapsgradient");
importer(
  "Landskapsgradient/relasjon_til_natursystem.csv",
  "relasjon_til_natursystem"
);

function importer(csvFil, utFil, csvOptions = { from_line: 1 }) {
  const kildefil = "temp/landskap-ubehandlet/" + csvFil;
  const json = csv.les(kildefil, csvOptions)
  const writePath = "temp/" + utFil + ".csv.json";
  io.writeJson(writePath, json);
}
