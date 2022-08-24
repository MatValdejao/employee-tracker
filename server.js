const express = require("express");
const db = require("./db/connection")

const PORT = 3001 || process.env.PORT;
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use((req, res) => {
    res.status(400).end();
})

// connect to database
db.connect((err) => {
    if (err) throw err;
    console.log("Database connected")
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})