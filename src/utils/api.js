import wepy from 'wepy';

const host = 'https://www.mwwae.cn/hotel';

/*
	params: {
		method: 'GET' || 'POST',
		data: {}
	}
*/
const wxRequest = async (params = {}, url) => {
    // wepy.showToast({
    //   title: '加载中',
    //   icon: 'loading'
    // });
    
    let res = await wepy.request({
        url: url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {'Content-Type': 'application/json'},
    });
    // wepy.hideToast();
    console.log(res, 'util')
    return res;
};

// Index
const hotelList = (params) => wxRequest(params, host + '/queryHotelList/' + params.query.id)
const getVolIdList = (params) => wxRequest(params, host + '/api/hp/idlist/0')
const getVolsByMonth = (params) => wxRequest(params, host + '/api/hp/bymonth/' + params.query.month)
const getVolDetailById = (params) => wxRequest(params, host + '/api/hp/detail/' + params.query.id)

module.exports = {
	hotelList,
	getVolIdList,
	getVolsByMonth,
	getVolDetailById
}