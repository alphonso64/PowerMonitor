window.onload = function(){
	laydate.skin('molv');
	$('#buildAdd').click();
//	$('body').height(document.body.scrollHeight);
}

var start = {
  elem: '#dateStart',
  format: 'YYYY/MM/DD hh',
  max: laydate.now(), //最大日期
  istime: true,
  choose: function(datas){
     end.min = datas; //开始日选好后，重置结束日的最小日期
     end.start = datas //将结束日的初始值设定为开始日
  }
};
var end = {
  elem: '#dateEnd',
  format: 'YYYY/MM/DD hh',
  max: laydate.now(),
  istime: true,
  choose: function(datas){
    start.max = datas; //结束日选好后，重置开始日的最大日期
  }
};
laydate(start);
laydate(end);

var	data_t = [], data_v = [], data_i = [], data_p = [];

//模板对象
var option = {
	title: {
    x: 'center',
    top: '4%'
	},
	tooltip: {
		trigger: 'axis',
		formatter: function(params) {
			params = params[0].value;
			var date = new Date( Number(params[0]) );
			return date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds() +' ('+ params[1] +')';
		},
		axisPointer: {
			animation: false
		}
	},
	grid: {
		left: '2%',
		right: '4%',
		bottom: '10%',
		containLabel: true
	},
	xAxis: {
		type: 'time',
		splitNumber: 10,
		splitLine: {
			show: true
		}
	},
	yAxis: {
		type: 'value',
		boundaryGap: [0, '100%'],
		splitLine: {
			show: true
		}
	},
	series: [{
		name: '实数据',
		type: 'line',
		showSymbol: true,
		hoverAnimation: false,
		areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
        }, {
          offset: 1,
        }])
      }
    }
	}]
};

var chart_t = echarts.init(document.getElementById('t'));
var chart_v = echarts.init(document.getElementById('v'));
var chart_i = echarts.init(document.getElementById('i'));
var chart_p = echarts.init(document.getElementById('p'));
var option_t, option_v, option_i, option_p;
var optionArr = [
	[t, chart_t, '温度', ['rgb(255,158, 68)', 'rgb(255,70, 131)'],2000],
	[v, chart_v, '电压', ['rgb(255,129,247)', 'rgb(126,137,255)'],500],
	[i, chart_i, '电流', ['rgb(160,211,245)', 'rgb(98, 206,121)'],500],
	[p, chart_p, '功率', ['rgb(126,255,147)', 'rgb(255,186,126)'],500]
];

var option_t = deepClone(option),
		option_v = deepClone(option),
		option_i = deepClone(option),
		option_p = deepClone(option);
option_t.title.text = '温度实时数据';
option_v.title.text = '电压实时数据';
option_i.title.text = '电流实时数据';
option_p.title.text = '功率实时数据';
option_t.series[0].areaStyle.normal.color.colorStops[0].color = 'rgb(255,158, 68)';
option_v.series[0].areaStyle.normal.color.colorStops[0].color = 'rgb(255,129,247)';
option_i.series[0].areaStyle.normal.color.colorStops[0].color = 'rgb(160,211,245)';
option_p.series[0].areaStyle.normal.color.colorStops[0].color = 'rgb(126,255,147)';
option_t.series[0].areaStyle.normal.color.colorStops[1].color = 'rgb(255,70, 131)';
option_v.series[0].areaStyle.normal.color.colorStops[1].color = 'rgb(126,137,255)';
option_i.series[0].areaStyle.normal.color.colorStops[1].color = 'rgb(98, 206,121)';
option_p.series[0].areaStyle.normal.color.colorStops[1].color = 'rgb(255,186,126)';
option_t.yAxis.max = 2000;
option_v.yAxis.max = 500;
option_i.yAxis.max = 500;
option_p.yAxis.max = 500;
chart_t.setOption(option_t);
chart_v.setOption(option_v);
chart_i.setOption(option_i);
chart_p.setOption(option_p);
window.onresize = function(){
	chart_t.resize();
	chart_v.resize();
	chart_i.resize();
	chart_p.resize();
}

//历史数据数据模板
var option_o = {
	title: {
		x: 'center',
		top: '4%'
	},
	tooltip: {
		trigger: 'axis',
		formatter: function(params) {
			params = params[0].value;
			var date = new Date( Number(params[0]) );
			return date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds() +' ('+ params[1] +')';
		},
		axisPointer: {
			animation: false
		}
	},
	grid: {
		left: '2%',
		right: '4%',
		bottom: 40,
		containLabel: true
	},
	dataZoom: [{
		show: true,
		realtime: true,//拖动中更新界面
		start: 60,
		end: 80
	}, {
		type: 'inside',
		realtime: true,
		start: 60,
		end: 80
	}],
	xAxis: {
		type: 'time',
		splitLine: {
			show: true
		}
	},
	yAxis: {
		type: 'value',
		boundaryGap: [0, '100%'],
		max: 500,
		splitLine: {
			show: true
		}
	},
	series: [{
		name: '实数据',
		type: 'line',
		showSymbol: false,
		hoverAnimation: false,
		sampling: 'average',
		areaStyle: {
			normal: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
				}, {
					offset: 1,
				}])
			}
		}
	}]
};

var option_ot = deepClone(option_o);
var option_ov = deepClone(option_o);
var option_oi = deepClone(option_o);
var option_op = deepClone(option_o);
option_ot.title.text = '温度历史数据';
option_ov.title.text = '电压历史数据';
option_oi.title.text = '电流历史数据';
option_op.title.text = '功率历史数据';
option_ot.yAxis.max = 2000;
option_ot.series[0].areaStyle.normal.color.colorStops[0].color = 'rgb(255, 158,68)';
option_ot.series[0].areaStyle.normal.color.colorStops[1].color = 'rgb(255,70, 131)';
option_ov.series[0].areaStyle.normal.color.colorStops[0].color = 'rgb(255,129,247)';
option_ov.series[0].areaStyle.normal.color.colorStops[1].color = 'rgb(126,137,255)';
option_oi.series[0].areaStyle.normal.color.colorStops[0].color = 'rgb(160,211,245)';
option_oi.series[0].areaStyle.normal.color.colorStops[1].color = 'rgb(98, 206,121)';
option_op.series[0].areaStyle.normal.color.colorStops[0].color = 'rgb(126,255,147)';
option_op.series[0].areaStyle.normal.color.colorStops[1].color = 'rgb(255,186,126)';
var data_ot = [], data_ov = [], data_oi = [], data_op = [];
var chart_ot, chart_ov, chart_oi, chart_op;
var page = true;//标记历史数据是否需要刷新
$(function(){
	//菜单的切换
	$('.realBox').click(function(){
		$('#pastBox').hide();
		$('#file').hide();
		$('#realBox').show();
	});
	$('.pastBox').click(function(){
		$('#realBox').hide();
		$('#file').hide();
		$('#pastBox').show();
		if(page){
			chart_ot = echarts.init(document.getElementById('ot'));
			chart_ov = echarts.init(document.getElementById('ov'));
			chart_oi = echarts.init(document.getElementById('oi'));
			chart_op = echarts.init(document.getElementById('op'));
			page = false;
		}
	});
	$('.file').click(function(){
		$('#realBox').hide();
		$('#pastBox').hide();
		$('#file').show();
	});
});

function query(){
	if( $('#dateStart').val() != '' && $('#dateEnd').val() != '' ){
		var dateStart = $('#dateStart').val() + ':00:00';
		var dateEnd = $('#dateEnd').val() + ':00:00';
		if( new Date(dateEnd).getTime() - new Date(dateStart).getTime() <= 86400000 ){ //时间间隔小于一天
			data_ot = [];
			data_ov = [];
			data_oi = [];
			data_op = [];
			$('#loading').fadeIn(100);
			var dateJson = {
				start : dateStart,
				end : dateEnd
			};
			$.ajax({
				type:"post",
				url:"/PowerMonitor/rest/api/getHistory",
				contentType: "application/json",
				data: JSON.stringify(dateJson),
				dataType: 'json',
				success: function(e){
					if(e.return_code == "success"){
						for(var i=0; i<e.data.length; i++){
							var oldtime = new Date(e.data[i].time).getTime();
							data_ot.push([oldtime, e.data[i].temp_a]);
							data_ov.push([oldtime, e.data[i].ua]);
							data_oi.push([oldtime, e.data[i].ia]);
							data_op.push([oldtime, e.data[i].power]);
						}
						option_ot.series[0].data = data_ot;
						option_ov.series[0].data = data_ov;
						option_oi.series[0].data = data_oi;
						option_op.series[0].data = data_op;
						chart_ot.setOption(option_ot);
						chart_ov.setOption(option_ov);
						chart_oi.setOption(option_oi);
						chart_op.setOption(option_op);
						window.onresize = function(){ //自适应宽度
							chart_ot.resize();
							chart_ov.resize();
							chart_oi.resize();
							chart_op.resize();
						}
						$('#loading').fadeOut(100);
					}else{
						$('#loading').fadeOut(100);
						$('#popup>div>div').html(e.return_msg);
						$('#popup').fadeIn(300);
					}
				},
				error: function(e){
					$('#loading').fadeOut(100);
					$('#popup>div>div').html('服务器连接错误!');
					$('#popup').fadeIn(300);
				}
			});
		}else{
			$('#popup>div>div').html('输入日期间隔太长!');
			$('#popup').fadeIn(300);
		}
	}
}
$('#popup button').click(function(){
	$('#popup').fadeOut(300);
});

//深度克隆对象
function deepClone(obj){
	var result, oClass = isClass(obj);
	//确定result的类型
	if(oClass === "Object"){
		result = {};
	}else if(oClass === "Array"){
		result = [];
	}else{
		return obj;
	}
	for(key in obj){
		var copy = obj[key];
		if(isClass(copy) == "Object"){
			result[key] = arguments.callee(copy); //递归调用
		}else if(isClass(copy) == "Array"){
			result[key] = arguments.callee(copy);
		}else{
			result[key] = obj[key];
		}
	}
	return result;
}
//返回传递给他的任意对象的类
function isClass(o){
	if(o === null) return "Null";
	if(o === undefined) return "Undefined";
	return Object.prototype.toString.call(o).slice(8, -1); //确定数据类型N、S
}
var errorArr = [
	['正常', ''],
	['紧急停机', ''],
	['待机', ''],
	['紧急停机', ''],
	['设备故障', ''],
	['紧急停机', '设备故障'],
	['待机', '设备故障'],
	['紧急停机','设备故障'],
	['热效率低',''],
	['紧急停机', '热效率低'],
	['待机', '热效率低'],
	['紧急停机', '热效率低'],
	['设备故障', '热效率低']
];

var URL = window.location.href.replace(/([a-zA-Z]+\/)+(index\.html)*\?*.*/g,'PowerMonitor/websocket').replace(/https*/g,'ws');
//var URL = 'ws:\\PowerMonitor/websocket';
var socket = new ReconnectingWebSocket(URL);
socket.onopen = function(e){
	socket.send('start');
}
socket.onmessage = function(e){
	e = JSON.parse(e.data);
	var time = new Date(e.time).getTime();
	if( data_t.length > 50 ){
		data_t.shift();
		data_v.shift();
		data_i.shift();
		data_p.shift();
	}
	data_t.push([time, e.temp_a]);
	chart_t.setOption({ series: [{ data: data_t}] });
	data_v.push([time, e.ua]);
	chart_v.setOption({ series: [{ data: data_v}] });
	data_i.push([time, e.ia]);
	chart_i.setOption({ series: [{ data: data_i}] });
	data_p.push([time, e.power]);
	chart_p.setOption({ series: [{ data: data_p}] });
	var errorcode = parseInt(e.errorcode);
	$('#type1').html(errorArr[errorcode][0]);
	$('#type2').html(errorArr[errorcode][1]);
	if( errorcode == 0 ){
		$('#type1').removeClass('red');
		$('#type2').removeClass('red');
	}else{
		$('#type1').addClass('red');
		$('#type2').addClass('red');
	}
}
//文件刷新
var tpage = 20;
function fileRefresh(){
	$('#loading').fadeIn(100);
	$('#fileEchart>b').click();
	$('#buildBox>b').click();
	$.ajax({
//		type:"get",
//		url: "php/file.php",
		type:"post",
		url:"/PowerMonitor/rest/api/getFileList",
		contentType: "application/json",
		dataType: 'json',
		success: function(e){
			if( e.return_code == 'success' ){
				fileLoad(e);
				$('#loading').fadeOut(100);
			}else{
				$('#loading').fadeOut(100);
				$('#popup>div>div').html('刷新失败!');
				$('#popup').fadeIn(300);
			}
		},
		error: function(e){
			$('#loading').fadeOut(100);
			$('#popup>div>div').html('服务器连接错误!');
			$('#popup').fadeIn(300);
		}
	});
}
function fileLoad(e){ //文件数据加载
	var trList = '';
	var dataLth = e.data.length;
	for(var i=0; i<dataLth; i++){
		trList += '<tr><td><input type="radio" name="file" value="'+ e.data[i].path +'"/></td><td>'+ e.data[i].name +'</td></tr>';
	}
	$('#fileTable tbody').html(trList);
	var dataPage = Math.ceil(dataLth / tpage);//页数
	$('#fileTable tfoot span').html(1);
	$('#fileTable tfoot b').html(dataPage);
	for(var i=0; i<tpage; i++){
		$('#fileTable tbody tr').eq(i).show();
	}
}
//上翻页
function pageAdd(){
	var nowDom = $('#fileTable tfoot span');
	var nowPage = parseInt(nowDom.html());
	var dataList = $('#fileTable tbody tr');
	if(nowPage != 1 && nowPage != 0){
		dataList.hide();
		nowDom.html( nowPage - 1 );
		for( var i = ( nowPage - 2 ) * tpage; i < ( nowPage - 1 ) * tpage ; i++ ){
			dataList.eq(i).show();
		}
	}
}
function pageScc(){
	var nowDom = $('#fileTable tfoot span');
	var nowPage = parseInt(nowDom.html());
	var sumPage = parseInt($('#fileTable tfoot b').html());
	var dataList = $('#fileTable tbody tr');
	if(nowDom.html() != sumPage && nowDom.html() != 0 ){
		dataList.hide();
		nowDom.html( nowPage + 1 );
		for(var i = nowPage * tpage; i < (nowPage + 1) * tpage && i < dataList.length ; i++){
			dataList.eq(i).show();
		}
	}
}
//加载详细数据
var optionFile = {
	title: {
		x: 'center',
		top: '15'
	},
	grid: {
 		left: '30',
 		right: '30',
 		containLabel: true
 	},
 	tooltip: {
 		trigger: 'axis',
 		formatter: function (params) {
     		var color = params[0].color;
     		var tooptipText = color == '#CE000C' ? '加料':
     			  		  	  color == '#3B21B4' ? '倒包':
     			  		  	  color == '#086A29' ? '捞渣':
     			      	  	  color == '#E8A512' ? '搅拌':
     			  		  	  '无动作';
     		return tooptipText + '<br>' + params[0].name + '<br> 功率: ' + params[0].value + 'W';
 		}
 	},
 	dataZoom: [{
 		show: true,
 		realtime: true,
 		start: 30,
 		end: 70
 	},{
 		type: 'inside',
 		realtime: true,
 		start: 65,
 		end: 85
 	}],
 	xAxis: {
 		type: 'category',
 		boundaryGap: false
 	},
 	yAxis: {
 		type: 'value',
 		axisLabel: {
 			formatter: '{value} W'
 		}
 	},
 	visualMap: {
 		show: false,
 		dimension: 0
 	},
 	series: [{
 		name:'功率',
 		type:'line',
   		smooth: true,
   		lineStyle: {
   			normal: {
   				width: 4
   			}
   		},
   		markPoint : {
   			symbol: 'pin',
   			symbolSize: function(value){
   				return [value.length * 10 + 30, 50];
   			},
   			silent: true,
   			label: {
   				normal: {
   					offset: [0, -3],
   					formatter: function(params){
   						return params.value;
   					}
   				}
   			}
   		},
 		markLine: {
 			silent: true,
 			animation: false,
 			symbol: ['none', 'none'],
 			lineStyle: {
 				normal: {width: 4}
 			}
 		}
 	}]
};
var optionClone;
var chartFile;
var simpleData = [];
var chartObj = [];
var pageFile = true;
var chartType = true;
var chartAdd = [];
var chartDelete = [];
$('#fileTable tbody').on('click', 'tr', function(){
	var path = $(this).children('td').children('input').val();
	var fileName = $(this).children('td').eq(1).html();
	var namePost = {
		name: fileName,
		path: path
	}
	if(! $(this).hasClass('nev') ){ //没有选中
		$(this).addClass('nev').siblings('tr.nev').removeClass('nev');
		$.ajax({
//			type:"get",
//			url:"php/even.php",
			type:"post",
			url:"/PowerMonitor/rest/api/getFileContent",
			contentType: "application/json",
			data: JSON.stringify(namePost),
			dataType: 'json',
			async: false,
			success: function(e){
				simpleData = dataChange(deepClone(e));
				optionClone = deepClone(optionFile);
				handleData(simpleData); //处理option数据
				optionClone.title.text = '文件名:' + fileName;
				$('#fileEchart').show(); //显示弹出框
				if(pageFile){chartFile = echarts.init(document.getElementById('fileEchartBox'));}
				chartFile.setOption(optionClone); //设置图表
				window.onresize = function(){chartFile.resize();}
				chartFile.on('click', function(params){binding(params);});
			},
			error: function(){
				$('#popup>div>div').html('服务器连接错误!');
				$('#popup').fadeIn(300);
			}
		});
	}
});
//关闭
$('#fileEchart>b').click(function(){
	$(this).parent().hide();
	simpleData = [];
	chartObj = [];
	chartType = true;
	chartAdd = [];
	chartDelete = [];
	$('#fileBtn>ul input').val('');
	$('#fileBtn>a').eq(0).addClass('select').siblings('a').removeClass('select');
	$('.fileAdd').show().siblings('li').hide();
	$('#fileTable tr.nev').removeClass('nev');
});
//菜单切换
$('#fileBtn').on('click', 'a', function(){
	$(this).addClass('select').siblings('a').removeClass('select');
	$($(this).attr('id')).show().siblings('li').hide();
	chartType = $(this).attr('id') == '.fileAdd' ? true : false;
	if($(this).attr('id') == '.fileAdd'){
		chartType = true;
		markLineData(chartAdd);
	}else{
		chartType = false;
		markLineData(chartDelete);
	}
});
//添加数据
$('#fileAddSure').click(function(){
	var addTime = $('#fileAddTime').val();
	var addNumber = $('#fileAddNumber').val();
	if(chartAdd != [] && addTime != '' && addNumber != ''){
		addTime = parseInt(addTime);
		var seat = timeSeat(chartAdd[0].xAxis);
		var ac_content = simpleData[seat - 1].ac_content;
		if(ac_content != ' ' && ac_content != ''){
			simpleData[seat - 1].ac_content = '';
		}
		for(var i=0; i<addTime; i++){
			var cloneData = deepClone(simpleData[seat - 1]); //复制的位数(需要单独克隆，不然数据会相互关联)
			cloneData.power = parseInt(addNumber);
			if(i == 0){
				cloneData.ac_content = ac_content;
			}
			simpleData.splice(seat, 0, cloneData);
		}
		handleData(simpleData, 0);
	}
});
//修改数据
$('#fileChangeSure').click(function(){
	var changeStartPower = $('#fileChangeStartPower').val();
	var changeEndPower = $('#fileChangeEndPower').val();
	if(chartDelete.length == 2 && changeStartPower != '' && changeEndPower != ''){
		var changeStart = timeSeat($('#fileChangeStart').val());
		var changeEnd = timeSeat($('#fileChangeEnd').val());
		if(changeStart != changeEnd){
			for(var i=changeStart - 1; i<changeEnd; i++){
				var thisPower = Math.round((changeEndPower - changeStartPower) * ((i - changeStart + 1) / (changeEnd - changeStart)));
				simpleData[i].power = thisPower + parseInt(changeStartPower);
			}
		}else{
			simpleData[changeStart - 1].power = changeStartPower;
		}
		handleData(simpleData, 0);
	}
});
//删除数据
$('#fileDeleteSure').click(function(){
	if(chartDelete.length == 2){
		var deleteStart = timeSeat($('#fileDeleteStart').val()) - 1;
		var deleteEnd = timeSeat($('#fileDeleteEnd').val()) - 1;
		var startAction = simpleData[deleteStart].action;
		var endAction = simpleData[deleteEnd].action
		if(startAction == 101){ //开始数据为加料
			for(var i=deleteStart; i<deleteEnd; i++){
				if(simpleData[i].ac_content != '' && simpleData[i].ac_content != ' '){
					var ac_content = simpleData[i].ac_content;
					simpleData[deleteStart - 1].ac_content = ac_content;
				}
			}
		}
		//需要判断 材料 是否存在
		simpleData.splice(deleteStart, deleteEnd - deleteStart + 1);
		chartDelete = [];
		markLineData(chartDelete);
		handleData(simpleData, 0);
		$('#fileDeleteStart').val('');
		$('#fileDeleteEnd').val('');
	}
});
//提交
$('#fileSubmit').click(function(){
	var fileName = $('#fileTable tr.nev td').eq(1).html();
	$('#fileChangeSubmit input').val(fileName);
	$('#fileChangeSubmit').show();
});
$('#changeCancel').click(function(){
	$('#fileChangeSubmit').hide();
});
$('#changeSure').click(function(){
	var fileName = $('#fileChangeSubmit input').val();
	if(fileName != ''){
		$('#fileChangeSubmit').hide();
		returnData(simpleData);
		var chartObjPost = {
			data: chartObj,
			name: fileName
		}
		$.ajax({
			type:"post",
			url:"/PowerMonitor/rest/api/statusFile",
			contentType: "application/json",
			data: JSON.stringify(chartObjPost),
			dataType: 'json',
			success: function(e){
				$('#refresh').click();
				$('#popup>div>div').html('提交成功!');
				$('#popup').fadeIn(300);
			},
			error: function(){
				$('#popup>div>div').html('服务器连接错误!');
				$('#popup').fadeIn(300);
			}
		});
	}else{
		$('#popup>div>div').html('文件名不能为空!');
		$('#popup').fadeIn(300);
	}
});
//设置markLine的data
function markLineData(numb){
	chartFile.setOption({
		series: [{
			markLine: {
				data: numb
			}
		}]
	});
}
//将时间转换成数组位置
function timeSeat(timedata){
	var timeArr = timedata.split(':');
	return parseInt(timeArr[0])*3600 + parseInt(timeArr[1])*60 + parseInt(timeArr[2]);
}
function color(color){
	switch ( parseInt(color) ){
		case 101: return '#CE000C';
		case 103: return '#3B21B4';
		case 104: return '#086A29';
		case 105: return '#E8A512';
		default:  return '#000000';
	}
}
function time(num){
	var hour, minute, second;
	hour = num / 3600 >= 1 ? parseInt(num / 3600) : 0;
	hour = hour > 9 ? hour : '0' + hour;
	num -= 3600 * parseInt(hour);
	minute = num / 60 >= 1 ? parseInt(num / 60) : 0;
	second = num - 60 * minute;
	minute = minute > 9 ? minute : '0' + minute;
	second = second > 9 ? second : '0' + second;
	return hour + ':' + minute + ':' + second;
}
function binding(obj){
	if(chartType){ //普通点击
		chartAdd = [{xAxis: obj.name}];
		$('#fileAddStart').val(chartAdd[0].xAxis);
	    markLineData(chartAdd);
	}else{ //删除操作
		if(chartDelete.length < 2){
			chartDelete.push({xAxis: obj.name});
			if(chartDelete.length == 1){
			    $('#fileDeleteStart').val(obj.name);
				$('#fileChangeStart').val(obj.name);
			}else{
				if(chartDelete[0].xAxis > chartDelete[1].xAxis){
					$('#fileDeleteStart').val(chartDelete[1].xAxis);
					$('#fileDeleteEnd').val(chartDelete[0].xAxis);
					$('#fileChangeStart').val(chartDelete[1].xAxis);
					$('#fileChangeEnd').val(chartDelete[0].xAxis);
				}else{
					$('#fileDeleteStart').val(chartDelete[0].xAxis);
					$('#fileDeleteEnd').val(chartDelete[1].xAxis);
					$('#fileChangeStart').val(chartDelete[0].xAxis);
					$('#fileChangeEnd').val(chartDelete[1].xAxis);
				}
			}
		}else{
			chartDelete.shift();
			chartDelete.push({xAxis: obj.name});
			if(chartDelete[0].xAxis > chartDelete[1].xAxis){
				$('#fileDeleteStart').val(chartDelete[1].xAxis);
				$('#fileDeleteEnd').val(chartDelete[0].xAxis);
				$('#fileChangeStart').val(chartDelete[1].xAxis);
				$('#fileChangeEnd').val(chartDelete[0].xAxis);
			}else{
				$('#fileDeleteStart').val(chartDelete[0].xAxis);
				$('#fileDeleteEnd').val(chartDelete[1].xAxis);
				$('#fileChangeStart').val(chartDelete[0].xAxis);
				$('#fileChangeEnd').val(chartDelete[1].xAxis);
			}
		}
		markLineData(chartDelete);
	}
}
//将原始数据转换成简单数据
function dataChange(data){
	var clone = [];
	var preAction = 100;
	var isData = [];
	var cloneData = [];
	for(var i=0; i<data.length; i++){
		var ac_content = data[i].ac_content;
		var ac_info = data[i].ac_info;
		var action = data[i].action;
		var ac_sta = data[i].ac_sta;
		var level = data[i].level;
		var power = data[i].power;
		var temp = data[i].temp;
		if(action == 100){
			if(preAction != 100){ //刚进入设置界面
				if(ac_sta == 151){ //确认
					isData = [];
					for(var j=0; j<cloneData.length; j++){
						cloneData[j].action = preAction;
					}
					clone = clone.concat(cloneData);
					if(ac_content != '' && ac_content != ' '){
						if(clone.length != 0){
							clone[clone.length - 1].ac_content = ac_content;
						}
					}
					cloneData = [];
				}else{ //取消
					cloneData = cloneData.concat(isData);
				}
			}
			cloneData.push({
				ac_content: '',
				ac_info: ac_info,
				level: level,
				power: power,
				temp: temp
			});
		}else{ //如果不是，储存在另一个里面
			isData.push({
				ac_content: '',
				ac_info: ac_info,
				level: level,
				power: power,
				temp: temp
			});
		}
		preAction = action; //更新状态码
	}
	return clone;
}
//option的数据处理
function handleData(data, bool){
	var dataX = [];
	var dataY = [];
	var pieces = [];
	var pointData = [];
	var startIndex = 0;
	var preAction = 0;
	for(var i=0; i<data.length; i++){
		if(i == 0){
			dataX.push(time(i));
			dataY.push(data[i].power);
		}
		dataX.push(time(i + 1));
		dataY.push(data[i].power);
		var action = data[i].action;
		var ac_content = data[i].ac_content;
		if(action != preAction && i != 0){
			if(startIndex == 0){
				pieces.push({
					gte: startIndex,
					lte: i,
					color: color(preAction)
				});
			}else{
				pieces.push({
					gt: startIndex,
					lte: i,
					color: color(preAction)
				});
			}
			startIndex = i;
		}
		if(ac_content != ' ' && ac_content != ''){ //添加标记位
			pointData.push({
				value: ac_content,
				yAxis: data[i].power,
        		xAxis: time(i + 1)
			});
		}
		preAction = action;
		if(i == (data.length - 1)){
			pieces.push({
				gt: startIndex,
				lte: i + 1,
				color: color(preAction)
			});
		}
	}
	if(bool == 0){
		chartFile.setOption({
			visualMap: {
				pieces: pieces
			},
			xAxis: {
				data: dataX
			},
			series: [{
				markPoint: {
					data: pointData
				},
				data: dataY
			}]
		});
	}else{
		optionClone.visualMap.pieces = pieces;
		optionClone.xAxis.data = dataX;
		optionClone.series[0].markPoint.data = pointData;
		optionClone.series[0].data = dataY;
	}
}
//将简单数据转换成原始数据
function returnData(data){
	chartObj = [];
	var preAction = 100;
	var preContent = '';
	var ac_sta = 150;
	for(var i=0; i<data.length; i++){
		var ac_content = data[i].ac_content;
		var ac_info = data[i].ac_info;
		var action = data[i].action;
		var level = data[i].level;
		var power = data[i].power;
		var temp = data[i].temp;
		if(preAction != action && chartObj.length != 1 && i != 0){ //添加选择
			chartObj.push({
				ac_content: '',
				ac_info: ac_info,
				ac_sta: 150,
				action: preAction,
				level: level,
				power: power,
				temp: temp
			});
			ac_sta = 151;
		}
		chartObj.push({
			ac_content: preContent,
			ac_info: ac_info,
			ac_sta: ac_sta,
			action: 100,
			level: level,
			power: power,
			temp: temp
		});
		preAction = action;
		preContent = ac_content;
		if(i == (data.length - 1) && action != 100){ //最后结尾状态不是 无动作
			chartObj.push({ //选择
				ac_content: '',
				ac_info: ac_info,
				ac_sta: 150,
				action: action,
				level: level,
				power: power,
				temp: temp
			});
			chartObj.push({ //确认
				ac_content: ac_content,
				ac_info: ac_info,
				ac_sta: 151,
				action: 100,
				level: level,
				power: power,
				temp: temp
			});
		}
	}
}
//创建新文件
var materObj = {"Ag": 0, "Cu": 1, "Cu-P": 2, "Sn": 3, "In": 4, "Sb": 5, "Ni": 6, "Cu-Zr": 7, "Mn": 8, "Zn": 9, "Cu-Si": 10}
var buildHtml = '阶段:<select><option value="101">加料</option><option value="103">倒包</option><option value="104">捞渣</option>'+
	'<option value="105">搅拌</option></select>&nbsp;起始功率:<input type="number" class="startPower"/> W&nbsp;结束功率:'+
	'<input type="number" class="endPower"/> W&nbsp;时长:<input type="number" class="buildHour"/>时<input type="number" class="buildMinute"/>'+
	'分<input type="number" class="buildSecond"/>秒&nbsp;<span>材料:<input type="text" class="buildMater" value="" readOnly="readOnly"/></span>';
//打开
$('#buildFileBtn').click(function(){
	if(!$('#fileEchart').is(":hidden")){
		$('#fileEchart>b').click();
	}
	$('#buildFile').show();
});
$('#buildAdd').click(function(){
	var liLength = $('#buildUl>li').length + 1;
	var newLi = '<li><i>' + liLength + ':' + '</i>' + buildHtml + '</li>';
	$('#buildUl').append(newLi);
});
//关闭
$('#buildBox>b').click(function(){
	$(this).parent().parent().hide();
	$('#fileBtn>ul input').val('');
	$('#fileBtn>a').eq(0).addClass('select').siblings('a').removeClass('select');
	$('#fileAdd').show().siblings('li').hide();
	$('#buildUl').html('<li><i>1:</i>' + buildHtml + '</li>');
});
//选择 加料 显示 span
$('#buildUl').on('change', 'select', function(){
	if($(this).val() == '101'){
		$(this).siblings('span').show();
	}else{
		$(this).siblings('span').hide();
		$(this).siblings('span').children('input').val('');
	}
});
//打开材料
$('#buildUl').on('click', 'input.buildMater', function(){
	$(this).parent().parent('li').addClass('mater').siblings('li.mater').removeClass('mater');
	if($(this).val() != ''){
		var materArr = $(this).val().split(' ');
		for(var i=0; i<materArr.length; i++){
			$('#material input').eq(materObj[materArr[i]]).get(0).checked = true;
		}
	}
	$('#material').show();
});
//材料确认
$('#material button').click(function(){
	$('#material').hide();
	var inputList = $('#material input');
	var valString = '';
	for(var i=0; i<11; i++){
		if(inputList.eq(i).get(0).checked == true){
			if(valString != ''){
				valString += ' ';
			}
			valString += inputList.eq(i).val();
		}
		inputList.eq(i).get(0).checked = false;
	}
	$('#buildUl li.mater .buildMater').val(valString);
	$('#buildUl li.mater').removeClass('mater');
});
//提交
$('#buildSubmit').click(function(){
	var liList = $('#buildUl>li');
	for(var i=0; i<liList.length; i++){
		var ac_content = liList.eq(i).children('span').children('input').val();
		var liAction = parseInt(liList.eq(i).children('select').val()); //action
		var startPower = parseInt(liList.eq(i).children('.startPower').val());
		var endPower = parseInt(liList.eq(i).children('.endPower').val());
		var buildHour = liList.eq(i).children('.buildHour').val();
		var buildMinute = liList.eq(i).children('.buildMinute').val();
		var buildSecond = liList.eq(i).children('.buildSecond').val();
		buildHour = buildHour == '' ? 0 : buildHour;
		buildMinute = buildMinute == '' ? 0 : buildMinute;
		buildSecond = buildSecond == '' ? 0 : buildSecond;
		var liTime = buildHour * 3600 + buildMinute * 60 + parseInt(buildSecond);
		if(isNaN(startPower) || isNaN(endPower)  || liTime == 0){return false;}
		if(liAction == 101 && ac_content == ''){return false;}
		for(var j=0; j<liTime; j++){
			var thisPower = Math.round((endPower - startPower) * (j / (liTime - 1)));
			if(j == (liTime - 1)){
				simpleData.push({
					ac_content: ac_content,
					ac_info: '',
					action: liAction,
					level: 0,
					power: thisPower + startPower,
					temp: 0
				});
			}else{
				simpleData.push({
					ac_content: '',
					ac_info: '',
					action: liAction,
					level: 0,
					power: thisPower + startPower,
					temp: 0
				});
			}
		}
	}
	optionClone = deepClone(optionFile);
	handleData(simpleData); //处理option数据
	optionClone.title.text = '新建文件';
	$('#fileEchart').show(); //显示弹出框
	$('#buildBox>b').click();
	if(pageFile){ chartFile = echarts.init(document.getElementById('fileEchartBox'));}
	chartFile.setOption(optionClone); //设置图表
	window.onresize = function(){chartFile.resize();}
	chartFile.on('click', function (params) {binding(params);});
});
//删除文件
$('#fileTable>tbody').on('click', 'input', function(e){
	 e.stopPropagation();
});
$('#buildDelete').click(function(){
	var inputChecked = $('input[name="file"]:checked');
	if(inputChecked[0] != undefined){
		var name = inputChecked.siblings('td').html();
		var deleteObj = {
			name: name,
			path: inputChecked.val()
		}
		$.ajax({
			type:"post",
			url:"/PowerMonitor/rest/api/delFile",
			contentType: "application/json",
			data: JSON.stringify(deleteObj),
			dataType: 'json',
			success: function(e){
				if(e.return_code == 'success'){
					$('#refresh').click();
					$('#popup>div>div').html('删除成功!');
				}else{
					$('#popup>div>div').html('删除失败!');
				}
				$('#popup').fadeIn(300);
			},
			error: function(){
				$('#popup>div>div').html('服务器连接错误!');
				$('#popup').fadeIn(300);
			}
		});
	}else{
		$('#popup>div>div').html('请选择文件!');
		$('#popup').fadeIn(300);
	}
});














