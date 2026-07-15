const mongoose = require("mongoose");
async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error("MongoDB connect error: ", error);
    process.exit(1);
  }
}
module.exports=connectMongoDB