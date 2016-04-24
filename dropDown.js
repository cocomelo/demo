function Dropdown(){	
	this.init.apply(this, arguments);	
}
Dropdown.prototype={	
	init : function(container, sLiCls, sParentCls, sDropCls, duration){		
		this.container=this.$(container);		
		this.timer=null;		
		this.iNow=0;		
		var that=this;		
		this.aLi=getByClass(this.container, sLiCls);		
		this.aParent=getByClass(this.container, sParentCls);		
		this.aDropdown=getByClass(this.container, sDropCls);		
		for(var i=0;i<this.aLi.length;i++){
			if(hasClass(that.aLi[i], sParentCls)){		  
				for(var j=0;j<this.aParent.length;j++){					
					this.aParent[j].index=j;					
					this.aParent[j].onmouseover=function(){						
						that.iNow=this.index;						
						that.fnReset();						
						that.aDropdown[that.iNow].style.display="block";
						startMove(that.aDropdown[that.iNow], {top:70});
					}					
					this.aParent[j].onmouseout=function(){that.timer=setTimeout(function(){that.fnNone()}, duration)};
				}				
			}else{
				this.aLi[i].onmouseover=function(){that.fnReset()};
			}
		}		
	},		
	fnNone : function(){			
		this.aDropdown[this.iNow].style.display="none";
		startMove(this.aDropdown[this.iNow], {top:0});
	},	
	fnReset : function(){			
		clearTimeout(this.timer);
		for(var j=0;j<this.aParent.length;j++){	  
			this.aDropdown[j].style.display="none";
			startMove(this.aDropdown[j], {top:0});
		}
	},	
	$ : function(id){		
		return document.getElementById(id);		
	},
};
function getByClass (obj, sCls){		   
	var aEle=obj.getElementsByTagName("*"),	
	aResult=[],	reg=new RegExp("\\b"+sCls+"\\b","i");	
	for(var i=0;i<aEle.length;i++){		
		if(reg.test(aEle[i].className))aResult.push(aEle[i]);
	}
	return aResult;
}	
function hasClass(ele,cls) {
	return ele.className.match(new RegExp("\\b"+cls+"\\b"));
}
function getStyle(obj, attr){	
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,null)[attr];
}
function startMove(obj, json){	
	var timer=null;
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;
		for(var attr in json){			
			var iCur=0;			
			iCur=parseInt(getStyle(obj, attr));			
			var iSpeed=(json[attr]-iCur)/4;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);			
			if(iCur!=json[attr]){				
				bStop=false;
			}			
			obj.style[attr]=iCur+iSpeed+'px';
		}			
		if(bStop){			
			clearInterval(obj.timer);
		}
	}, 30)
}
