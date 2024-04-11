

const getInfoCOnsulta = (req, res, next) =>{
  console.log(`Method Request: ${req.method}\nURL Request: ${req.url}`)
  next();
}

export default getInfoCOnsulta;