import mongoose from 'mongoose';

const paddleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    weight: { type: Number, required: true },
    core: { type: String, required: true },
    surface: { type: String, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    handleLength: { type: Number, required: true },
    gripSize: { type: Number, required: true },
    releaseDate: { type: Date, min: '2000-01-01', required: false },
    rating: { type: Number, required: true, default: 0 },
    rpmCategory: {
      type: String,
      enum: ['Low', 'Average', 'High'],
      required: false,
    },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Paddle = mongoose.models.Paddle || mongoose.model('Paddle', paddleSchema);
export default Paddle;
