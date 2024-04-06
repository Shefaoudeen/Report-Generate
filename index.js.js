//require modules
const PDFDocument = require("pdfkit");
const doc = new PDFDocument();
const fs = require("fs");
const data_file = require("./data.json");

//data variable
let date_time = new Date();
let officer = data_file.name;
let Designation = data_file.designation;
let beat = data_file.beat;
let station = data_file.station;
let date = `${date_time.getDate()} - ${date_time.getMonth()} - ${date_time.getFullYear()}`;
let time = `${date_time.getHours()}:${date_time.getMinutes()}:${date_time.getSeconds()}`;
let sho_assign = data_file.assignment;
let officer_observation = data_file.officer_observation;
let patta_sign = data_file.patta_sign;
let hotspot_check = data_file.hotspot_check;
let Vehicle_check = data_file.Vehicle_check;
let patrol_observation = data_file.patrol_observation;
let map_image = data_file.image_loc;

//PP logo
doc.image("./logo.jpg", 80, 25, { width: 75 });

// Main titile
doc.text("").font("Times-Bold");
doc
  .fontSize(20)
  .text("PONDICHERRY POLICE", 100, 40, {
    align: "center",
  })
  .font("Times-Bold");
doc
  .fontSize(20)
  .text("DAILY PATROLING REPORT", 100, 70, {
    align: "center",
  })
  .font("Times-Bold");

// stroke line
doc.moveTo(0, 100).lineTo(doc.page.width, 100).stroke().moveDown();

//Name of the officer
doc.text(" ", 50).fontSize(14).font("Times-Roman", 14);
doc.text(`Name of the Officer: ${officer}`, 50).fontSize(14);

//Date assigned
doc.fontSize(14).text(`Date : ${date}`, {
  align: "right",
});

//designation of the officer
doc
  .fontSize(14)
  .text(`Designation        : ${Designation}`, 50)
  .font("Times-Roman", 14);

//time-period
doc
  .fontSize(14)
  .text(`Time: ${time}`, {
    align: "right",
  })
  .font("Times-Roman");

//beat assigned
doc.text(`Beat assigned      : ${beat}`, 50).font("Times-Roman", 14).moveDown();

//station name
doc
  .text(`Police Station Name: ${station}`, 50)
  .font("Times-Roman", 14)
  .moveDown();

//Patrol map
doc.text("Patrol Map: ", 50).font("Times-Roman", 14).moveDown();

doc.image(map_image, 100, 300, {
  width: 400,
  height: 200,
  align: "center",
  valign: "center",
});

/*doc
  .save()
  .moveTo(100, 300)
  .lineTo(100, 500)
  .lineTo(500, 500)
  .lineTo(500, 300)
  .fill("#000000")
  .moveDown();
*/

//SHO assigned duties
doc.text().font("Times-Bold");
doc
  .fontSize(14)
  .text("Tasks assigned by SHO:", 50, 525, {
    color: "black",
  })
  .font("Times-Roman", 14)
  .moveDown();
doc
  .list(sho_assign, {
    width: 700,
    align: "left",
    listType: "bullet",
    bulletRadius: 3,
  })
  .moveDown();
doc.text().font("Times-Bold");

//Beat officer observation
doc
  .fontSize(14)
  .text("Observations regarding the task assigned by SHO : ", {
    color: "black",
  })
  .font("Times-Roman", 14)
  .moveDown();
doc
  .list(officer_observation, {
    width: 700,
    align: "left",
    listType: "bullet",
    bulletRadius: 3,
  })
  .moveDown();

//doc.addPage();

//Patta book signing
doc.text().font("Times-Bold");
doc
  .fontSize(14)
  .text("Patta book signed at :", {
    color: "black",
  })
  .font("Times-Roman", 14)
  .moveDown();
doc
  .list(patta_sign, {
    width: 700,
    align: "left",
    listType: "bullet",
    bulletRadius: 3,
  })
  .moveDown();

//Hotspot visited
doc.text().font("Times-Bold");
doc
  .fontSize(14)
  .text("Hotspot Checked : ", {
    align: "left",
    color: "black",
  })
  .font("Times-Roman", 14)
  .moveDown();
doc
  .list(hotspot_check, {
    width: 700,
    align: "left",
    listType: "bullet",
    bulletRadius: 3,
  })
  .moveDown();

//Vehicle visited
doc.text().font("Times-Bold");
doc
  .fontSize(14)
  .text("Vehicles checked : ", {
    align: "left",
    color: "black",
  })
  .font("Times-Roman", 14)
  .moveDown();
doc
  .list(Vehicle_check, {
    width: 700,
    align: "left",
    listType: "bullet",
    bulletRadius: 3,
  })
  .moveDown();

//Observation in the Patrol
doc.text().font("Times-Bold");
doc
  .fontSize(14)
  .text("Observation in Patrol : ", {
    align: "left",
    color: "black",
  })
  .font("Times-Roman", 14)
  .moveDown();
doc
  .list(patrol_observation, {
    width: 700,
    align: "left",
    listType: "bullet",
    bulletRadius: 3,
  })
  .moveDown();

doc.text().font("Times-Bold");

// End signature
doc
  .fontSize(14)
  .text("Signature : _________________", 40, 700, {
    align: "right",
    color: "black",
  })
  .font("Times-Roman", 14)
  .moveDown();

//file saving
doc.pipe(fs.createWriteStream("./pdfs/report.pdf"));

// end and display the document
doc.end();
