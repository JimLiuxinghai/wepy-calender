const currentEnv = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

const env = {
    dev: {
        host: 'https://www.mwwae.cn/hotel',
        appid: 'wxdf0a4eff9ba24e02',
        mctCode: 1111,
        payUrl: `https://www.mwwae.cn/hotel/miniCallback/wxdf0a4eff9ba24e02`,
        imgUrl: 'http://imgtest.zhongguohanyuan.com/i15/',
        noneedId: true
    },
    // dev: {
    //     host: 'https://shop1.aiduminsu.com/hotel',
    //     appid: 'wx36d0488dc9e41578',
    //     mctCode: 1111,
    //     payUrl: `https://shop1.aiduminsu.com/hotel/miniCallback/wx36d0488dc9e41578`,
    //     imgUrl: 'http://img.aiduminsu.com:80/i15/'
    // },
    prod: {
        host: 'https://shop1.aiduminsu.com/hotel',
        appid: 'wx36d0488dc9e41578',
        mctCode: 1111,
        payUrl: `https://shop1.aiduminsu.com/hotel/miniCallback/wx36d0488dc9e41578`,
        imgUrl: 'http://img.aiduminsu.com:80/i15/',
        noneedId: false
    }
}

module.exports = env[currentEnv]