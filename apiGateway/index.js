const app = require('./server');
const config = require('./config/config');

app.listen(config.port, () => {
    console.log('Server is listening at PORT '+config.port);
});