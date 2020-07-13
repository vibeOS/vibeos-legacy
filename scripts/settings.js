class cbutton {
	constructor(x, y, width, height, onPress){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		
		renderQ.push(()=>{
			mctx.fillStyle='blue';
			mctx.strokeStyle='blue';
			
			mctx.fillRect(this.x, this.y, this.width, this.height, 7);
		});
		
		this.cele = new cele(moLs.length+100, this.x, this.y, this.width, this.height, (type, e)=>{
			console.log(type);
		});
		
	}
}

var activePanel = 'demoA',
	initSettings=(()=>{
		var mainEle = {},
			winID = moLs.length,
			ib = {},
			window = new cwin(winID, 500 , 250, 'VibeOS', (ele)=>{
				// on render
				
				mainEle=ele;
				
				// side panel
				
				mctx.fillStyle='#212121';
				mctx.strokeStyle='#212121';
				
				mctx.roundRect(ele.xpos, ele.ypos + 30, ele.width/4, 240, 15);
				mctx.fillRect(ele.xpos, ele.ypos + 30, ele.width/4, 15)
				
				switch(activePanel){
					case'demoA':
						
						break
					case'providers':
						
						mctx.fillStyle='#000';
						mctx.font = "16px Arial";
						
						mctx.fillText(`Music:`, ele.xpos + 150 , ele.ypos + 75 );
						mctx.fillText(`Mail:`, ele.xpos + 150 , ele.ypos + 175 );
						
						
						break
				}
				
			}, (ele)=>{ // on closing
				
			}, msize.w/2, msize.h/2, 'img/categories/system.png');
	});
