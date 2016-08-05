function d2a(n){	//角度转弧度
	//n是走的多少弧度
	return n*Math.PI/180; 		
}
function a2d(n){ 	//弧度转角度
	return n*180/Math.PI;
}
function Cmove(obj,R,iTarget,duration,fn){
	var start=obj.left||0;
	var dis=iTarget-start;
	var count=Math.floor(duration/30);
	
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		var cur=start+dis/count*n;
		
		var x=R+Math.sin(d2a(cur))*R;
		var y=R-Math.cos(d2a(cur))*R;
		
		obj.style.left=x+'px';
		obj.style.top=y+'px';
		
		if(n==count){
			clearInterval(obj.timer);
			obj.left=cur;
			fn&&fn();
		}
	},30);
}