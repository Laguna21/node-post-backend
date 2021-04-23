const db = require("../database");

function local_date() {
  let date_ob = new Date();
  let date = date_ob.getDate();
  let month = date_ob.getMonth() === 12 ? 1 : date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  return year + "-" + month + "-" + date;
}

module.exports = {
  local_date,
};
