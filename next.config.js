const path = require('path');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
    compress: true,
    poweredByHeader: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
};

module.exports = withPlugins([
    withBundleAnalyzer, withImages
],nextConfig);