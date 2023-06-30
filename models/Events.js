const { Schema, model, models } = require('mongoose');

const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});
EventoSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Evento', EventoSchema);
