const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/get-tweets', async (req, res) => {
    try {
        // Örnek olarak Twitter yerine test verisi veya Twitter API isteği dönebiliriz
        // Gerçek Twitter API Bearer Token'ını buraya ekleyeceksin
        const response = await fetch('https://api.twitter.com/2/users/BY_USERNAME/tweets', {
            headers: {
                'Authorization': 'Bearer BURAYA_TWITTER_BEARER_TOKEN_YAZ'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
