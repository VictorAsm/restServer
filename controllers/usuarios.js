const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const { q, nombre = "No Name", apikey, page = 1, limit} = req.query;

    res.json({
        msg : "get Api -> Controlador",
        q,
        nombre, 
        apikey,
        page,
        limit
    })
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg:"post Api -> Controlador",
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg:"put Api -> Controlador",
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg:"patch Api -> Controlador"
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg:"delete Api -> Controlador"
    })
}

module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}