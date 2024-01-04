import { Schema, model } from "mongoose";

const EventoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
});

EventoSchema.methods.toJSON = function () {
    const { __v, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
};

export default model("Evento", EventoSchema);
