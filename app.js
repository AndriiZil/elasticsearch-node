const express = require('express');
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');
const app = express();

app.use(bodyParser.json());

const esClient = elasticsearch.Client({
    host: 'http://127.0.0.1:9200',
});

esClient.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});

app.post('/', (req, res) => {

});

app.listen(process.env.PORT || 3000, () => {
    console.log('connected')
});
