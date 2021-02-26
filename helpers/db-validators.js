const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role})
    if( !existeRol ) {
        throw new Error(`El role ${role} no esta registrado en la DB`);
    }
}

const emailExiste = async(correo = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});

    if( existeEmail ){
        throw new Error(`El correo ${correo} ya está registrado`)
    }
}

const existeUsuarioPorId = async ( id ) => {
    // Verificar si el ID existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}