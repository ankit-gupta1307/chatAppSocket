const path = require('path');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

const express = require('express');
const port = process.env.PORT || 3100;
var app = express();
app.use(express.static(publicPath));


// app.get('/', (req, res) => {
// 	res.send('Up and running');
// })

app.listen(port, () => {
	console.log('Server running at 3100');
})