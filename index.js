const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const app = express();

app.use(bodyparser.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})

app.post('/login', (req, res) => {

    const token = jwt.sign({
        name: 'hola',
        id: '123'
    }, process.env.TOKEN_SECRET)
    
    res.header('auth-token', token).json({
        data: {token}
    })
})

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Acceso denegado'})
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified
            next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

app.get('/peticion', verifyToken, (req, res) => {
    res.json('correct validation of token')
})