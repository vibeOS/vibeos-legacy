var initWallpaperPicker=(()=>{
		var window=new cwin(moLs.length, 500, 300, 'Wallpaper', (type, ele)=>{ // cursor events
				
			}, (ele)=>{ // on closing
				
			}, 100, 200, 'img/extras/colors-emblem-desktop-alt.png');
	}),
	buttons=[
		{
			text: 'Change Wallpaper',
			src: 'img/extras/colors-emblem-desktop-alt.png',
			callback: ((ele)=>{
				initWallpaperPicker();
			}),
		},
		{
			text: 'Bruh moment!',
			src: 'img/extras/text-close-without-saving.png',
			callback: ((ele)=>{
				var audio = new Audio('bruh.mp3');
				audio.play();
			}),
		}
	];

buttons.forEach((e,i)=>{
	var id=moLs.length+2;
	e.ele = new cele(id, contextData[1] , contextData[2], 145, 25, (type,e)=>{
		var ele=moLs[id];
		
		if(type == 'mouseDownLeft'){
			buttons[i].callback(ele);
		}
	},
	null, // cursors not needed to be cool looking here
	id // force id to fix bug
	);
});

highRenderQ.push(()=>{
	if(contextData[0] != true){
		// move far off screen
		buttons.forEach((e,i)=>{
			var ele=moLs[e.ele.eleID];
			ele.xpos = msize.w*2;
			ele.ypos = msize.h*2;
		});
		return;
	}
	
	mctx.fillStyle='#A0A0A0';
	mctx.fillRect(contextData[1]-1, contextData[2]-1, 147, buttons.length * 25 + 2);
	
	mctx.fillStyle='#fff';
	mctx.fillRect(contextData[1] , contextData[2], 145, buttons.length * 25);
	
	buttons.forEach((e,i)=>{
		var ele=moLs[e.ele.eleID];
		
		ele.xpos = contextData[1];
		ele.ypos = contextData[2] + i * 25;
		
		if(ele.hover){
			mctx.fillStyle='#ddd';
		}else{
			mctx.fillStyle='#fff';
		}
		
		console.log(ele, e.text);;
		
		mctx.fillRect(contextData[1] , contextData[2] + 2 + i * 25 , ele.width, ele.height - 3);
		
		mctx.fillStyle='#000';
		mctx.font = "13px Roboto";
		
		mctx.drawImageURL(e.src, ele.xpos + 4, ele.ypos + 4, 18, 18);
		
		mctx.fillText(e.text, ele.xpos + 26, ele.ypos + 17);
	});
});