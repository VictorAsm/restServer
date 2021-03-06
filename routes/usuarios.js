const { Router } = require('express');
const { check } = require('express-validator');

/* const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles'); */

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.post('/', [
    check('nombre', 'El nombre es obligatorio - Zapallito').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y de mas de 6 letras').isLength({min: 6}),
    //check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('role').custom( esRoleValido ),
    validarCampos
] , usuariosPost );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom( esRoleValido ),
    validarCampos
],
usuariosPut);

router.patch('/', usuariosPatch)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    tieneRole("ADMIN_ROLE"),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete );

module.exports = router;