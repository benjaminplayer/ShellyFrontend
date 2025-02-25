const express = require('express');
const cors = require('cors');
const path = require('path');
const {calculateCurrentCost} = require('./shelly2');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', async (req, res) => {
    try {
        const result = await calculateCurrentCost(); // Call the function to calculate the cost

        if (result) {
            res.json(result); // Send the result to the frontend
        } else {
            res.status(500).json({ error: 'Unable to fetch data' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    setInterval(calculateCurrentCost, 10000); // Run calculateCost every 10 seconds
});