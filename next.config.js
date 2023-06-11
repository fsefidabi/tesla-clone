/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: false,
  webpack: (config, options) => {
    config.module.rules.push({
      resolve: {
        alias: {
          icons: path.resolve(__dirname, 'components/Icons'),
          constants: path.resolve(__dirname, 'constants'),
          components: path.resolve(__dirname, 'components'),
          hooks: path.resolve(__dirname, 'hooks'),
          ...config.resolve.alias
        }
      }
    })
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   issuer: {
    //     test: /\.(js|ts)x?$/
    //   },
    //   use: ['@svgr/webpack']
    // })

    return config
  }
}

module.exports = nextConfig
