import wepy from 'wepy';

const host = 'https://www.mwwae.cn/hotel';

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
const openid = (params) => wxRequest(params, host + '/getOpenId/?appId=' + params.query.id)

const getPhone = (params) => wxRequest(params, host + '/decrypt')

module.exports = {
	hotelList,
	hotelDetail,
    roomDetail,
    openid,
    getPhone
}