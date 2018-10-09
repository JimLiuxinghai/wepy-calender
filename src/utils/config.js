let currentEnv = 'dev'
if(process.env.NODE_ENV.match('production')) {
    currentEnv = process.env.NODE_ENV
}
else {
    currentEnv = 'dev'
}
const env = {
    dev: {
         host: 'https://shop1.aiduminsu.com/hotel',
        appid: 'wxdf0a4eff9ba24e02',
        mctCode: '0000',
        payUrl: `https://shop1.aiduminsu.com/hotel/miniCallback/wxdf0a4eff9ba24e02`,
        imgUrl: 'http://img.aiduminsu.com:80/i15/',
        noneedId: true
    },
    // dev: {
    //     host: 'https://shop1.aiduminsu.com/hotel',
    //     appid: 'wx36d0488dc9e41578',
    //     mctCode: 1111,
    //     payUrl: `https://shop1.aiduminsu.com/hotel/miniCallback/wx36d0488dc9e41578`,
    //     imgUrl: 'http://img.aiduminsu.com:80/i15/'
    // },
    production: {
        host: 'https://shop1.aiduminsu.com/hotel',
        appid: 'wx36d0488dc9e41578',
        mctCode: 1111,
        payUrl: `https://shop1.aiduminsu.com/hotel/miniCallback/wx36d0488dc9e41578`,
        imgUrl: 'http://img.aiduminsu.com:80/i15/',
        noneedId: false
    },
    productiondf: {
        host: 'https://shop1.aiduminsu.com/hotel',
        appid: 'wxdf0a4eff9ba24e02',
        mctCode: '0000',
        payUrl: `https://shop1.aiduminsu.com/hotel/miniCallback/wxdf0a4eff9ba24e02`,
        imgUrl: 'http://img.aiduminsu.com:80/i15/',
        noneedId: true
    }
}
module.exports = env[currentEnv]