const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BASE_URL': prod
    ? 'https://portfolio-daniel.herokuapp.com'
    : 'https://portfolio-daniel.herokuapp.com',
  'process.env.NAMESPACE': prod
    ? 'https://portfolio-daniel.herokuapp.com'
    : 'https://portfolio-daniel.herokuapp.com',
  'process.env.CLIENT_ID': 'lA12U3hB7gOeyTigHHECUQWJ680vwq4C'
};
