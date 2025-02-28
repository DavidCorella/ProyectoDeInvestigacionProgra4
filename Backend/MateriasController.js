const getUser = (req, res) => {
    res.status(200).json({message: 'Prueba'})
  }
  
  const setUser = (req, res) => {
    res.status(200).json({message: 'prueba'})
  }

  module.exports = {
    getUser,
    setUser
  }