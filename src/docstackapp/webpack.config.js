switch (process.env.ASPNETCORE_ENVIRONMENT) {
    case 'Development':
        console.log("***************************DEV***************************");
        module.exports = require('./config/webpack.dev');
        break;
    case 'Production':
    default:
        console.log("***************************PROD***************************");
        module.exports = require('./config/webpack.prod');
        break;
}