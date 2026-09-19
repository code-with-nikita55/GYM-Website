const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const PORT = 5000;


/* =========================
   DATABASE
========================= */

const db = new Database("gym.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        interest TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();


/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());
app.use(cors());


/* =========================
   HOME
========================= */

app.get("/", (req, res) => {
    res.send("Gym Backend is running!");
});


/* =========================
   SAVE ENQUIRY
========================= */

app.post("/api/enquiries", (req, res) => {

    const {
        name,
        phone,
        email,
        interest,
        message
    } = req.body;

    if (!name || !phone) {
        return res.status(400).json({
            success: false,
            message: "Name and phone number are required."
        });
    }

    const insert = db.prepare(`
        INSERT INTO enquiries
        (name, phone, email, interest, message)
        VALUES (?, ?, ?, ?, ?)
    `);

    insert.run(
        name,
        phone,
        email,
        interest,
        message
    );

    console.log("New enquiry saved:");

    console.log({
        name,
        phone,
        email,
        interest,
        message
    });

    res.json({
        success: true,
        message: "Enquiry received successfully"
    });

});


/* =========================
   GET ALL ENQUIRIES
========================= */

app.get("/api/enquiries", (req, res) => {

    const enquiries = db.prepare(`
        SELECT * FROM enquiries
        ORDER BY created_at DESC
    `).all();

    res.json(enquiries);

});
/* =========================
   DELETE ENQUIRY
========================= */

app.delete("/api/enquiries/:id", (req, res) => {

    const id = req.params.id;

    const result = db.prepare(`
        DELETE FROM enquiries
        WHERE id = ?
    `).run(id);

    if (result.changes === 0) {
        return res.status(404).json({
            success: false,
            message: "Enquiry not found"
        });
    }

    res.json({
        success: true,
        message: "Enquiry deleted successfully"
    });

});


/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});