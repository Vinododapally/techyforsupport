const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

app.use(express.json());
app.use(cors());

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
          res.send(response)
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
  const email = "odapallyvinod@gmail.com";
  const currPassword = req.body.currentPassword;
  const password = req.body.newPassword;
  console.log("current password=="+email)
console.log("current password=="+currPassword)
console.log("New password=="+password)
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
          console.log('=c=='+password)
          console.log('==='+result[0].password)
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

app.listen(8080, () => {
  console.log("server started on port no 8080");
});
