'use strict';
const pg = require('pg')


module.exports.handler = async event => {
    const { name, description } = event.body

    const client = new pg.Client(dbConfig);

    const query = "INSERT into tasks (name, description) VALUES ('new task', 'new task description');"

    let result;

    try {
        await client.connect()
        const res = await client.query(query)
        console.log(res.rows[0])
        result = res
    } catch (err) {
        result = err
        console.log(err.stack)
    }

    await client.end()
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(result),

    }
};
