const express = require('express')
const app = express();
const port = process.env.port || 5000

// Console log when listening to port
app.listen(port, () => console.log(`Listening on port ${port}`))

// Create a GET route
app.get('/express_backend', (request, response) => {
    response.send (
        {
            express: 'Your express backend is connected'
        }
    );
});

