import format from "pg-format";
import pg from "pg";

const {Pool} = pg

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '153abril',
  database: 'joyas',
  allowExitOnIdle: true
})

const getAllData = async ({limits = 10, order_by = "id_ASC", page = 1}) =>{

  const [campo, orderType] = order_by.split("_");
  const offset = (page - 1) * limits;

  const formattedQuery = format("SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s ", campo, orderType, limits, offset)
  const {rows} = await pool.query(formattedQuery);
  return rows;
}

const obtenerJoyasFiltradas = async ({precio_min, precio_max, categoria, metal}) =>{
  let filtros = [];
  let params = [];

  if(precio_min){
    filtros.push("precio >= %s");
    params.push(precio_min);
  }
  if(precio_max){
    filtros.push("precio <= %s");
    params.push(precio_max);
  }
  if(categoria){
    filtros.push("categoria = %s");
    params.push(`'${categoria}'`);
  }
  if(metal){
    filtros.push("metal = %s");
    params.push(`'${metal}'`);
  }

  let consulta = "SELECT * FROM inventario"
  if (filtros.length){
    consulta += ` WHERE ${filtros.join(" AND ")}`;
  }
  const formattedQuery = format(consulta, ...params);

  const {rows} = await pool.query(formattedQuery);
  return rows;
}

/* Funcion Extra */
const obtenerElementoPorId = async (id) =>{
  const formattedQuery = format("SELECT * FROM inventario WHERE id = %s", id);
  const {rows} = await pool.query(formattedQuery);
  return rows;
}



export {getAllData, obtenerJoyasFiltradas, obtenerElementoPorId};