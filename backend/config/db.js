import mongoose from 'mongoose';

// Connect to MongoDB with sensible defaults and clear logging
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/greenlife';

  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI not set. Falling back to local MongoDB at mongodb://127.0.0.1:27017/greenlife');
  }

  try {
    await mongoose.connect(uri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 10000
    });

    console.log(`Connected to MongoDB: ${uri}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

export default connectDB;
