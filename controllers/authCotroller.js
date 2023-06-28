const { generarJWT } = require('../helpers/jws');
const Usuario = require('../models/Usuario');
var bcrypt = require('bcryptjs');

const crearUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'ya existe un usuario con ese correo ',
      });
    }

    usuario = new Usuario(req.body);
    // Encryptar contraseña
    var salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();
    //crear jwt
    const token = await generarJWT(usuario.id, usuario.name);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'hable con el administrador',
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'el usuario con ese correo no existe ',
      });
    }
    //comparar contraseña
    const validarContraseña = bcrypt.compareSync(password, usuario.password);
    if (!validarContraseña) {
      return res.status(400).json({
        ok: false,
        msg: 'la contraseña es incorrecta',
      });
    }
    // crear token
    const token = await generarJWT(usuario.id, usuario.name);
    res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'hable con el administrador',
    });
  }
};

const revalidartoken = async (req, res) => {
  const { uid, name } = req;
  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    token,
  });
};

module.exports = { crearUsuario, login, revalidartoken };
