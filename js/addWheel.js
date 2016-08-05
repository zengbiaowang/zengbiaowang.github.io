function addEvent(obj,ev,fn){
	if(obj.addEventListener){
		obj.addEventListener(ev,fn,false);
	}else{
		obj.attachEvent('on'+ev,fn);
	}
}
function addWheel(obj,fn){
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',wheel,false);
	}else{
		addEvent(obj,'mousewheel',wheel);
	}
	function wheel(ev){
		var oEvent=ev||event;
		var bDown=true;
		bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
		fn && fn(bDown);
		oEvent.preventDefault && oEvent.preventDefault();
	};
};