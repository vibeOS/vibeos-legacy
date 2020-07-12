var dockIndex=0,
	addDockIcon=((src, desc, callback)=>{
		dockIndex++;
		var icon = new Image(),
			element = new cele(moLs.length, 60 + dockIndex * 23, 3, 20, 20, (type, e)=>{
				var ele = moLs[e.eleID];
				
				if(type == 'mouseDownLeft'){ // run the callback when clicked
					callback();
				}
			});
		icon.src=src;
		
		icon.addEventListener('load', ()=>{
			highRenderQ.push(()=>{
				var ele = moLs[element.eleID];
				if(ele.hover){
					mctx.fillStyle='#34495E';
					mctx.fillRect(ele.xpos - 6, ele.ypos + 20, desc.length * 6, 20);
					
					mctx.fillStyle='#fff';
					mctx.font = "10px Roboto";
					mctx.fillText(desc, ele.xpos, ele.ypos + 34);
				}
				
				mctx.drawImage(icon, element.x, element.y, element.width, element.height);
				
			});
		});
	});