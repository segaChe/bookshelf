const http = require('node:http');

class CounterConnector {
    constructor ({ baseUrl, port }) {
        this.baseUrl = baseUrl;
        this.port    = port;
    }

    increaseBookCounterById (id) {
        const request = http
            .request(
                `${this.baseUrl}:${this.port}/${id}/incr`,
                { method: 'POST' },
                (response) => {
                    response.on('end', () => {
                        console.log(`Status code: ${response.statusCode}`);
                    });

                    response.on('error', (error) => {
                        console.error(`problem with request: ${error.message}`);
                    });
                },
            );

        request.on('error', (error) => {
            console.error(`problem with request: ${error.message}`);
        });

        request.write('ok');
        request.end();
    }

    getBookCountById (id, successCallback = (data) => data) {
        return http
            .get(`${this.baseUrl}:${this.port}/${id}`, (res) => {
                const { statusCode } = res;
                if (statusCode !== 200) {
                    console.log(`statusCode: ${statusCode}`);
                    return;
                }

                let rowData = '';
                let counter = null;

                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    rowData += chunk;
                });
                res.on('end', () => {
                    counter = JSON.parse(rowData);
                    successCallback(counter);
                });

                return res;
            })
            .on('error', (error) => {
                console.error(error);
            });
    }
}

module.exports = CounterConnector;
