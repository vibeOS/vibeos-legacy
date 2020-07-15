var initSettings = ()=>{
		var navButtons = {
				general: new button('General', 100, 50),
				accounts: new button('Accounts', 100, 50),
				proxy: new button('Proxy', 100, 50),
				about: new button('About', 100, 50),
			},
			
			activeTab = 'about',
			
			window = new cwindow('wallpaper-picker', 50, 50, (ele)=>{
				var remainingX = ele.x + 130,
					remainingWidth = ele.width - 130; // calculated remaining space from the sidebar
				
				switch(activeTab){
					case'general':
						// do rendering stuff for general tab
						
						break
					case'accounts':
						
						break
					case'proxy':
						
						
						break
					case'about': // the tab is on about stuff
						
						// main title

						mctx.fillStyle = '#000' // font color
						mctx.font = 'bolder 30px Open Sans' // font and size
						
						mctx.textAlign = 'center'; // use these for near perfect centering
						mctx.fillText('vibeOS', remainingX + remainingWidth / 2, ele.y + 75);
						mctx.textAlign = 'end';
						
						// description
						
						mctx.fillStyle = '#000'
						mctx.font = 'italic 13px Open Sans' // we need to make the font a bit smaller and have italics
						
						mctx.textAlign = 'center'; // use these for near perfect centering
						mctx.fillText('Basically a fucking OS in your web browser', remainingX + remainingWidth / 2, ele.y + 110);
						mctx.textAlign = 'end';
						
						// black line seperating text
						
						mctx.fillRect(remainingX + 15, ele.y + 125, remainingWidth - 25, 2);
						
						// footer
						
						mctx.fillStyle = '#000'
						mctx.font = '13px Open Sans'
						
						mctx.textAlign = 'center'; // use these for near perfect centering
						mctx.fillText('vibeOS™, in development', remainingX + remainingWidth / 2, ele.y + ele.height);
						mctx.textAlign = 'end';
						
						break
				}
				
				// do button rendering and sidebar last
				
				mctx.fillStyle='#212121';
				mctx.strokeStyle='#212121';
				
				mctx.roundRect(ele.x, ele.contentBox.y, 130, ele.height - 10, 15);
				
				mctx.fillRect(ele.x, ele.contentBox.y, 130 / 2, 15)
				
				Object.entries(navButtons).forEach((e,i)=>{
					if(e[1] == null)return;
					
					e[1].this().interactable.x = ele.x + 14
					
					e[1].this().interactable.y = ele.y + 45 + i * 65
			
					e[1].this().interactable.index = window.contentBox.index + 1 + i;
					
					e[1].this().render();
				});
				
			});
		
		Object.entries(navButtons).forEach((e,i)=>{
			if(e[1] == null)return;
			
			e[1].this().interactable.clickend = ()=>{
				if(e[1].this().interactable.hover != true)return;
				activeTab = e[0];
			}
		});
		
		window.width = 500
		window.height = 400
		
		window.icon = 'categories/24/package_settings.png'
		window.title = 'vibeOS settings'
	}