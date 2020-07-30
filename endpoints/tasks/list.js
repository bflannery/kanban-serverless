'use strict';

module.exports.handler = async event => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'Response from List Task Endpoint!',
                input: event,
            },
            null,
            2
        ),
    };
};
