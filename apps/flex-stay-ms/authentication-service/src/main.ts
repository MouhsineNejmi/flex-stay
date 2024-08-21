import express from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import { HandleErrorWithLogger } from '@flex-stay/utils';

import routes from './routes';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cookieParser());
app.use(express.json());

app.use('/', routes);

app.use(HandleErrorWithLogger);

const port = 8002;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
