const path = require("path");
const cors = require("cors");
const express = require("express");

const port = process.env.PORT || 9000;
const publicPath = path.join(__dirname, "public");
const morgan = require("morgan");
const app = express();
const post_router = require("./routes/post_routes");
const multer = require("multer");
const { multerConfig, fileFilter } = require("./config/multer_config");

//SETTINGS
app.set("port", port);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//STATIC PUBLIC
app.use(express.static(publicPath));

//ROUTES
app.use("/api/", post_router);
//START
app.listen(app.get("port"), () => {
  console.log(`Conectado en el puerto -> ${app.get("port")}`);
});

/*obtener fecha
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let fecha = year+"-"+month+"-"date;
 console.log(
    `la fecha es ${
      new Date().getFullYear() +
      "-" +
      new Date().getMonth() +
      "-" +
      new Date().getDate()
    }`
  );

traer todos los post y ordenarlos por fecha desendente
SELECT `post`.*
FROM `post`
ORDER BY `fecha` DESC
*/
