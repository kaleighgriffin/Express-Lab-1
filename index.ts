import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});