import mongoose from 'mongoose';

const paddleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    maxWeight: { type: Number, required: false },
    minWeight: { type: Number, required: true }, //if no weight range exists just use minweight
    swingWeight: { type: Number, required: false },
    twistWeight: { type: Number, required: false },
    core: { type: String, required: true },
    surface: { type: String, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    thickness: { type: Number, required: true },
    handleLength: { type: Number, required: true },
    gripThickness: { type: Number, required: false },
    releaseDate: { type: Date, min: '2000-01-01', required: false },
    rating: { type: Number, required: true, default: 0 },
    rpm: { type: Number, required: false },
    rpmCategory: {
      type: String,
      enum: ['Low', 'Average', 'High'],
      required: false,
    },
    shape: {
      type: String,
      enum: ['Elongated', 'Standard', 'Blade', 'Teardrop', 'Widebody'],
      required: false,
    },
    airVent: { type: Boolean, default: false },
    elongatedHandle: { type: Boolean, default: false },
    youtubeLink: [{ type: String, required: false }],
    purchaseLink: { type: String, required: false },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Paddle = mongoose.models.Paddle || mongoose.model('Paddle', paddleSchema);
export default Paddle;
