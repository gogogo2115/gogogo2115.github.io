const path = require('path');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = {
    compress: true,
    poweredByHeader: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
};

module.exports = withPlugins([
    withImages
],nextConfig);