const express = require('express');
const cors = require('cors');
const https = require('https');
const querystring = require('querystring');

const app = express();

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/checkout', async (req, res) => {
    const path = '/v1/checkouts';
    const data = querystring.stringify({
        'entityId': '8a8294174b7ecb28014b9699220015ca',
        'amount': '10.00',
        'currency': 'SAR',
        'paymentType': 'DB',
        'integrity': 'true'
    });

    const options = {
        port: 443,
        host: 'eu-test.oppwa.com',
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length,
            'Authorization': 'Bearer OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
        }
    };

    const postRequest = https.request(options, function(response) {
        const buf = [];
        response.on('data', chunk => {
            buf.push(Buffer.from(chunk));
        });
        response.on('end', () => {
            const jsonString = Buffer.concat(buf).toString('utf8');
            res.json(JSON.parse(jsonString));
        });
    });

    postRequest.on('error', (error) => {
        res.status(500).json({ error: 'Error with payment request', details: error });
    });

    postRequest.write(data);
    postRequest.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// const express = require('express');
// const path = require('path');
// const axios = require('axios');

// const app = express();
// const PORT = 5000;

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// // API route example
// app.get('/api/data', async (req, res) => {
//   try {
//     const response = await axios.get('https://api.example.com/data');
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send('Error fetching data');
//   }
// });

// // Catch-all handler: send React app for all other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
