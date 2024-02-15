const express = require("express");
const router = express.Router();
const cors = require("cors")
router.use(cors());

const dbKnex = require("./data/db_config");

//Get amigos
router.get("/", async (req, res) => {
    try{
        const amigos = await dbKnex("amigos").orderBy("id", "asc");
        res.status(200).json(amigos);
    }catch(error){
        res.status(400).json({msg: error.message})
    }
})

//Get id
router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const amigos = await dbKnex("amigos").where("id", id);
        res.status(200).json(amigos);
    }catch(error){
        res.status(400).json({msg: error.message})
    }
})

router.post("/", async (req, res) => {
    const {nome, idade, sexo} = req.body;

    if(!nome || !idade || !sexo){
        res.status(400).json({msg: "Ta faltando coisa amigo!"});
        return;
    }

    try{
        const novo = await dbKnex("amigos").insert({nome, idade, sexo});
        res.status(201).json({id: novo[0]});
    }catch(error){
        res.status(400).json({msg: error.message});
    }
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {idade} = req.body;

    try{
        await dbKnex("amigos").update({idade}).where("id", id);
        res.status(200).json();
    }catch(error){
        res.status(400).json({msg: error.message});
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try{
        await dbKnex("amigos").del().where("id", id);
        res.status(200).json();
    }catch(error){
        res.status(400).json({msg: error.message});
    }
})

router.get("/filtro/:palavra", async (req, res) => {
    const palavra = req.params.palavra;
    try{
        const amigos = await dbKnex("amigos").where("nome", "like", `%${palavra}%`).orWhere("idade", "like", `%${palavra}%`).orWhere("sexo", "like", `%${palavra}%`);
        res.status(200).json(amigos);
    }catch(error){
        res.status(400).json({msg: error.message});
    }
})

router.get("/idade/resumo", async (req, res) => {
    try{
        const consulta = await dbKnex("amigos").count({num: "*"}).sum({soma: "idade"}).max({maior:"idade"}).avg({media:"idade"});
        const {num, soma, maior, media} = consulta[0];
        res.status(200).json({num, soma, maior, media: Number(media.toFixed(2))});
    }catch(error){
        res.status(400).json({msg: error.message});
    }
})

router.get("/idade/grafico", async (req, res) => {
    try{
        const totalPorAno = await dbKnex("amigos").select("idade").count({total: "idade"}).groupBy("idade");
        res.status(200).json(totalPorAno);
    }catch(error){
        res.status(400).json({msg: error.message});
    }
})

router.get("/sexo/grafico", async (req, res) => {
    try{
        const totalPorAno = await dbKnex("amigos").select("sexo").count({total: "sexo"}).groupBy("sexo");
        res.status(200).json(totalPorAno);
    }catch(error){
        res.status(400).json({msg: error.message});
    }
})

module.exports = router;