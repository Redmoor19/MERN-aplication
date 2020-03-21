const express = require('express');

const app = express()
app.use(express.json({extended: true}))

app.use('/api/auth',require('./routes/authentication'))
app.use('/api/profile',require('./routes/profile'))

app.listen(5000, () => {
    console.log('Server is up')
})
