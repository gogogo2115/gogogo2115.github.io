module.exports = {
    compress: true,
    exportPathMap: () => ({
        "/main": { page: "/" },
        "/home": { page: "/" }
    })
}