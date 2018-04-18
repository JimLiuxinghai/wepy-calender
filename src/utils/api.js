import wepy from 'wepy';
import env from './config'

const host = env.host;

/*
	params: {
		method: 'GET' || 'POST',
		data: {}
	}
*/
const wxRequest = async (params = {}, url) => {
    wepy.showToast({
      title: '加载中',
      icon: 'loading'
    });

    let res = await wepy.request({
        url: url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {'Content-Type': 'application/json'},
    });
    wepy.hideToast();

    return res;
};

// Index
const hotelList = (params) => wxRequest(params, host + '/queryHotelList/' + params.query.id)
const hotelDetail = (params) => wxRequest(params, host + '/getHotelDetail/' + params.query.id)
const roomDetail = (params) => wxRequest(params, host + '/getRoomDetail/' + params.query.id)

// User
const openid = (params) => wxRequest(params, host + '/getOpenId?appId=' + params.query.id)
const getUser = (params) => wxRequest(params, host + '/wxGetUser')
const getPhone = (params) => wxRequest(params, host + '/decrypt')
const register = (params) => wxRequest(params, host + '/wxRegister')

//price
const getPrice = (params) => wxRequest(params, host + '/preOrder/' + params.query.roomid + '?userId=' + params.query.userid)


//order

const submitOrder = (params) => wxRequest(params, host + '/submitOrder?userId=' + params.query.userid)

const orderList = (params) => wxRequest(params, host + '/getOrders?userId=' + params.query.userid)

const orderDetail = (params) => wxRequest(params, host + '/showOrder/' + params.query.orderid + '?userId=' + params.query.userid)

const cancelOrder = (params) => wxRequest(params, host + '/cancelOrder/' + params.query.orderid + '?userId=' + params.query.userid)

const getPay = (params) => wxRequest(params, host + '/payOrder/' + params.query.orderid + '?userId=' + params.query.userid)

const pay = (params) => wxRequest(params, host + '/miniPay?userId=' + params.query.userid)

const getCon = (params) => wxRequest(params, host + '/deferCalc?userId=' + params.query.userid)

const payDefer = (params) => wxRequest(params, host + '/deferSub?userId=' + params.query.userid)

const backOrder = (params) => wxRequest(params, host + '/restoreOrder/' + params.query.orderid + '?userId=' + params.query.userid)

const payGold = (params) => wxRequest(params, host + '/recharge?userId=' + params.query.userid)

const codeApi = (params) => wxRequest(params, host + '/promotion')

//men
const getMen = (params) => wxRequest(params, host + '/getCacheGuests?userId=' + params.query.userid)

const postMen = (params) => wxRequest(params, host + '/saveCacheGuests?userId=' + params.query.userid)

const deleteMen = (params) => wxRequest(params, host + '/delCacheGuests?userId=' + params.query.userid)

//city
const cityList = (params) => wxRequest(params, host + '/getCities/' + params.query.mctCode)

module.exports = {
	hotelList,
	hotelDetail,
    roomDetail,
    openid,
    getPhone,
    getUser,
    register,
    getPrice,
    submitOrder,
    orderList,
    orderDetail,
    getMen,
    postMen,
    cancelOrder,
    getPay,
    pay,
    cityList,
    getCon,
    payDefer,
    backOrder,
    deleteMen,
    payGold,
    codeApi
}
