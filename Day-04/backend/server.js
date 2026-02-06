require('dotenv').config();
const ConnectDB = require('./src/config/database');
const app = require('./src/app');

ConnectDB();

const PORT = 3000

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})