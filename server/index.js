const express = require('express')
const { spawn } = require("child_process");
const cors = require('cors')

const app = express()
app.use(express.json())   
app.use(cors({
  origin: '*',
}))
const port = 5050

app.post('/find', (req, res) => {
  const {aLength, bLength, aEdges, bEdges} = req.body

  const child = spawn("./index");
  child.stdin.write(`${aLength}\n`);

  aEdges.forEach(edge => {
    child.stdin.write(`${edge.join('-')}\n`)
  });

  if((aLength * (aLength - 1)) / 2 > aEdges.length) child.stdin.write("exit\n")

  child.stdin.write(`${bLength}\n`)

  bEdges.forEach(edge => {
    child.stdin.write(`${edge.join('-')}\n`)
  });

  if((bLength * (bLength - 1)) / 2 > bEdges.length) child.stdin.write("exit\n")

  child.stdin.end();


  child.stdout.on("data", (data) => {
    const result = `${data}`.split("\r\n").filter(line => line).map(line => line.split(' ').filter(item => item));
    res.json({data: result});
  });
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})