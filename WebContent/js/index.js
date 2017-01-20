window.onload = function(){
	laydate.skin('molv');
	$('body').height(document.body.scrollHeight);
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

for(var i=0; i<4; i++){
	optionArr[i][0] = deepClone(option);
	optionArr[i][0].title.text = optionArr[i][2] + '实时数据';
	optionArr[i][0].series[0].areaStyle.normal.color.colorStops[0].color = optionArr[i][3][0];
	optionArr[i][0].series[0].areaStyle.normal.color.colorStops[1].color = optionArr[i][3][1];
	optionArr[i][0].yAxis.max = optionArr[i][4];
	optionArr[i][1].setOption(optionArr[i][0]);
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
		realtime: true,//拖动更新界面
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
			$('#loading').fadeIn(300);
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
						$('#loading').fadeOut(300);
					}else{
						$('#loading').fadeOut(300);
						$('#popup>div>div').html(e.return_msg);
						$('#popup').fadeIn(300);
					}
				},
				error: function(e){
					$('#loading').fadeOut(300);
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
var URL=window.location.href.replace(/([a-zA-Z]+\/)+(index\.html)*\?*.*/g,'PowerMonitor/websocket').replace(/https*/g,'ws');
var socket = new ReconnectingWebSocket(URL);
socket.onopen = function(e){
	socket.send('start');
}
socket.onmessage = function(e){
	e = JSON.parse(e.data);
	var time = new Date(e.time).getTime();
	if( data_t.length > 9 ){
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
/**
//文件刷新
var tpage = 20;
function fileRefresh(){
	$('#loading').fadeIn(300);
	$.ajax({
		type:"post",
		url:"/PowerMonitor/rest/api/getFileList",
		contentType: "application/json",
		dataType: 'json',
		success: function(e){
			if( e.return_code == 'success' ){
				fileLoad(e);
				$('#loading').fadeOut(300);
			}else{
				$('#loading').fadeOut(300);
				$('#popup>div>div').html('刷新失败!');
				$('#popup').fadeIn(300);
			}
		},
		error: function(e){
			$('#loading').fadeOut(300);
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
		for(var i = (nowPage - 2) * tpage; i < (nowPage -1) * tpage ; i++){
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
//下发
function issued(){
	if( $('input[name="file"]:checked').length != 0 ){
		var path = $('input[name="file"]:checked').val()
	}
}
***/






