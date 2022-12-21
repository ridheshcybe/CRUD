const express = require("express");

let data = []
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(data);
});

app.post('/', (req, res) => {
    if (!req.body) return res.status(400).send("no body");
    data.push(req.body)
    res.send(data)
});

app.put('/:id', (req, res) => {
    const id = req.params.id;
    if (!req.body) return res.status(400).send("no body");
    data[id] = req.body;
    res.send(data)
})

app.delete('/:id', (req,res)=>{
    const id = req.params.id;
    delete data[id];
    data = JSON.parse(JSON.stringify(data))
    res.send(data)
})

app.listen(8080)