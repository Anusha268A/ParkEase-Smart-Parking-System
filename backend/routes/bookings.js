var express = require('express');
var router = express.Router();
var db = require('../database');

/* ✅ CREATE booking */
router.post("/", (req, res) => {

    const {
        user_email,
        lot_name,
        slot_number,
        vehicle_type,
        date,
        time,
        start_time,
        end_time
    } = req.body;

    db.query(
        `INSERT INTO bookings 
        (user_email, lot_name, slot_number, vehicle_type, date, time, start_time, end_time, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            user_email,
            lot_name,
            slot_number,
            vehicle_type,
            date,
            time,
            start_time,
            end_time,
            "Active"
        ],
        (err, result) => {

            if(err){
                console.error(err);
                return res.json({ success:false });
            }

            res.json({
                success:true,
                booking:{
                    id: result.insertId,
                    user_email,
                    lot_name,
                    slot_number,
                    vehicle_type,
                    date,
                    time,
                    start_time,
                    end_time,
                    status:"Active"
                }
            });
        }
    );
});


/* ✅ GET all bookings */
router.get('/', (req, res) => {
  db.query("SELECT * FROM bookings", (err, result) => {
    if (err) {
      console.log(err);
      return res.json([]);
    }
    res.json(result);
  });
});


/* ✅ GET bookings by user email */
router.get('/:email', (req, res) => {
    const email = req.params.email;

    db.query(
        "SELECT * FROM bookings WHERE user_email = ?",
        [email],
        (err, result) => {
            if(err) return res.status(500).json(err);
            res.json(result);
        }
    );
});


/* ✅ DELETE booking */
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM bookings WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ success: false });
      }
      res.json({ success: true });
    }
  );
});

module.exports = router;