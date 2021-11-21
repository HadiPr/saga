const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
class Db {

}
app.use(bodyParser.json())
app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*')
     res.setHeader('Access-Control-Allow-Headers', '*')
     res.setHeader('Access-Control-Allow-Methods', '*')
     next()
})

app.use((a, d, next) => {
     console.log('request come in')
     next()
})

const notesPath = path.join(__dirname, 'notes.json')
app.get('/notes', (req, res) => {
     const fileContent = fs.readFileSync(notesPath, 'utf-8')
     const notes = JSON.parse(fileContent || "{}")
     res.json(notes);

})
app.post('/notes', (req, res) => {
     const { body } = req
     const fileContent = fs.readFileSync(notesPath, 'utf-8')
     const result = { notes: [body] }
     if (fileContent) {
          const { notes } = JSON.parse(fileContent)
          result.notes.push(...notes)
     }
     fs.writeFileSync(notesPath, JSON.stringify(result))
     res.json({ success: true })
})

app.use((err, req, res, next) => {
     res.send(err)
})

app.listen(3001, () => {
     console.log(`Server started on port 3000...`);
});