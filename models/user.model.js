import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    nickname: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    city: {
      type: String
    },
    avatar_url: {
      type: String
    },
    level: {
      type: Number,
      default: 1
    },
    sign: {
      type: String
    },
    token: {
      type: String
    },
    status: {
      type: Boolean,
      default: true
    },
    last_ips: {
      type: String
    },
    subscribe_status: {
      type: Boolean,
      default: false
    },
    created_at: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: {
      updatedAt: 'updated_at',
    }
  }
);

UserSchema.statics = {

};

export default mongoose.model('user', UserSchema);