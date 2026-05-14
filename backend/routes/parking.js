var express = require('express');
var router = express.Router();
var db = require('../database');

// GET all parking lots
router.get('/', (req, res) => {
    db.query("SELECT * FROM parking", (err, result) => {
        if(err) return res.status(500).json(err);
        res.json(result);
    });
});

// ADD parking lot
router.post('/', (req, res) => {
    const { name, total } = req.body;

    db.query(
        "INSERT INTO parking (name, total, available, booked) VALUES (?, ?, ?, ?)",
        [name, total, total, 0],
        (err, result) => {
            if(err) return res.status(500).json(err);
            res.json({ message: "Parking added" });
        }
    );
});

// ✅ 👉 ADD DELETE API HERE
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM parking WHERE id = ?", [id], (err, result) => {
        if(err) return res.status(500).json(err);
        res.json({ message: "Deleted successfully" });
    });
});
module.exports = router;