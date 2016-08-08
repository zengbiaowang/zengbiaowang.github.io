'use strict'
function DOMReady(fn){
		if(document.addEventListener){
			document.addEventListener('DOMContentLoaded',function (){
				fn&&fn();
			},false);
		}else{
			document.attachEvent('onreadystatechange',function (){
				if(document.readyState=='complete'){
					fn&&fn();
				}
			});
		}
}
DOMReady(function(){
	var oLeftDoor=document.getElementById('left_door');
	var oRightDoor=document.getElementById('right_door');
	var w=document.documentElement.clientWidth;
	//首屏开门运动
	move(oLeftDoor,{left:0,width:0},{duration:3000});
	move(oRightDoor,{right:0,width:0},{duration:3000});
	var oHeadNav=document.getElementById('head_nav');
	var aHeadLi=oHeadNav.children;
	var oContent=document.getElementById('content');
	var aBox=oContent.children;
	var oCircle=document.getElementById('circle');
	var oSpan=oCircle.children[1];
	var aP=oCircle.getElementsByTagName('p');
	var oThrough=document.getElementById('through');
	var aLiThrough=oThrough.children;
	var aContact_p=aBox[3].getElementsByTagName('p');
	var iNow=0;
	var bOK=true;
	var h=document.documentElement.clientHeight;
	for(var i=0; i<aBox.length; i++){
		aBox[i].style.height=h+'px';
	}
	function index3(index){
		if(iNow==3){
			for(var i=0; i<aContact_p.length; i++){
				aContact_p[i].style.left=0;
				aContact_p[i].style.opacity=0;
				aContact_p[i].style.filter='alpha(opacity=0)';
			}
			startMove(aContact_p[0],{left:0.4*w,opacity:1},{duration:1500,complete:function(){
				startMove(aContact_p[1],{left:0.4*w,opacity:1},{duration:1500,complete:function(){
					startMove(aContact_p[2],{left:0.4*w,opacity:1},{duration:1500});
				}});
			}});
		}
	}
	//导航点击运动
	for(var i=0; i<aHeadLi.length; i++){
		aHeadLi[i].index=i;
		aHeadLi[i].onclick=function(){
			iNow=this.index;
			move(oContent,{top:-this.index*aBox[0].offsetHeight});
			index3();
		};
		aP[i].index=i;
		aP[i].onclick=function(){
			iNow=this.index;
			move(oContent,{top:-this.index*aBox[0].offsetHeight});
			index3();
		};
	}
	//滚轮滚动运动
	addWheel(oContent,function(bDown){
		if(bDown==true){
			iNow++;
			if(iNow>aBox.length-1){
				iNow=aBox.length-1;
			}
			move(oContent,{top:-iNow*aBox[0].offsetHeight});
			index3();
		}else{
			iNow--;
			if(iNow<0){
				iNow=0;
			}
			move(oContent,{top:-iNow*aBox[0].offsetHeight});
			index3();
		}
	})
	//呼吸按钮
	function next(){
		startMove(oSpan,{opacity:0},{complete:function(){
			startMove(oSpan,{opacity:1},{complete:function(){
				next();
			}})
		}});
	}
	next();
	//点击绕圆运动
	oSpan.onclick=function(){
		var R=oCircle.offsetWidth/2;
		if(bOK){
			Cmove(aP[1],R,90,1000);
			Cmove(aP[2],R,180,2000);
			Cmove(aP[3],R,270,3000);
		}else{
			Cmove(aP[3],R,180,1000,function(){
				Cmove(aP[3],R,90,1000);
				Cmove(aP[2],R,90,1000,function(){
					Cmove(aP[1],R,0,1000);
					Cmove(aP[2],R,0,1000);
					Cmove(aP[3],R,0,1000);
				});
			});
		}
		bOK=!bOK;
	};
	//穿墙
	for(var i=0; i<aLiThrough.length; i++){
		aLiThrough[i].style.width=w*0.64*0.2+'px';
		aLiThrough[i].style.height=w*0.64*0.2+'px';
		aLiThrough[i].children[0].style.lineHeight=w*0.64*0.2+'px';
		/*aLiThrough[i].children[0].style.width=w*0.64*0.2+'px';
		 aLiThrough[i].children[0].style.height=w*0.64*0.2+'px';*/
		through(aLiThrough[i]);
		aLiThrough[i].addEventListener('mouseover',function(){
			var aChild=this.children;
			aChild[1].style.height='100%';
			aChild[2].style.width='100%';
			aChild[3].style.height='100%';
			aChild[4].style.width='100%';
		},false);
		aLiThrough[i].addEventListener('mouseout',function(){
			var aChild=this.children;
			aChild[1].style.height='0';
			aChild[2].style.width='0';
			aChild[3].style.height='0';
			aChild[4].style.width='0';
		},false);
		;(function(){
			var oPen=document.getElementById("pen");
			var oBtn=document.getElementById("btnpen");
			var oBox=document.getElementById("bigbox1");
			pos[0]={l:oPen.offsetLeft,t:oPen.offsetTop};
			var timer=null;
			oBtn.onclick=function(){
				if(pos.length==1){
					return false;
				}else{
					clearInterval(timer);
					timer=setInterval(function(){
						var last=pos.pop();
						oPen.style.left=last.l+"px";
						oPen.style.top=last.t+"px";
						if(pos.length==1){
							clearInterval(timer);
							oPen.style.left=oPen.offsetLeft+'px';
							oPen.style.top=oPen.offsetTop+'px';
							var aem=oBox.getElementsByTagName('em');
							while(aem.length>0){
								oBox.removeChild(aem[0]);
							}
						}
					},30);
				}
			}
			write(oPen,oBox);
		})();
	}
});