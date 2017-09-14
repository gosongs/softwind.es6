import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category_id: {
      type: String
    },
    desc: {
      type: String
    },
    banner: {
      type: String
    },
    author_id: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    real_views: {
      type: Number,
      default: 0
    },
    stars: {
      type: Number,
      default: 0
    },
    real_stars: {
      type: Number,
      default: 0
    },
    is_draft: {
      type: Boolean,
      default: true
    },
    is_top: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  }
);

PostSchema.statics = {
 
};

export default mongoose.model('post', PostSchema);