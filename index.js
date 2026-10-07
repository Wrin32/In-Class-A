const mysql = require("mysql2/promise");
const express = require("express");

const db = mysql.createPool({
    host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
    user: "ALANAHOWARD",
    password: "VTrntkUzkNsLoTHZ1J9lhUR0zAq3uJEAq50",
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
        const sql = `INSERT INTO sensor_data (light) VALUES (${light})`;
        await db.query(sql);
        console.log("Light value inserted:", light);
        );

        res.json({ 
            message: "Light data received" 
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to save light data"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
