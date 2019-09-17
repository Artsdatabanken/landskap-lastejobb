const { csv, io } = require("lastejobb");

importer("Typeinndeling/type.csv", "landskap");
importer("Landskapsgradient/gradient.csv", "landskapsgradient");
importer(
  "Landskapsgradient/relasjon_til_natursystem.csv",
  "relasjon_til_natursystem"
);

function importer(csvFil, utFil) {
  const kildefil = "data/landskap-kildedata/" + csvFil;
  const json = csv.les(kildefil, { from_line: 1 });
  const writePath = "data/" + utFil + ".csv.json";
  io.writeJson(writePath, json);
}
