import express from 'express';
import * as path from 'path';
import userRoutes from './routes/user.routes';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

app.use('/', userRoutes);

const port = process.env.PORT || 8001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
