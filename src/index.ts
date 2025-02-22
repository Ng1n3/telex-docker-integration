import express,{ Application, Request, Response} from 'express';
import cors from 'cors'
import helmet from 'helmet'

const app: Application = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors())
app.use(helmet())

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: 'OK',
    message: "Container API is currently running"})
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})