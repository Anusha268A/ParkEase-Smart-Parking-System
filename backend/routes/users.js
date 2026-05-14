var express = require('express');
var router = express.Router();
var db = require('../database');

/* ✅ GET ALL USERS (FIX FOR ADMIN) */
router.get('/', (req, res) => {

  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    res.json(result);
  });

});


/* ✅ REGISTER */
router.post('/register', (req, res) => {
  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  const checkSql = "SELECT * FROM users WHERE email = ?";

  db.query(checkSql, [email], (err, result) => {
    if (err) return res.json({ success: false });

    if (result.length > 0) {
      return res.json({ success: false, message: "User exists" });
    }

    const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(insertSql, [name, email, password], (err, result) => {
      if (err) return res.json({ success: false });

      res.json({ success: true });
    });
  });
});


/* ✅ LOGIN */
router.post('/login', (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {

    if (err) return res.json({ success: false });

    if (result.length > 0) {

      if (result[0].password === password) {
        res.json({ success: true, user: result[0] });
      } else {
        res.json({ success: false, message: "Wrong password" });
      }

    } else {
      res.json({ success: false, message: "User not found" });
    }
  });
});

module.exports = router;