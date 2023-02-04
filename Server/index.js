const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require('multer')
const bodyParser = require('body-parser');
const path = require('path')
const saltRounds = 10;

//use express static folder
app.use(cors());
app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
{/* mysql db connection  */ }

const db1 = mysql.createPool({
  host: "shirngarjewellers.cseppedlnvb8.ap-northeast-1.rds.amazonaws.com",
  user: "Vinod",
  password: "vinododapally",
  database: "techyforsupport",
});

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Vinod@0479",
  database: "react_node",
});


//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images/')     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
});



app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO users (email, password) VALUE (?,?)",
          [email, hash],
          (error, response) => {
            if (err) {
              res.send(err);
            }
            if (error) { response.error }
            res.send({ msg: "User registered successfully" });
          }
        );
      });
    } else {
      res.send({ msg: "User is already exist" });
    }
  });
});

{/* Login verification*/ }

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response == true) {
          res.send(result)
        } else {
          res.send({ msg: "Invalid Password" });
        }
      });
    } else {
      res.send({ msg: "Invalid Email Id" });
    }
  });
});

app.post("/changepassword", (req, res) => {
  const email = req.body.email;
  const currPassword = req.body.currentPassword;
  const password = req.body.newPassword;
bcrypt.hash(password, saltRounds, (err, hash) => {
  console.log(hash)
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(currPassword, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response == true) {
            db.query(
              "Update users set password=? where email=?",
              [hash, email],
              (error, response) => {
                if (response) {
                  res.send({ msg: "Password changed successfully" });
                } else {
                  res.send({ msg: "Failed to change password due to " + error.message });
                }
              }
            );
        }
      });
    } else {
      res.send({ msg: "Current password is invalid" });
    }
  });
});
});

app.post("/upload", upload.single('file'), (req, res) => {
  if (!req.file) {
    res.send({ msg: "No file upload" });
  } else {
      var imgsrc = 'http://localhost:8080/images/' + req.file.filename
      var email=req.body.email;
      var insertData = "update users set file_path=? where email=?"
      db.query(insertData, [imgsrc,email], (err, result) => {
          if (err) {
            res.send({ msg: "Failed to upload due to "+err.message });
          }else{
          db.query("SELECT * FROM users WHERE email = ?", [email], (err, resp) => {
            if (err) {
              res.send(err);
            } else{
              res.send(resp);
            }
          });
        }
       
      })
  }
});

app.listen(8080, () => {
  console.log("server started on port no 8080");
});
