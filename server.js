const express = require("express");

const server = express();

server.use(express.json());

let tasks = [
    {
        id: 1,
        name: "Comprar leite",
        description: "Ir no mercado da esquina e comprar leite",
        isDone: false
    },
    {
        id: 2,
        name: "Lavar o carro",
        description: "Levar o carro no lava jato para lavar",
        isDone: false
    }
]

server.get("/tasks", (req, res) => {
    res.json({
        tasks
    })
})

server.post("/tasks",(req, res) => {
    const task = req.body;
    task.id = tasks.length + 1;
    tasks.push(task);
    res.json({status: "ok"})
})

server.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    tasks.forEach(task =>{
        if (task.id === id){
            task.name = req.body.name;
            task.description = req.body.description;
            task.isDone = req.body.isDone;
        }
    })
    res.json({status: "ok"})
})

server.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    tasks = tasks.filter((task) => {
        return task.id !== id;
    })
    res.json({status: "ok"})
})

const port = 8080;
server.listen(port, () => {
    console.log(`server running on port ${port}`)
})