'use strict'
var pos=[];
function write(obj,oBox){
    obj.onmousedown=function(ev){
        var ev=ev||event;
        var disX=ev.clientX-obj.offsetLeft;
        var disY=ev.clientY-obj.offsetTop;
        pos[0]={l:obj.offsetLeft,t:obj.offsetTop};
        document.onmousemove=function(ev){
            var ev=ev||event;
            var x=ev.clientX-disX;
            var y=ev.clientY-disY;
            obj.style.left=x+"px";
            obj.style.top=y+"px";
            //不断的存坐标
            pos.push({l:x,t:y});
            //模拟轨迹 只为演示
            var oEm=document.createElement("em");
            oEm.className="em";
            oEm.style.left=x+"px";
            oEm.style.top=y+"px";
            oBox.appendChild(oEm);


        }
        document.onmouseup=function(){
            document.onmouseup=null;
            document.onmousemove=null;
            obj.releaseCapture&&obj.releaseCapture();
        }
        obj.setCapture&&obj.setCapture();
        return false;
    }
}
