const currentEnv = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

const env = {
    dev: {
        host: 'https://www.mwwae.cn/hotel',
        appid: 'wxdf0a4eff9ba24e02',
        mctCode: 0,
        payUrl: `http://shop0.h.nicelife-china.com`
    },
    // dev: {
    //     host: 'https://www.mwwae.cn/hotel',
    //     appid: 'wx36d0488dc9e41578',
    //     mctCode: 0,
    //     payUrl: `http://shop0.h.nicelife-china.com`
    // },
    prod: {
        host: '23',
        appid: '4546',
        mctCode: 0,
        payUrl: ` http://shop0.h.aiduminsu.com`
    }
}
console.log(env[currentEnv], 'config')
module.exports = env[currentEnv]