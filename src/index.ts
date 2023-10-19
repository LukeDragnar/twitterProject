import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
const app = express()
app.use(express.json())
const PORT = 3000
databaseService.Connect()

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.use('/users', usersRouter)
//http://localhost:3000/users/tweets

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`)
})
