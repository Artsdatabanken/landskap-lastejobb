const { csv, io } = require("lastejobb");

importer("Natur_i_Norge/Landskap/Typeinndeling/type.csv", "landskap");
importer(
  "Natur_i_Norge/Landskap/Landskapsgradient/gradient.csv",
  "landskapsgradient"
);
importer(
  "Natur_i_Norge/Landskap/Landskapsgradient/relasjon_til_natursystem.csv",
  "relasjon_til_natursystem"
);

function importer(csvFil, utFil) {
  const kildefil = "nin-data/" + csvFil;
  const json = csv.les(kildefil, { from_line: 1 });
  const writePath = "data/" + utFil + ".csv.json";
  io.writeJson(writePath, json);
}
