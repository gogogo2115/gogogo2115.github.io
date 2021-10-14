module.exports = {
    compress: true,
    exportPathMap: () => ({
        "/": { page: "/" },
        "/main": { page: "/" },
        "/home": { page: "/" }
    })
}