import wepy from 'wepy';

const host = 'http://v3.wufazhuce.com:8000';
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
    console.log(url);
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
const getVolById = (params) => wxRequest(params, host + '/api/hp/detail/' + params.query.id);
const getVolIdList = (params) => wxRequest(params, host + '/api/hp/idlist/0');
const getVolsByMonth = (params) => wxRequest(params, host + '/api/hp/bymonth/' + params.query.month);
const getVolDetailById = (params) => wxRequest(params, host + '/api/hp/detail/' + params.query.id);

module.exports = {
  getVolById,
  getVolIdList,
  getVolsByMonth,
  getVolDetailById
};