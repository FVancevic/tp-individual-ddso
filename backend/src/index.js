import express from 'express';

const app = express();

const PUERTO = 3000;

app.get('/salud', (req, res) => {
    res.json({ estado: 'ok' });
});

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});