const express = require('express');
const cors = require('cors');
const path = require('path');
const {calculateCurrentCost} = require('./shelly2');
const {getDataFromDatabase} = require('./shelly2');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());  // Enables JSON parsing
app.use(express.urlencoded({ extended: true }));  // Enables form data parsing
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

app.post('/api/databaseData', async(req, res) =>{
    try {
        
        const {dateLimit} = req.body; // iz script.js dobi array z limitacijami za "BETWEEN" stavek
        const result = await getDataFromDatabase(dateLimit); //dobi rezultat query-ja
        
        if(!dateLimit)
            return res.status(400).json({error: "Missing datelimit in body!"});

        if(result)
            res.json(result); // poslje rezultat
        else
            res.status(500).json({ error: 'Unable to fetch data' });
    } catch (error) {
        console.error('Error while trying to fetch database data: '+error);
        res.status(500).json({error: 'Server Error'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    setInterval(calculateCurrentCost, 10000); // Run calculateCost every 10 seconds
});