var startEntries=[
		{
			name: 'Graphics',
			type: 'folder',
			contents: [
			
			],
		},
		{
			name: 'Applications',
			type: 'folder',
			contents: [
				{
					name: 'Terminal',
					type: 'shortcut',
					icon: 'img/terminal.png',
					func: initTerminal,
				},
				{
					name: 'Linux VM',
					type: 'shortcut',
					icon: 'img/virtual-shell.png',
					func: initLinuxVM,
				},
				{
					name: 'System Info',
					type: 'shortcut',
					icon: 'img/info.png',
					func: initStats,
				},
			],
		},
		{
			name: 'Internet',
			type: 'folder',
			contents: [
				{
					name: 'VibeBrowser',
					type: 'shortcut',
					icon: 'img/web.png',
					func: initBrowser,
				},
			],
		},
	],
	initDock=(()=>{
		var startButton=new cele(102312312200, 0, 0, 75, 25, (type, e, cum)=>{
				//console.log(type);
				if(type == 'mouseDownLeft'){
					startOpen=!startOpen
					startEntries.forEach((folder,index)=>{
						folder.open = false;
					});
				}
			}),
			dateStr='',
			timeStr='';
		
		setInterval(()=>{
			timeStr=new Date().toLocaleString(undefined,{localeMatcher:'lookup',hour: 'numeric',minute: 'numeric'});
			dateStr=new Intl.DateTimeFormat('en-US',{day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date());
		}, 100);
		// draw element
		
		startEntries.forEach((folder, index)=>{
			folder.open=false;
			var ele=moLs[startButton.eleID];
			folder.cele = new cele(100, ele.xpos, ele.ypos + 25 + index*25, 150, 25, (type, e)=>{
				if(type == 'mouseDownLeft'){
					startEntries.forEach((afolder, aindex)=>{
						afolder.open = false;
					});
					
					folder.open = !folder.open
				}
			});
			folder.contents.forEach((item, itemindex)=>{
				item.image = new Image();
				item.image.src= item.icon;
				item.cele = new cele(100, ele.xpos+150, ele.ypos + 25 + index*25 + itemindex*25, 0, 30, (type, e)=>{
					if(type == 'mouseDownLeft' && folder.open == true){
						item.func();
						startOpen = false;
					}
				});
				var itemEle=moLs[item.cele.eleID];
			});
		});
		
		var folderIcon=new Image();
		folderIcon.src='img/folder.png';
		
		highRenderQ.push(()=>{
			var ele=moLs[startButton.eleID];
			
			mctx.fillStyle='#2b2b2b';
			mctx.fillRect(0, 0, msize.w, 25); // top panel before text
			
			mctx.fillStyle='#fff';
			mctx.font = "13px Roboto";
			
			mctx.fillText(dateStr, msize.w - 90, 16);
			mctx.fillText(timeStr, msize.w - 170, 16);
			
			if(ele.pressed){
				mctx.fillStyle='#25568f';
			}else if(ele.hover){
				mctx.fillStyle='#4297fb';
			}else{
				mctx.fillStyle='#1a385b';
			}
			
			mctx.fillRect(ele.xpos, ele.ypos, ele.width, ele.height);
			
			mctx.fillStyle='#fff';
			mctx.font = "20px Arial";
			mctx.fillText('start', ele.xpos + ele.width/5 , ele.ypos +  ele.height/2 + 7 );
			
			if(startOpen){
				mctx.fillStyle='#ccc';
				mctx.fillRect(ele.xpos, ele.ypos + 25, 150, 200);
				
				startEntries.forEach((folder, index)=>{
					var folderEle=moLs[folder.cele.eleID];
					if(folderEle.hover){
						mctx.fillStyle='#828282';
						mctx.fillRect(ele.xpos, ele.ypos + 25 + index*25, folderEle.width, folderEle.height );
					}
					mctx.fillStyle='#000';
					mctx.font = '16px Arial';
					mctx.fillText(folder.name, ele.xpos + 27, ele.ypos + 45 + index*25 );
					
					mctx.drawImage(folderIcon, ele.xpos+5, ele.ypos + 30 + index*25, 18, 18);
					
					if(folder.open){ // folder has been clicked on
						moLs[folder.cele.eleID].width = 150;
						folder.contents.forEach((item, itemindex)=>{
							moLs[item.cele.eleID].width = 175;
							
							var itemEle=moLs[item.cele.eleID];
							if(itemEle.hover)mctx.fillStyle='#828282'
							else mctx.fillStyle='#ccc';
							
							mctx.fillRect(ele.xpos+150, ele.ypos + 25 + index*25 + itemindex*25, 175, 30);
							
							mctx.fillStyle='#000';
							mctx.font = '16px Arial';
							mctx.fillText(item.name, ele.xpos + 177, ele.ypos + 45 + index*25 + itemindex*25 );
							mctx.drawImage(item.image, ele.xpos+155, ele.ypos + 30 + index*25 + itemindex*25, 18, 18);
						});
					}else{
						folder.contents.forEach((item, itemindex)=>{
							moLs[item.cele.eleID].width = 0;
						});
					}
				});
			}
		});
	});

initDock();
initDock();