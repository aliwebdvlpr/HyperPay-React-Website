const express = require('express');
const cors = require('cors');
const https = require('https');
const querystring = require('querystring');

const allowedOrigins = [
    'https://hyper-pay-react-website.vercel.app',
    'http://localhost:3001' // Include localhost for testing in development
];

const app = express();

// Configure CORS middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Enable if you need to include cookies or authorization headers
}));

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
