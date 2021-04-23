const post_router = require("express").Router();
const db = require("../database");
const multer = require("multer");
const { multerConfig, fileFilter, upload } = require("../config/multer_config");
const {
  post_list,
  find_post,
  delete_post,
  update_post,
  upload_validation,
  post_exist,
  add_post,
} = require("../controller/controller");

post_router.get("/", post_list);
post_router.get("/post/:id", post_exist, find_post);
post_router.post("/add-post", upload, upload_validation, add_post);
post_router.put(
  "/post/:id",
  upload,
  upload_validation,
  post_exist,
  update_post
);
post_router.delete("/post/:id", post_exist, delete_post);

// IMAGE URI http://localhost:9000/upload/img/" + req.file.originalname
module.exports = post_router;
