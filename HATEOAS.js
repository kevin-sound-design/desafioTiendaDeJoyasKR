const prepararHateoas = (joyas) =>{
  const results = joyas.map((e)=>{
    return {
      name: e.nombre,
      href: `/joyas/joya/${e.id}`
    }
  });
  const totalJoyas = joyas.length;
  const stockTotal = joyas.map((e)=>{
    return e.stock
  }).reduce((acumulador, valorActual) => acumulador + valorActual, 0);
  const HATEOAS = {
    totalJoyas,
    stockTotal,
    results
  }
  return HATEOAS;
}

export default prepararHateoas;