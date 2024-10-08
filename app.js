const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Connect to MySQL database
const db = mysql.createConnection({
    host: 'db',  // MySQL server host (will be set in Docker)
    user: 'user',
    password: 'password',
    database: 'testdb'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
    db.query('SELECT NOW() as currentTime', (err, result) => {
        if (err) {
            res.send('Error querying database');
            return;
        }
        res.send(`Current time from database: ${result[0].currentTime}`);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});