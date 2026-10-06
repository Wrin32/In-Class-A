const mysql = require("mysql2/promise");
const express = require("express");

const db = mysql.createPool({
    host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
    user: "ALANAHOWARD",
    password: "YOUR_PASSWORD",
    database: "ALANAHOWARD",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const app = express();

app.use(express.json());

app.post("/api/sensor", async (req, res) => {
    console.log(req.body);
    const { light } = req.body;

    try {
        await db.execute(
            "INSERT INTO data_collection (light) VALUES (?)",
            [light]
        );

        console.log("Light data saved:", light);
        
        res.json({
            message: "Light data received and saved"
        });

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            message: "Failed to save light data"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
