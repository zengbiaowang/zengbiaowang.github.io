"use strict"

function getStyle(obj, sName) {
	return (obj.currentStyle || getComputedStyle(obj, false))[sName];
}

function startMove(obj, json, options) {
	options = options || {};
	options.duration = options.duration || 700;
	options.easing = options.easing || 'ease-out';
	var start = {};
	var dis = {};
	for (var name in json) {
		if (isNaN(getStyle(obj, name))) {
			obj.style.opacity = 1;
		}
		start[name] = parseFloat(getStyle(obj, name));
		dis[name] = json[name] - start[name];
	}
	var count = Math.floor(options.duration / 30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		n++;
		for (var name in json) {
			var a = n / count;
			switch (options.easing) {
				case 'linear':
					var cur = start[name] + dis[name] * a; //匀速
					break;
				case 'ease-in':
					var cur = start[name] + dis[name] * Math.pow(a, 3); //加速
					break;
				case 'ease-out':
					var b = 1 - a;
					var cur = start[name] + dis[name] * (1 - Math.pow(b,3)); //减速
					break;
			}
			if (name == 'opacity') {
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:' + cur * 100 + ')';
			} else {
				obj.style[name] = cur + 'px';
			}
		}
		if (n == count) {
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
	}, 30);
}
function getDir(obj,ev){
	var x=obj.getBoundingClientRect().left+obj.offsetWidth/2-ev.clientX;
	var y=obj.getBoundingClientRect().top+obj.offsetHeight/2-ev.clientY;
	
	return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
}

function through(obj){
	var oA=obj.children[0];
	
	obj.onmouseenter=function (ev){
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent);
		switch(dir){
			case 0:
				oA.style.left=200+'px';
				oA.style.top=0;
				break;
			case 1:
				oA.style.left=0;
				oA.style.top=200+'px';
				break;
			case 2:
				oA.style.left=-200+'px';
				oA.style.top=0;
				break;
			case 3:
				oA.style.left=0;
				oA.style.top=-200+'px';
				break;
		}
		startMove(oA,{left:0,top:0,opacity:0.7},{complete:function(){
			oA.style.fontSize='20px';
		}});
	};
	obj.onmouseleave=function (ev){
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent);
		switch(dir){
			case 0:
				startMove(oA,{left:200,top:0});
				break;
			case 1:
				startMove(oA,{left:0,top:200});
				break;
			case 2:
				startMove(oA,{left:-200,top:0});
				break;
			case 3:
				startMove(oA,{left:0,top:-200});
				break;
		}
	};
}