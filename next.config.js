/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public'
})

module.exports = withPWA({
    // next.js config
})

// const nextConfig = {
//     //RUN BUILD
//     //output:'export',
// }

// module.exports = nextConfig
