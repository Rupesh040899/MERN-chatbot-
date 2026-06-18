import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  message: { type: String, required: true },
  reply:   { type: String, required: true },
  provider: { type: String, default: 'groq' },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Chat', chatSchema);
