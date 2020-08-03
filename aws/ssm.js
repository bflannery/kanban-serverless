const AWS = require('aws-sdk');

const { REGION } = process.env;

const ssm = new AWS.SSM({
  apiVersion: '2014-11-06',
  region: REGION,
});

module.exports.get_parameter = async name => {
  try {
    const params = {
      Name: name,
      WithDecryption: true,
    };
    const param = await ssm.getParameter(params).promise();
    return param.Parameter.Value;
  } catch (err) {
    return err
  }
};
