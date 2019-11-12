const { csv, io } = require("lastejobb");

importer("Typeinndeling/type.csv", "landskap");
importer("Landskapsgradient/gradient.csv", "landskapsgradient");
importer(
  "Landskapsgradient/relasjon_til_natursystem.csv",
  "relasjon_til_natursystem"
);

function importer(csvFil, utFil) {
  const kildefil = "temp/landskap-ubehandlet/" + csvFil;
  const json = csv.les(kildefil, { from_line: 1 });
  const writePath = "temp/" + utFil + ".csv.json";
  io.writeJson(writePath, json);
}
