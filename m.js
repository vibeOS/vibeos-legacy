var mCanvas=document.getElementById('mCanvas'),
	mctx=mCanvas.getContext('2d'),
	msize={w:1280,h:720},
	cursorN='pointer',
	moLs=[],
	highRenderQ=[],
	renderQ=[],
	hovering=[],
	cursorP={x:0,y:0, grab: {x: 0, y:0} },
	contextData=[false,0,0],
	startOpen=false,
	desktopProps={bgValue: 'img/wallpaper.png'};

mCanvas.addEventListener('keyDown', e=>{
	this.focus();
});

mCanvas.contentEditable = true;

function wordWrap(str, maxWidth) {
	if(typeof str != 'string')return '';
    var newLineStr = "\n"; done = false; res = '';
    while (str.length > maxWidth) {                 
        found = false;
        // Inserts new line at first whitespace of the line
        for (i = maxWidth - 1; i >= 0; i--) {
            if (testWhite(str.charAt(i))) {
                res = res + [str.slice(0, i), newLineStr].join('');
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        // Inserts new line at maxWidth position, the word is too long to wrap
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }

    }

    return res + str;
}

function testWhite(x) {
    var white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
};

class cele {
	constructor(zindex, x, y, width, height, callback, cursor){
		this.zindex=zindex;
		this.width=width;
		this.height=height;
		this.x = x;
		this.y = y;
		this.eleID = moLs.length;
		if(typeof callback == 'undefined')this.callback=()=>{}
		else this.callback = callback;
		
		this.callbackee = (type, e)=>{
			var ele = moLs[this.eleID];
			
			if(cursor != null){
				if(ele.pressed){
					cursorN = cursor.pressed;
				}else if(ele.hover){
					cursorN = cursor.hover;
				}
			}else{
				if(ele.hover){
					cursorN = 'pointer';
				}
			}
		}
		
		
		moLs[moLs.length]={
			zindex: this.zindex,
			xpos: this.x,
			ypos: this.y,
			width: this.width,
			height: this.height,
			hover: false,
			pressed: false,
			id: this.eleID,
			callback: this.callback,
			callbackee: this.callbackee,
			destroy : ()=>{ // TODO: make more efficient with memory
				moLs[this.eleID] = null;
				moLs[this.eleID] = null;
			}
		}
		
	}
}

var images = {};

CanvasRenderingContext2D.prototype.drawImageURL = function(src, sx , sy, swidth, sheight, width, height){
	if(images[src] == null){
		// add a new image to the array with the url as a key
		images[src] = new Image();
		images[src].src = src;

		images[src].addEventListener('load', ()=>{
			this.drawImage(images[src], sx, sy, swidth, sheight);
		});

	} else {
		this.drawImage(images[src], sx, sy, swidth, sheight);
	}
	
	// image should exist here
}

CanvasRenderingContext2D.prototype.roundRect = function (x,y,width,height,radius) {
    radius = Math.min(Math.max(width-1,1),Math.max(height-1,1),radius);
    var rectX = x;
    var rectY = y;
    var rectWidth = width;
    var rectHeight = height;
    var cornerRadius = radius;

    this.lineJoin = "round";
    this.lineWidth = cornerRadius;
    this.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
    this.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
    this.stroke();
    this.fill();
}

CanvasRenderingContext2D.prototype.fillWrapText = function (text, x, y, maxWidth, lineHeight) {
	if(typeof text != 'string')return null;
	var words = text.split(' ');
	var line = '';
	
	for(var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var metrics = this.measureText(testLine);
		var testWidth = metrics.width;
		if(testWidth > maxWidth && n > 0) {
			this.fillText(line, x, y);
			line = words[n] + ' ';
			y += lineHeight;
		} else {
			line = testLine;
		}
	}
	this.fillText(line, x, y);
}

class cwin {
	constructor(zindex, width,height,title,onRender,onClose,posX,posY,src,bgColor){
		this.zindex=zindex;
		this.width=width;
		this.height=height;
		if(typeof title == 'undefined')this.title='Window'
		else this.title=title;
		
		if(typeof width == 'undefined')this.width=500
		else this.width=width;
		
		if(typeof height == 'undefined')this.height=500
		else this.height=height;
		
		if(typeof posX == 'undefined')this.posX = msize.w/2;
		else this.posX = posX
		
		if(typeof posY == 'undefined')this.posY = msize.h/2;
		else this.posY = posY
		
		if(typeof bgColor == 'undefined')this.bgColor = '#ccc'
		else this.bgColor = bgColor;
		
		
		this.windowIcon=false;
		this.eleID = moLs.length;
		this.closeEleID = moLs.length+1;
		this.contentsEleID=moLs.length+2
		
		var winBar = new cele(moLs.length, this.posX, this.posY, this.width, 30, (type,e)=>{
			var ele=moLs[this.eleID];
			if(typeof ele == 'undefined')return;
			if(!ele.pressed){ 
				moLs[this.eleID].ogxpos = ele.xpos
				moLs[this.eleID].ogypos = ele.ypos
			}
		}, {hover : 'pointer', pressed: 'move'} );
		
		var closeButton = new cele(moLs.length, this.posX, this.posY, 17, 17, (type, e)=>{
			if(type == 'mouseUpLeft'){
				if(typeof onClose != 'undefined')onClose(e);
				
				
				// temp non memory efficient solution but it wont interfere
				
				moLs[this.closeEleID].destroy();
				moLs[this.eleID].destroy();
				moLs[this.contentsEleID].destroy();
				
				return;
			}
		});
		
		this.contentsEle=new cele(this.contentsEleID, this.posX, this.posY + 30, this.width, this.height);
		
		renderQ[winBar.eleID]=(()=>{
			var ele=moLs[winBar.eleID];
			
			if(moLs[winBar.eleID] === null)return;
			
			if(ele.pressed){ // when this is pressed, ignore hover statement
				var grabX = ele.ogxpos + cursorP.x - cursorP.grab.x,
					grabY = ele.ogypos + cursorP.y - cursorP.grab.y;
				// cursorN='move';
				moLs[winBar.eleID].xpos = grabX;
				moLs[winBar.eleID].ypos = grabY;
				
				moLs[this.contentsEle.eleID].xpos = grabX;
				moLs[this.contentsEle.eleID].ypos = grabY + 30;
				
				
			} else if(ele.hover){
				// cursorN='link';
			}else{
				// cursorN='pointer';
			}
			
			// window contents
			
			mctx.shadowColor = '#000';
			mctx.shadowBlur = 7;
			mctx.fillStyle = '#000';
			
			mctx.roundRect(ele.xpos, ele.ypos, ele.width, this.height + 21, 15);

			mctx.shadowBlur = 0;
			
			mctx.fillStyle=this.bgColor;
			mctx.strokeStyle=this.bgColor;
			mctx.roundRect(ele.xpos, ele.ypos + 30 - 10, ele.width, this.height, 15);
			
			
			// top thingy
			
			mctx.fillStyle='#404040';
			mctx.strokeStyle='#404040';
			
			mctx.roundRect(ele.xpos, ele.ypos, ele.width, 30, 15);
			mctx.fillRect(ele.xpos, ele.ypos + 30/2, ele.width, 15);
			
			// icon
			
			if(this.windowIcon){
				mctx.drawImage(icon, ele.xpos + 6, windowBar.ypos + 6, 20, 20);
			}
			
			// title
			
			mctx.fillStyle='#fff';
			mctx.font = "18px Roboto";
			mctx.fillText(this.title, ele.xpos + 30 , ele.ypos +  22 );
			
			if(typeof onRender != 'undefined')onRender(ele);
		});
		
		if(typeof src != 'undefined' && src != null){ // window icon
			var ele=moLs[winBar.eleID],
				windowBar=moLs[winBar.eleID];
			
			var icon=new Image();
			icon.src=src;
			
			icon.addEventListener('load', ()=>{
				this.windowIcon=true; // icon is ready
			});
		}
			
		// close button
		
		renderQ[closeButton.eleID]=(()=>{
			var ele=moLs[closeButton.eleID],
				windowBar=moLs[winBar.eleID];
			
			if(typeof ele == 'undefined' || typeof windowBar == 'undefined' || windowBar == null)return;
			
			if(ele.pressed){
				mctx.fillStyle='#525252';
			}else if(ele.hover){
				mctx.fillStyle='#bdbdbd';
			}else{
				mctx.fillStyle='#8a8a8a';
			}
			// console.log(windowBar.height)
			moLs[closeButton.eleID].xpos = windowBar.xpos + windowBar.width - 30;
			moLs[closeButton.eleID].ypos = windowBar.ypos + 6;
			
			
			mctx.fillRect(ele.xpos,  ele.ypos, ele.width, ele.height);
			
		});
		
	}
}

mCanvas.width=msize.w;
mCanvas.height=msize.h;

mctx.fillStyle='#fff';
mctx.fillRect(0,0,msize.w,msize.h);


// mouse stuff


mCanvas.addEventListener('contextmenu', e=>{
	e.preventDefault();
	var found=null; // if this still null then this is on the desktop or something
	
	
	cursorP.grab.x = e.layerX;
	cursorP.grab.y = e.layerY;
	
	var moLsIndex=0;
	
	moLs.forEach((ee,ii)=>{
		if(ee==null)return;
		var xRangeMin=ee.xpos,
			xRangeMax=ee.xpos+ee.width,
			yRangeMin=ee.ypos,
			yRangeMax=ee.ypos+ee.height,
			inXRange=(e.layerX >= xRangeMin && e.layerX <= xRangeMax),
			inYRange=(e.layerY >= yRangeMin && e.layerY <= yRangeMax);
		
		
		// console.log(ee);
		
		if(inXRange && inYRange){
			if(e.button==2)type='mouseDownRight'
			else if(e.button==-0)type='mouseDownLeft';
			
			if(moLsIndex <= ee.zindex)moLsIndex = ii;
		}
			
		
	});
	
	if(moLsIndex != false){
		moLs[moLsIndex].pressed = true;
		moLs[moLsIndex].focused = true;
		moLs[moLsIndex].callback('mouseDownRight',e); // callback is called when cursor is inside range of element and we are clicking
		found=moLs[moLsIndex];
		moLs.forEach((e,i)=>{
			if(e==null)return;
			if(i != moLsIndex){
				e.pressed = false;
				e.focused = false;
			}
		});
	}
	
	// console.log(e);
	
	if(found == null){
		// this on the desktop or a window that isnt registered 
		contextData=[true, e.layerX, e.layerY];
	}
	
});

mCanvas.addEventListener('mousemove', e=>{
	cursorP.x = e.layerX;
	cursorP.y = e.layerY;
	
	var moLsIndex=0;
	
	moLs.forEach((ee,ii)=>{
		if(ee==null)return;
		var xRangeMin=ee.xpos,
			xRangeMax=ee.xpos+ee.width,
			yRangeMin=ee.ypos,
			yRangeMax=ee.ypos+ee.height,
			inXRange=(e.layerX >= xRangeMin && e.layerX <= xRangeMax),
			inYRange=(e.layerY >= yRangeMin && e.layerY <= yRangeMax);
		
		
		// console.log(ee);
		
		if(inXRange && inYRange){
			if(typeof ee.callback != 'undefined'){
				ee.callback('mouseHover',e); // callback is called when cursor is inside range of element
				ee.callbackee('mouseHover',e); // callback is called when cursor is inside range of element
			}
			if(moLsIndex <= ee.zindex)moLsIndex = ii;
		}else{
			if(typeof ee.callback != 'undefined')ee.callback('mouseLeft', e);
			
			ee.hover = false;
		}
			
		
	});
	
	if(moLsIndex != false){
		moLs[moLsIndex].hover = true;
		moLs.forEach((e,i)=>{
			if(e==null)return;
			if(i != moLsIndex)e.hover = false;
		});
	}
});

mCanvas.addEventListener('mousedown', e=>{
	// console.log(e);
	
	var found=null,
		type=null,
		moLsIndex=0;
	
	contextData=[false,0,0];
	
	// user is grabbing a thing so set it first
	cursorP.grab.x = e.layerX;
	cursorP.grab.y = e.layerY;
	
	moLs.forEach((ee,ii)=>{
		
		if(ee==null)return;
		var xRangeMin=ee.xpos,
			xRangeMax=ee.xpos+ee.width,
			yRangeMin=ee.ypos,
			yRangeMax=ee.ypos+ee.height,
			inXRange=(e.layerX >= xRangeMin && e.layerX <= xRangeMax),
			inYRange=(e.layerY >= yRangeMin && e.layerY <= yRangeMax);
		
		
		// console.log(ee);
		
		if(inXRange && inYRange){
			if(e.button==2)type='mouseDownRight'
			else if(e.button==-0)type='mouseDownLeft';
			
			if(moLsIndex <= ee.zindex)moLsIndex = ii;
		}
		
		
	});
	
	if(moLsIndex != false){
		found = 'pog!';
		moLs.forEach((e,i)=>{
			if(e == null)return;
			e.pressed = false;
			e.focused = false;
		});
		moLs[moLsIndex].pressed = true;
		moLs[moLsIndex].focused = true;
		moLs[moLsIndex].callback(type,e); // callback is called when cursor is inside range of element and we are clicking
		moLs[moLsIndex].callbackee(type,e);
	}
	
	if(found == null){
		startOpen=false;
	}
});

mCanvas.addEventListener('mouseup', e=>{
	var found=null,
		type=null,
		moLsIndex=0;
		
	cursorP.grab.x = e.layerX;
	cursorP.grab.y = e.layerY;
	
	moLs.forEach((ee,ii)=>{
		if(ee==null)return;
		
		var xRangeMin=ee.xpos,
			xRangeMax=ee.xpos+ee.width,
			yRangeMin=ee.ypos,
			yRangeMax=ee.ypos+ee.height,
			inXRange=(e.layerX >= xRangeMin && e.layerX <= xRangeMax),
			inYRange=(e.layerY >= yRangeMin && e.layerY <= yRangeMax),
			type='mouseUp';
		
		
		ee.pressed = false;
		
		if(inXRange && inYRange){ // only check if stuff is inside if there is callback 
			if(moLsIndex <= ee.zindex)moLsIndex = ii;
		}
	});
	
	if(moLsIndex != false){
		found = 'pog!';
		
		moLs.forEach((ee,i)=>{
			if(i != moLsIndex || ee == null)return;
			ee.callback('mouseHover',e); // callback is called when cursor is inside range of element and we are clicking
			ee.callbackee('mouseHover',e); // callback is called when cursor is inside range of element and we are clicking
			ee.callback('mouseUpLeft',e);
		});
	}
	
	if(found == null){
		startOpen=false;
	}
});

var bgImage = new Image();

setInterval(()=>{
	if(desktopProps.bgValue.match(/^(?:[a-z]*?|#\d{3,})$/g) ){ // is color
		mctx.fillStyle=desktopProps.bgValue;
		mctx.fillRect(0,0,msize.w,msize.h);
	}else if(desktopProps.bgValue.match(/^(?!#)[\D]*?$/g) ){ // is image
		mctx.drawImageURL(desktopProps.bgValue, 0, 0, msize.w, msize.h);
	}
	mCanvas.style.cursor = 'url("./cursor/'+cursorN+'.cur"), none';

	renderQ.forEach((e,i)=>{
		e(); // run all render operations in order
	});
	
	// do high renderq thing last
	
	highRenderQ.forEach((e,i)=>{
		e();
	});
},1000/60);