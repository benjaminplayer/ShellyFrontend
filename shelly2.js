// uporaba node.js, morete nujno namestiti pakete/knjižnjice z orodjem npm
const mysql = require('mysql2/promise'); // Zunanji modul -> npm install mysql2
const fs = require('fs'); // Že vgrajen modul, ga ni treba nalagat

const dbConfig = {
    host: 'localhost', // IP do baze podatkov, na tekmovanju boste tu verjetno dali 'localhost' al pa '127.0.0.1'
    user: 'root', // Username
    password: 'Geslo123', // Geslo
    database: 'shelly', // Ime baze torej ime ko uporabite CREATE DATABASE shelly; -> 'shelly'
    port: 3306 // mySQL uporablja port 3306. oracle pa 1521. poglejte katerega uporablja ta baza, ki jo boste uporabili
};

const API = 'https://api-drzavno-test.scv.si/api/tarifa'; // Verjetno bo ostal API enak
const IP = '192.168.0.46'; // IP pametne vtičnice shelly

async function getTariff() {
    try {
        const response = await fetch(API, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Tariff Info:', data);

        return data.tarifa; // Return tariff value (EUR/kWh)

    } catch (error) {
        console.error('Error fetching tariff:', error.message);
        return null;
    }
}

async function getTariffInfo() {
    try {
        const response = await fetch(API, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Return tariff value (EUR/kWh)

    } catch (error) {
        console.error('Error fetching tariff:', error.message);
        return null;
    }
}

async function getCurrentPowerUsage() {
    try {
        const url = `http://${IP}/rpc/Switch.getStatus?id=0`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Power Usage Info:', data);

        return data;

    } catch (error) {
        console.error('Error fetching power usage:', error.message);
        return null;
    }
}

async function calculateCurrentCost() {
    const tarifa = await getTariff(); // Pridobi trenutno ceno elektrike
    const tariffInfo = await getTariffInfo();
    const shellyData = await getCurrentPowerUsage(); // Pridobi trenutne podatke s vticnice
    if (tarifa === null || shellyData === null) {
        console.log('Unable to calculate cost due to missing data.');
        return;
    }

    //console.log(tariffInfo.ura);

    //saveToDatabase(shellyData, tarifa);
    saveToFile(shellyData);

    const powerInKw = shellyData.apower / 1000; // Convert W to kW
    const costPerHour = powerInKw * tarifa; // EUR per hour

    const result ={
        powerUsage: shellyData.apower,
        tariff: tariffInfo.tarifa,
        time: tariffInfo.ura,
        costPerHour: costPerHour.toFixed(4),
    }

    console.log(`Current power usage: ${shellyData.apower} W`);
    console.log(`Current tariff: ${tarifa} EUR/kWh`);
    console.log(`Current cost per hour: ${costPerHour.toFixed(4)} EUR`);
    
    return result;
}

function saveToFile(data) { // Sharni podatke, prejete iz vticnice v .json file
    try {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error saving file: ${error}`);
    }
}

/*async function saveToDatabase(data, pricePerH) {
    try {
        const connection = await mysql.createConnection(dbConfig);

        const query = `INSERT INTO stats (
                device_id, source, output, apower, voltage, freq, current, 
                total_energy, temperature_c
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`

        // CREATE DATABASE shelly;
        // USE shelly;
        
        // CREATE TABLE stats (
        //     id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        //     apower DOUBLE,
        //     pricePerH DOUBLE,  -- Avoid using `/` in column names
        //     dateTime DATETIME     -- Stores date + time (YYYY-MM-DD HH:MM:SS)
        // );
        
        const values = [ // Baza podatkov naj vsebuje ID, apower, Cena/H, DATUM. ce se kaj portebujete dodatje
            data.id,
            data.apower,
            pricePerH,
            data.date,
        ]; // Nisem siguren, katere podatke ima 'data', zato ce .date ne dela spremenite

        await connection.execute(query, values);
        await connection.end();

    } catch (error) {
        console.error('Error saving data to the database:', error);
    }
}
*/
calculateCurrentCost();
// Run the data fetch every 10 seconds
//setInterval(calculateCurrentCost, 10000);  // 10000 milliseconds = 10 seconds
module.exports = { getTariff, getCurrentPowerUsage, calculateCurrentCost };
