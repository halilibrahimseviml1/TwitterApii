const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/get-tweets', async (req, res) => {
    const searchQuery = req.query.q || 'Roblox';
    
    try {
        const twitterUrl = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(searchQuery)}&max_results=10`;

        const response = await fetch(twitterUrl, {
            headers: {
                'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAKLK/QEAAAAA+ljEJzGN1v0JMS20ShZQcONzWeQ=3k0UDQFHk6Lg5BrY9I7VjzBda9OVL6HX6psTFz1OPYcTvtqpux'
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
