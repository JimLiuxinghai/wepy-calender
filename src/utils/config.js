const currentEnv = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

const env = {
    dev: {
        host: 'https://www.mwwae.cn/hotel',
        appid: 'wxdf0a4eff9ba24e02',
        mctCode: 0,
        payUrl: `http://shop0.h.nicelife-china.com`,
        imgUrl: 'http://img.nicelife-china.com:80/i15/'
    },
    prod: {
        host: 'https://shop1.aiduminsu.com/hotel',
        appid: 'wx36d0488dc9e41578',
        mctCode: 0,
        payUrl: `http://shop0.h.aiduminsu.com`,
        imgUrl: 'http://img.nicelife-china.com:80/i15/'
        //imgUrl: 'http://img.aiduminsu.com:80/i15/'
    }
}

module.exports = env[currentEnv]