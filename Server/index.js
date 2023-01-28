const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

{/* mysql db connection  */}

const db1 = mysql.createConnection({
  host: "shirngarjewellers.cseppedlnvb8.ap-northeast-1.rds.amazonaws.com",
  user: "Vinod",
  password: "vinododapally",
  database: "techyforsupport",
});

const db = mysql.createConnection({
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
            if(error){response.error}
            res.send({ msg: "User registered successfully" });
          }
        );
      });
    } else {
      res.send({ msg: "User is already exist" });
    }
  });
});

{/* Login verification*/}

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


app.listen(8080, () => {
  console.log("server started on port no 8080");
});
