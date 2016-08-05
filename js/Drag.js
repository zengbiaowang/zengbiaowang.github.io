//滚轮 拖拽
function drag(oBar,oBarBox,oCont){
	oBar.onmousedown=function(ev){
		var oEvent=ev||event;
		var disY=oEvent.clientY-oBar.offsetTop;
		document.onmousemove=function(ev){
			var oEvent=ev||event;
			var newT=oEvent.clientY-disY;
			Scroll(newT);
		};
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;
			oBar.releaseCapture&&oBar.releaseCapture();
		};
		oBar.setCapture&&oBar.setCapture();
		return false;
	};
	addWheel(oCont,function(bDown){
		var t=oBar.offsetTop;
		if(bDown){
			t+=10;
		}else{
			t-=10;
		}
		Scroll(t);
	})
	function Scroll(newT){
		if(newT<=0){
			newT=0;
		}
		if(newT>=oBarBox.offsetHeight-oBar.offsetHeight){
			newT=oBarBox.offsetHeight-oBar.offsetHeight;
		}
		var scale=newT/(oBarBox.offsetHeight-oBar.offsetHeight);
		oCont.style.top=-scale*(oCont.offsetHeight-oBarBox.offsetHeight)+'px';
		oBar.style.top=newT+'px';
	}
}