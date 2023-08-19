const app = require('./src/app'); // Import the app setup from app.js

app.listen(process.env.PORT, () => {
    console.log(`listening to port ${process.env.PORT}`);
});
