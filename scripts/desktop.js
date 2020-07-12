var initWallpaperPicker=(()=>{
		var window=new cwin(moLs.length, 500, 300, 'Wallpaper', (type, ele)=>{ // cursor events
				
			}, (ele)=>{ // on closing
				
			}, 100, 200, 'img/desktop.png');
	}),
	buttons=[
		{
			text: 'Change Wallpaper',
			src: './img/desktop.png',
			callback: ((ele)=>{
				initWallpaperPicker();
			}),
		},
		{
			text: 'Bruh moment!',
			src: null,
			callback: ((ele)=>{
				var audio = new Audio('bruh.mp3');
				audio.play();
			}),
		}
	];

buttons.forEach((e,i)=>{
	var id=moLs.length;
	e.ele = new cele(id, contextData[1] , contextData[2], 145, 25, (type,e)=>{
		var ele=moLs[id];
		
		if(type == 'mouseDownLeft'){
			buttons[i].callback(ele);
		}
	});
});

highRenderQ.push(()=>{
	if(contextData[0] != true){
		// move far off screen
		buttons.forEach((e,i)=>{
			var ele=moLs[e.ele.eleID];
			moLs[e.ele.eleID].xpos = msize.w*2;
			moLs[e.ele.eleID].ypos = msize.h*2;
		});
		return;
	}
	
	mctx.fillStyle='#A0A0A0';
	mctx.fillRect(contextData[1]-1, contextData[2]-1, 147, buttons.length * 25 + 2);
	
	mctx.fillStyle='#fff';
	mctx.fillRect(contextData[1] , contextData[2], 150, buttons.length * 25);
	
	buttons.forEach((e,i)=>{
		var ele=moLs[e.ele.eleID];
	
		if(ele.hover){
			mctx.fillStyle='#EEEEEE';
			mctx.fillRect(contextData[1] , contextData[2] + i * 25 + 3, 150, ele.height - 6);
		}
		
		moLs[e.ele.eleID].xpos = contextData[1] + 5;
		moLs[e.ele.eleID].ypos = contextData[2] + i * 25;
		
		mctx.fillStyle='#000';
		mctx.font = "13px Roboto";
		
		if(e.src != null){
			var icon=new Image();
			icon.src=e.src;
			
			mctx.drawImage(icon, ele.xpos, ele.ypos + 5, 18, 18);
		}
		
		mctx.fillText(e.text, ele.xpos + 26, ele.ypos + 17);
	});
});