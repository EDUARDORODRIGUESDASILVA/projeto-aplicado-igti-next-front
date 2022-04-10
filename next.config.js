/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
    env: {
    customKey: 'my-value',
    // baseURL:  'https://sr2625-metas-api.herokuapp.com/api/v1'
    baseURL:  'http://localhost:7000/api/v1'

  },
   webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },

};

