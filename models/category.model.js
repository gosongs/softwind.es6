import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    child_num: {
      type: Number,
      default: 0
    },
    status: {
      type: Boolean,
      default: true
    },
    created_at: {
      type: Date,
      default: Date.now()
    },
    updated_at: {
      type: Date,
      default: Date.now()
    }
  }
);

CategorySchema.statics = {

};

export default mongoose.model('category', CategorySchema);