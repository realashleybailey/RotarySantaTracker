import express, { Request, Response } from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "./public")));
app.use((req: Request, res: Response) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});