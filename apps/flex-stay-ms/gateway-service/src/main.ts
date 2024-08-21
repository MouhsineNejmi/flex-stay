import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/users', proxy('http://localhost:8001'));
app.use('/api/auth', proxy('http://localhost:8002'));
app.use('/api/listings', proxy('http://localhost:8003'));
app.use('/api/reservations', proxy('http://localhost:8003'));

app.listen(8000, () => {
  console.log('Gateway is Listening to Port 8000');
});
