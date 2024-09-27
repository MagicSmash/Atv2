const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE user (id INT, name TEXT)");

    const stmt = db.prepare("INSERT INTO user (id, name) VALUES (?, ?)");
    stmt.run(1, 'Arthur Souza');
    stmt.run(2, 'Layza Souza');
    stmt.finalize();
});

app.get('/users', (req, res) => {
    db.all("SELECT * FROM user", [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:${port}');
});