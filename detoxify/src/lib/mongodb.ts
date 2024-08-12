import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI!;

export async function connect() {
  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Gracefully handle the error, e.g., retry connection or notify
  }
}
