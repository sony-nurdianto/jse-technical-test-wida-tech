import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes'

const port: number = 8080;
const app = express();
 
app.use(bodyParser.json())
app.use('/', routes)

app.listen(port,() => {
    console.log(`Server is runnning on port:${port}`);
});