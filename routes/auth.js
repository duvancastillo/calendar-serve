const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos');
const { validarJWT } = require('../middlewares/validator-jwt');

const { revalidartoken, login, crearUsuario } =
  require('../controllers').authController;
const router = Router();

router.get('/renew', validarJWT, revalidartoken);
router.post(
  '/',
  [
    //meddelwares
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe ser mayor a 6').isLength({ min: 6 }),
    validarCampos,
  ],
  login
);
router.post(
  '/new',
  [
    //meddelwares
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe ser mayor a 6').isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

module.exports = router;
