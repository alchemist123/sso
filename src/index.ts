import express from 'express';
import bodyParser from 'body-parser';
import { googleSignIn, appleSignIn } from './auth';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/auth/google', googleSignIn);
app.post('/auth/apple', appleSignIn);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
