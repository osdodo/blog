const sitemap = require('nextjs-sitemap-generator');
// const fs = require('fs')
// const BUILD_ID = fs.readFileSync('.next/BUILD_ID').toString()

sitemap({
    baseUrl: 'https://blog.imatrix.fun',
    // 使用静态导出后的正确路径
    pagesDirectory: __dirname + '/out',
    targetDirectory: 'public/',
    ignoredExtensions: ['js', 'map'],
    ignoredPaths: ['assets', '_next'], // Exclude everything that isn't static page
});
