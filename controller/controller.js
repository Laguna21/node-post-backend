const db = require("../database");
const { upload } = require("../config/multer_config");
const { local_date } = require("../helper/helper");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const unlinkasync = promisify(fs.unlink);
async function post_exist(req, res, next) {
  try {
    const data = await db.query(
      `SELECT * FROM post WHERE id = ${req.params.id}`
    );

    if (!data[0].id) {
      res.send({
        status: 400,
        msg: "Post No encontrado....",
        data: data,
      });
    } else {
      //SE GUARDA LA INFO DE LA TABLA DENTRO DE BODY.INFO
      req.body.info = data[0];
      next();
    }
  } catch (error) {
    res.send({ status: 400, msg: "Error Post No encontrado ", data: error });
  }
}
async function post_list(req, res) {
  try {
    const row = await db.query(`SELECT * FROM post ORDER BY fecha DESC`);
    res.send({ status: 200, msg: "Bienvenido", data: row });
  } catch (error) {
    res.send({ status: 400, msg: "Error", data: error });
  }
}
async function find_post(req, res) {
  try {
    console.log(
      "la info recopilada es: ",
      delete_image(
        path.normalize(
          "C:\\Users\\laguna\\Documents\\javascript-proyects\\Challenge Alkemi\\node-CRUD\\public\\upload\\img\\117226856_1209112669422552_5147065768592795238_n.jpg"
        )
      )
    );
    const data = await db.query(
      `SELECT * FROM post WHERE id = ${req.params.id}`
    );
    res.send({
      status: 200,
      msg: "Informacion encontrada",
      data: data,
    });
  } catch (error) {
    res.send({ status: 400, msg: "Error", data: error });
  }
}

async function update_post(req, res) {
  try {
    const query = `UPDATE post SET titulo=?,contenido=?,categoria=?,fecha=? WHERE id=?`;
    const id = req.params.id;
    const date = local_date();
    const { titulo, contenido, categoria } = req.body;

    const data = await db.query(query, [
      titulo,
      contenido,
      categoria,
      date,
      id,
    ]);
    console.log("DATOS DEL ARCHIVO::::::", req.file.path);
    console.log("LA DATA DEVUELTA ES", data.affectedRows);

    res.send({
      status: 200,
      msg: "Informacion actualizada!",
      data: req.body,
    });
  } catch (error) {
    res.send({
      status: 400,
      msg: "Error actualizando el post",
      data: error,
    });
  }
}
async function add_post(req, res) {
  const user_id = "laguna123";
  const date = local_date();

  try {
    const query = `INSERT INTO post (titulo,user_id,contenido,categoria,imagen,fecha) VALUES (?,?,?,?,?,?)`;

    const date = local_date();
    const imagen = req.file.path;
    const { titulo, contenido, categoria } = req.body;
    const info = { titulo, user_id, contenido, categoria, imagen, date };

    const data = await db.query(query, [
      titulo,
      user_id,
      contenido,
      categoria,
      imagen,
      date,
    ]);

    console.log("la info recibida es", data);
    res.send({
      status: 200,
      msg: "Post subido correctamente",
      data: info,
    });
  } catch (error) {
    res.send({
      status: 400,
      msg: "Error subiendo el post",
      data: error,
    });
  }
}

async function delete_post(req, res) {
  try {
    const data = await db.query(`DELETE FROM post WHERE id = ${req.params.id}`);
    await delete_image(path.normalize(req.body.info.imagen));
    res.send({
      status: 200,
      msg: `El post ${req.params.id} fue eliminado correctamente`,
      data: data,
    });
  } catch (error) {
    res.send({ status: 400, msg: "Error al eliminar post", data: error });
  }
}

async function upload_validation(req, res, next) {
  if (!req.file) {
    res.send({
      status: 400,
      msg: "Error actualizando el post",
      data: "no se encontro el archivo",
    });
  } else {
    next();
  }
}
async function delete_image(uri) {
  await unlinkasync(uri);
}
module.exports = {
  post_exist,
  post_list,
  add_post,
  find_post,
  update_post,
  upload_validation,
  delete_post,
};
