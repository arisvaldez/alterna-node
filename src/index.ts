import express from 'express';
import { personajeRoute } from './routes/personaje.routes';

const port = 3000;
const app = express();

app.use(express.json());

app.use('/personaje', personajeRoute);

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});