import mongoose from 'mongoose';
import app from './app';

// web服务
const { PORT = 8080 } = process.env;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const mongoUri = 'mongodb://localhost/softwind';
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// mongo服务

