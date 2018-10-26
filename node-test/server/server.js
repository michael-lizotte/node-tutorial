const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page not found',
        name: 'Todo App v1.0'
    });
});

app.get('/users', (req, res) => {
    res.send(
        [{name: 'Michael Lizotte-Gagnon', age: 23},
        {name: 'Bob Marley', age: 76},
        {name: 'Marcus Broue', age: 24}]
    );
});

app.listen(3000);

module.exports.app = app;