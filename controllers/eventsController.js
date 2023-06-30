const { response } = require('express');
const Evento = require('../models/Events');
const getEvents = async (req, res = response) => {
  const eventos = await Evento.find().populate('user', 'name');
  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);
  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      msg: 'hable con el adminsitrados',
    });
  }
};

const actulizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  const evento = await Evento.findById(eventoId);

  try {
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'no existe un evento con ese id',
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'no tiene permisos para actualizar este evento',
      });
    }
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status.apply(500).json({
      ok: false,
      msg: 'comuniquese con el administrador',
    });
  }
};

const deleteEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  const evento = await Evento.findById(eventoId);
  try {
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'no hay evento a eliminar con ese id',
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'no tiene privelegios para eliminar este evento',
      });
    }
    await Evento.findByIdAndDelete(eventoId);
    res.json({
      ok: true,
    });
  } catch (error) {
    conlose.log(error);
    res.status(500).json({
      ok: false,
      msg: 'comunicarse con el administrador',
    });
  }
};
module.exports = { getEvents, crearEvento, actulizarEvento, deleteEvento };
