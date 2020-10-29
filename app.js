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

app.post('/products', async (req, res) => {
    try {
        const result = await esClient.index({
            index: 'products',
            body: {
                "id": req.body.id,
                "name": req.body.name,
                "price": req.body.price,
                "description": req.body.description,
            }
        });

        return res.send(result);
    } catch (err) {
        console.log(err);
    }
});

app.get('/products', async (req, res) => {
    try {
        const searchText = req.query.text;

        const result = await esClient.search({
            index: 'products',
            body: {
                query: {
                    match: {
                        "name": searchText.trim()
                    }
                }
            }
        })

        return res.send(result);
    } catch (err) {
        console.log(err);
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('connected')
});
