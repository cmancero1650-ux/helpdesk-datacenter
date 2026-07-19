import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El titulo es obligatorio"],
      trim: true,
      minlength: 3,
      maxlength: 120
    },
    descripcion: {
      type: String,
      required: [true, "La descripcion es obligatoria"],
      trim: true,
      minlength: 10,
      maxlength: 1200
    },
    categoria: {
      type: String,
      required: true,
      enum: ["Red", "Hardware", "Software"]
    },
    prioridad: {
      type: String,
      required: true,
      enum: ["Alta", "Media", "Baja"]
    },
    estado: {
      type: String,
      required: true,
      enum: ["Abierto", "En Progreso", "Cerrado"],
      default: "Abierto"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ticketSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});

export const Ticket = mongoose.model("Ticket", ticketSchema);
