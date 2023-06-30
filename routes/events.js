const { Router } = require('express');
const { isDate } = require('../helpers/isDate');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validator-campos');
const { validarJWT } = require('../middlewares/validator-jwt');
const { getEvents, crearEvento, actulizarEvento, deleteEvento } =
  require('../controllers/').eventsController;

const router = Router();
router.use(validarJWT);
router.get('/', getEvents);
router.post(
  '/',
  [
    check('title', 'el titilo es obligatorio').not().isEmpty(),
    check('start', 'la fecha de inicio debe ser obligatoria').custom(isDate),
    check('end', 'la fecha final debe ser obligatoria').custom(isDate),
    validarCampos,
  ],
  crearEvento
);

router.put(
  '/:id',
  [
    check('title', 'el titilo es obligatorio').not().isEmpty(),
    check('start', 'la fecha de inicio debe ser obligatoria').custom(isDate),
    check('end', 'la fecha final debe ser obligatoria').custom(isDate),
    validarCampos,
  ],
  actulizarEvento
);
router.delete('/:id', deleteEvento);
module.exports = router;
