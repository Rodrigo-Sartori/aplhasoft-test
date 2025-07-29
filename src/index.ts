import express from 'express'
import { AppDataSource } from './api/config/data-source'
import apiRoutes from './api/route/routes'
import path from 'path'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
 next();
});

app.use('/api', apiRoutes)
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/*\w', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

AppDataSource.initialize().then(() => {
  console.log('Database connected')
  app.listen(3000, () => console.log('Server is running'))
})
