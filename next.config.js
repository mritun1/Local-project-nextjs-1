/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public'
})

module.exports = withPWA({
    // next.js config
    images: {
        domains: ['storage.googleapis.com'],
    },
})

//-----------------------------------------------

// const nextConfig = {
//     //RUN BUILD
//     //output:'export',
// }

// module.exports = nextConfig


