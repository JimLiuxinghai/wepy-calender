const dateUtils =  {
	/**
	 * 判断年份是否为润年
	 *
	 * @param {Number} year
	 */
	isLeapYear(year) {
		return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
	},
	/**
	 * 获取某一年份的某一月份的天数
	 *
	 * @param {Number} year
	 * @param {Number} month
	 */
	getMonthDays(year, month) {
		return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (dateUtils.isLeapYear(year) ? 29 : 28);
	},
	/**
	 * 字符串转日期
	 * @param str
	 * @returns {Date}
	 */
	strToDate: function (str) {
		let isoExp = /^\s*(\d{4})[-\/\u4e00-\u9fa5](\d\d?)[-\/\u4e00-\u9fa5](\d\d?)[\u4e00-\u9fa5]?\s*$/;
		let date = new Date();
		let month;
		let parts = isoExp.exec(str);
		if (parts) {
			month = +parts[2];
			date.setFullYear(parts[1], month - 1, parts[3]);
			date.setHours(0, 0, 0, 0);
			if (month != date.getMonth() + 1) {
				date.setTime(NaN);
			}
		}
		return date;
	},
	/**
	 * 获取节假日日历
	 */
	calendar (param){
		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		const currYear = currentDate.getFullYear();
		const currMonth = currentDate.getMonth();
		const currDay = currentDate.getDate();

		let observe_dt = [];

		function observeDts(config) {
			// if (config.disabled) {
			// 	return;
			// }
			const year = config.year;
			let m = config.month + 1;
			const month = m < 10 ? (`0${m}`) : m;
			const day = config.index < 10 ? (`0${config.index}`) : config.index;

			const datestr = `${year}-${month}-${day}`;
			observe_dt.push(datestr);

			observe_dt = observe_dt.sort(function (a, b) {
				const aItem = dateUtils.strToDate(a);
				const bItem = dateUtils.strToDate(b);
				return aItem - bItem;
			});

			return datestr
		}

		function getCurrent(config){
			config.year = parseInt(config.year);
			return {
				year: config.year === currYear,
				month: config.year === currYear && config.month === currMonth,
				day: config.year === currYear && config.month === currMonth &&  config.index === currDay
			};
		}

		let values = [];
		let days;
		days = new Date(param.year, param.month + 1, 0).getDate();
		for (let i = 0; i < days; i++) {
			values.push({
				value: '',
				index: i
			});
		}

		let _date = dateUtils.strToDate(param.year + '-' + (param.month + 1) + '-01');
		let _week = _date.getDay();
		let _prevDays;
		// 第一
		let _firstWeek = 0;
		let monthArray = [[]];
		let num = 0;
		let monthArrayIndex = 0;
		//拼接上个月天数
		if (_week != _firstWeek) {
			let year = param.year;
			let month = param.month;
			if (param.month === 0) {
				year = param.year - 1;
				month = 12;
			}

			const monthDay = dateUtils.getMonthDays(year, month - 1);
			_prevDays = dateUtils.strToDate(`${year}-${month}-${monthDay}`).getDate();

			for (let i = _week; i > _firstWeek; i--) {
				const prev = _prevDays - i + 1;
				const month = param.month - 1;

				const config = {
					year: month < 0 ? (param.year - 1) : param.year,
					month: month < 0 ? 11 : month,
					index: prev,
					val: false
				};
				const __date = dateUtils.strToDate(`${config.year}-${config.month + 1}-${config.index}`);
				config.disabled = currentDate < __date;
				config.__date = observeDts(config);

				monthArray[monthArrayIndex].push(config);
				
				num++;
			}
		}
		//本月天数
		values.forEach((item, index)=> {
			if (num % 7 === 0) {
				monthArrayIndex++;
				monthArray[monthArrayIndex] = []
			}
			const month = param.month;

			const config = {
				year: param.year,
				month: month,
				index: index + 1,
				val: item.value || ''
			};

			const __date = dateUtils.strToDate(`${config.year}-${config.month + 1}-${config.index}`);
			config.disabled = currentDate < __date;
			config.__date = observeDts(config);
			config.current = getCurrent(config);

			monthArray[monthArrayIndex].push(config);
			
			num++;
		});
		//拼接下月天数
		let next = (num) % 7;
		if (num < 42) {
			next = !next ? 0 : (7 - next);
			if(num <= 35){
				next = next + 7
			}
			for (let i = 1; i <= next; i++) {
				if (num % 7 === 0) {
					monthArrayIndex++;
					monthArray[monthArrayIndex] = []
				}

				const month = param.month + 1;

				const config = {
					year: month > 11 ? (param.year + 1) : param.year,
					month: month > 11 ? 0 : month,
					index: i,
					val: false
				};

				const __date = dateUtils.strToDate(`${config.year}-${config.month + 1}-${config.index}`);
				config.disabled = currentDate < __date;
				config.__date = observeDts(config);

				monthArray[monthArrayIndex].push(config);
				num++;
			}
		}

		return monthArray;
	},
	/**
	 * 获取一个区间内，指定的周有那些天（例如：['2016-07-05', '2016-08-15']中周一那些天是周一）
	 * @param dates {Array} 需要筛选的日期有那些, 如果type === 'section'，第一项是开始日期，第二项是结束日期
	 * @param weeks {Array} 筛选的周有那些 [0,1,2,3,4,5,6]
	 * @param type {String} 默认section
	 * @returns {Array}
	 */
	filterWeek: function (dates, weeks = [0, 1, 2, 3, 4, 5, 6], type = 'section') {
		let arr = [];
		if (type === 'section') {
			let startTime = dateUtils.strToDate(dates[0]);
			let endTime = dateUtils.strToDate(dates[1]);
			let currTime = startTime;
			while (currTime.getTime() <= endTime.getTime()) {
				let currYear = currTime.getFullYear();
				let currMonth = currTime.getMonth() + 1;
				if (currMonth < 10) {
					currMonth = `0${currMonth}`
				}
				let currDate = currTime.getDate();
				if (currDate < 10) {
					currDate = `0${currDate}`
				}
				let currWeek = currTime.getDay();

				for (let i = 0; i < weeks.length; i++) {
					if (currWeek == weeks[i]) {
						arr.push(`${currYear}-${currMonth}-${currDate}`);
						break;
					}
				}

				currTime.setDate(parseInt(currDate) + 1);

			}
		} else {
			dates.forEach((item) => {
				let currTime = dateUtils.strToDate(item);
				let currYear = currTime.getFullYear();
				let currMonth = currTime.getMonth() + 1;
				if (currMonth < 10) {
					currMonth = `0${currMonth}`
				}

				let currDate = currTime.getDate();
				if (currDate < 10) {
					currDate = `0${currDate}`
				}
				let currWeek = currTime.getDay();

				for (let i = 0; i < weeks.length; i++) {
					if (currWeek === weeks) {
						arr.push(`${currYear}-${currMonth}-${currDate}`);
					}
				}
			});
		}


		return arr;

	},
}

module.exports = {
	dateUtils
}