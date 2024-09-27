const express = require('express');
const db = require('./database');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/products', (req, res) => {
    const { name, price } = req.body;

    db.run("INSERT INTO product (name, price) VALUES (?, ?)", [name, price], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

app.get('/products', (req, res) => {
    db.all("SELECT * FROM product", [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message});
        }
        res.json(rows);
    });
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM product WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(row);
    });
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;

    const { name, price } = req.body;

    db.run("UPDATE product SET name = ?, price = ? WHERE id = ?", [name, price, id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ update: this.changes });
    });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM product WHERE id = ?", [id], function(err) {
        if (err) {
            return res.status(400),json({ error: err.message });
        }
        res.json({ deleted: this.changes });
    });
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:${port}');
});