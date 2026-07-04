require("dotenv").config(); // <--- Yeh hamesha sabse upar hona chahiye!

const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

app.listen(3000, () => {
    console.log('SERVER IS RUNNING ON PORT 3000');
});