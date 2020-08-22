const moment = require("moment");

let obj = { title: "plugtoto", number: "4792332371", data: "32", name: "ds" };

// if (!obj.hasOwnProperty("date")) {
//   console.log("had date");
// } else {
//   obj.data = "3232";
// }

// console.log(obj);

if (!obj.hasOwnProperty("data") || !obj.hasOwnProperty("name")) {
  console.log("does not have them");
}
