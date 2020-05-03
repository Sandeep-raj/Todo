const app = require('./Server/server');
const config = require('./Server/config/config')

console.log(config);

app.listen(config.port);