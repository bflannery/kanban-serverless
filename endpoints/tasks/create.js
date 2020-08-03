'use strict';
const pg = require('pg')
const { config } = require('../../aws/rds')

module.exports.handler = async event => {

    console.log({ event })

    const { task_uuid, name, description } = JSON.parse(event.body)

    const dbConfig = await config()

    console.log({ dbConfig })

    const client = new pg.Client(dbConfig);

    const queryValues = `'${task_uuid}', '${name}', '${description}'`

    console.log({ queryValues})

    const query = `INSERT into tasks (task_uuid, name, description) VALUES (${queryValues});`

    console.log({ query })

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
