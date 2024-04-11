import express from 'express'
import { getAllData, obtenerJoyasFiltradas, obtenerElementoPorId } from './consultas.js';
import prepararHateoas from './HATEOAS.js';
import getInfoCOnsulta from './middleware/getInfoConsulta.js';

const app = express();
const PORT = 3000;

app.use(getInfoCOnsulta)
app.use(express.json());
app.listen( PORT ,()=> console.log(`Servidor iniciado en el puerto ${PORT}`));

app.get('/joyas', async (req, res)=>{
  try{
    const query = req.query;
    const joyas = await getAllData(query);
    const joyasHateOas = prepararHateoas(joyas);
    res.json(joyasHateOas);

  }catch(error){
    res.status(404).send(error)
  }
});

app.get('/joyas/filtros', async (req, res)=>{
  try{
    const query = req.query;
    const joyas = await obtenerJoyasFiltradas(query);
    res.json(joyas);

  }catch(error){
    res.status(404).send(error)
  }
})

/* Contenido external, funcionalidad para encontrar elementos por id para asi dar uso a la estructura HATEOAS */
app.get('/joyas/joya/:id', async (req, res)=>{
  try{
    const {id} = req.params;
    const joya = await obtenerElementoPorId(id);
    res.json(joya);
  }catch(error){
    res.status(404).send(error);
  }
})

/* Ruta por defecto */
app.get("*", (req, res)=>{
  res.status(404).send("Esta ruta no existe");
})

export {app}


