import express from 'express';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

app.get('/health', (req, res) => {
  res.send({ message: 'Welcome to flex-stay-ms-users-service!' });
});

const port = process.env.PORT || 8001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
