// create express app and serve home.html

const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
    }
);

app.get('/api', (req, res) => {
    const now = new Date();
    res.json({
        utc: now.toUTCString(),
        unix: now.getTime()
    });
    }
);

app.get('/api/:timesamp', (req, res) => {
    const { timesamp } = req.params;

    // if timestamp is unix
    if (!isNaN(timesamp)) {
        const date = new Date(parseInt(timesamp));
        res.json({
            utc: date.toUTCString(),
            unix: date.getTime()
        });
    }

    // if timestamp is invalid
    const date = new Date(timesamp);
    if (date.toString() === 'Invalid Date') {
        res.json({
            error: 'Invalid Date'
        });
        return;

    }
    // if timestamp is valid
    res.json({
        utc: date.toUTCString(),
        unix: date.getTime()
    });
    }
);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
    }
);
