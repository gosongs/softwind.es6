import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    desc: {
      type: String,
    },
    status: {
      type: Boolean
    },
    created_at: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  }
);

CategorySchema.statics = {
 
};

export default mongoose.model('category', CategorySchema);