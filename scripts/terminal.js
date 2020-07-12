var initTerminal=(()=>{
	var lines = [],
		termEle = {},
		termStr='',
		prevTermStr='',
		blinkStr='',
		inputBar,
		stopped=false,
		blinkInterval=()=>{
			var ele=moLs[inputBar.eleID];
			
			if(typeof ele == 'undefined')return;
			
			if(ele.focused){
				if(blinkStr=='')blinkStr='|'
				else blinkStr='';
			}else{
				blinking=false;
			}
		}
		
	var window=new cwin(moLs.length+1, 500 , 400, 'Terminal', (ele)=>{ // info panel
		termEle = ele;
	}, (ele)=>{
		renderQ.splice(inputBar.eleID, 1);
		
		stopped=true;
		clearInterval(blinkInterval);
	}, msize.w/15, msize.h/6, 'img/apps/utilities-terminal.png', '#000');

	// define input bar after main window class

	inputBar=new cele(moLs.length, 0, 0, 470, 24);
	
	setInterval(blinkInterval,1000);
	
	mCanvas.addEventListener('paste', e=>{
		var paste = (event.clipboardData || window.clipboardData).getData('text');
		termStr=termStr+paste;
	});
	
	mCanvas.addEventListener('keydown', e=>{
		var ele=moLs[inputBar.eleID];
		
		if(ele.focused){
			console.log(e);
			switch(e.keyCode){
				case 8: // backspace
					termStr=termStr.substr(0,termStr.length-1);
					break
				case 38: // up arrow
					termStr=prevTermStr;
					break
				case 16: case 20:case 36:case 144:case 93:case 17:case 27:case 9:case 91:case 18:case 46:case 35:case 34:case 45:case 33:case 40:case 39:case 37:
					break
				case 13: // enter key
					lines.push('> '+termStr);
					var output='';
					try {
						output=eval(termStr);
					}catch(err){
						output=err.toString();
					}
					
					prevTermStr=termStr;
					termStr='';
					
					lines.push(output);
					
					break
				default:
					termStr=termStr+e.key;
					break
			}
		}
	});
	
	renderQ[inputBar.eleID]=(()=>{
		mctx.fillStyle='#fff';
		mctx.font = "16px Source Code Pro";
		
		var writeLine=0,
			linesa = [];
		
		lines.forEach((e,i)=>{
			writeLine++;
			wordWrap(e, termEle.width/10).split('\n').forEach((ee,ii)=>{
				writeLine++;
				linesa.push(ee);
				if(linesa.length > 10)linesa.shift();
			});
		});
		
		linesa.forEach((e,i)=>{
			mctx.fillText(e, termEle.xpos + 10 , termEle.ypos+50 + i*20);
		});
		
		var ele=moLs[inputBar.eleID],
			winBar=moLs[window.eleID];
		
		if(typeof ele == 'undefined' || stopped)return renderQ[inputBar.eleId]=()=>{};
		
		
		
		if(ele.focused){
			mctx.fillStyle='#fff';
		}else if(ele.hover){
			mctx.fillStyle='#bdbdbd';
		}else{
			mctx.fillStyle='#8a8a8a';
		}
		
		moLs[inputBar.eleID].xpos = termEle.xpos+15;
		moLs[inputBar.eleID].ypos = termEle.ypos + window.height - 20;
		
		mctx.fillRect(ele.xpos, ele.ypos, ele.width, ele.height);
		
		mctx.fillStyle='#000';
		mctx.fillRect(ele.xpos+2, ele.ypos+2, ele.width-4, ele.height-4);
		
		mctx.fillStyle='#ccc';
		mctx.font = "14px Arial";
		
		
		if(termStr.length <= 0){
			mctx.fillStyle='#8c8c8c';
			mctx.fillText('> '+blinkStr, ele.xpos + 10 , ele.ypos +  ele.height/2 + 5 );
		}else{
			mctx.fillText('> '+termStr+blinkStr, ele.xpos + 10 , ele.ypos +  ele.height/2 + 5 );
		}
		
	});

	lines.push(Date.now()+' : Javascript terminal initated');
	lines.push(Date.now()+' : This is a reaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaly long string!');
});

addDockIcon('img/apps/utilities-terminal.png', 'Terminal app', initTerminal);