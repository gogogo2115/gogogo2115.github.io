const path = require('path');

const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const withImages = require('next-images');

const nextConfig = {
    compress: true,
    poweredByHeader: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    images: {
        disableStaticImages: true,
    },
};

module.exports = withPlugins([
    withBundleAnalyzer, withImages

], nextConfig);