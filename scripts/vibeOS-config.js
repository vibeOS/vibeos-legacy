var initSettings = ()=>{
		var navButtons = {
				general: new button('General', 100, 50),
				accounts: new button('Accounts', 100, 50),
				proxy: new button('Proxy', 100, 50),
				sysinfo: new button('System Info', 100, 50),
				about: new button('About', 100, 50),
			},
			screenResButtons = {
				'1280x720': new button('720p', 100, 50),
				'1920x1080': new button('1080p', 100, 50),
			}
			
			activeTab = 'general',
			
			window = new cwindow('wallpaper-picker', 50, 50, (ele)=>{
				var remainingX = ele.x + 130,
					remainingWidth = ele.width - 130; // calculated remaining space from the sidebar
				
				switch(activeTab){
					case'general':
						// do rendering stuff for general tab
						mctx.fillStyle = '#000' // font color
						mctx.font = 'bolder 30px Open Sans' // font and size
						
						mctx.textAlign = 'center'; // use these for near perfect centering
						mctx.fillText('General Placeholder', remainingX + remainingWidth / 2, ele.y + 75);
						mctx.textAlign = 'start';
						
						mctx.textAlign = 'start';
						mctx.font = '16px Open Sans';
						mctx.fillText('Screen resolution:', remainingX + 16, ele.y + 150);
						
						// todo: dropdown menu and radio buttons
						
						Object.entries(screenResButtons).forEach((e,i)=>{
							if(e[1] == null)return;
							
							e[1].this().interactable.x = remainingX + 16 + i * 120
							
							e[1].this().interactable.y = ele.y + 175
					
							e[1].this().interactable.index = ele.contentBox.index + 1 + i;
							
							e[1].this().render();
						});
						
						break
					case'accounts':
						mctx.fillStyle = '#000' // font color
						mctx.font = 'bolder 30px Open Sans' // font and size
						
						mctx.textAlign = 'center'; // use these for near perfect centering
						mctx.fillText('Accoutns Placeholder', remainingX + remainingWidth / 2, ele.y + 75);
						mctx.textAlign = 'start';
						break
					case'proxy':
						mctx.fillStyle = '#000' // font color
						mctx.font = 'bolder 30px Open Sans' // font and size
						
						mctx.textAlign = 'center'; // use these for near perfect centering
						mctx.fillText('Proxy Placeholder', remainingX + remainingWidth / 2, ele.y + 75);
						mctx.textAlign = 'start';
						
						break
					case 'sysinfo':
						mctx.fillStyle = '#000'
						mctx.font = '15px Open Sans'

						var progvalues = {
								name: 'vibeOS',
								version: '1.0',
								extra: 'Development Version'
							},
						lines = [],
						blines = [], // temp variable
						lineHeight = 16,
						textSize = 15;

						lines.push(`Version: ${progvalues.version} ${progvalues.extra}`); // version line 1
						lines.push(`Platform: ${navigator.platform}`); // platform line 2
						lines.push(`Screen Resolution: ${screen.width}x${screen.height}`); // screen res line 3
						lines.push(`Window Resolution: ${screen.availWidth}x${screen.availHeight}`); // window res line 4
						lines.push(`Enviornment Resolution: ${msize.w}x${msize.h}`); // enviornment res line 5
						lines.push(`IP Address: ${ip}`); // ip address line 6
						lines.push(`URL: ${unescape(location.href)}`); // url line 7
						lines.push(`User Agent: ${navigator.userAgent}`); // useragent line 8
						
						lines.forEach((e,i)=>{
							wordWrap(e, remainingWidth / 7.6).split('\n').forEach((ee,ii)=>{
								blines.push(ee);
							});
						});
						
						blines.forEach((e,i)=>{
							// if(clines.length >= window.height / textSize - 4 + (textSize - lineHeight) )clines.shift();
							mctx.fillStyle='#000';
							mctx.font = textSize+'px Open Sans';
							mctx.fillText(e, remainingX + 15 , window.y + 50 + i*1.5*lineHeight);
						});
						
						break
					case'about': // the tab is on about stuff
						
						// main title

						mctx.fillStyle = '#000' // font color
						mctx.font = 'bolder 30px Open Sans' // font and size
						
						mctx.textAlign = 'center'; // use these for near perfect centering
						mctx.fillText('vibeOS', remainingX + remainingWidth / 2, ele.y + 75);
						mctx.textAlign = 'start';
						
						// description
						
						mctx.fillStyle = '#000'
						mctx.font = 'italic 13px Open Sans' // we need to make the font a bit smaller and have italics
						
						mctx.textAlign = 'center'; // use these for near perfect centering
						mctx.fillText('Basically a fucking OS in your web browser', remainingX + remainingWidth / 2, ele.y + 110);
						mctx.textAlign = 'start';
						
						// black line seperating text
						
						mctx.fillRect(remainingX + 15, ele.y + 125, remainingWidth - 25, 2);
						
						mctx.fillStyle = '#000'
						mctx.font = '15px Open Sans'

						mctx.textAlign = 'center'; // use these for near perfect centering
						mctx.fillText('Creator & Lead Developer', remainingX + remainingWidth / 2, ele.y + 150);
						mctx.font = 'bold 15px Open Sans';
						mctx.fillText('Divide | Github: vibedivde', remainingX + remainingWidth / 2, ele.y + 170);
						mctx.font = '15px Open Sans';
						mctx.fillText('Assistant Developer & Design', remainingX + remainingWidth / 2, ele.y + 200);
						mctx.font = 'bold 15px Open Sans';
						mctx.fillText('Nathan Mendenhall | ctaetcsh.xyz', remainingX + remainingWidth / 2, ele.y + 220);
						mctx.font = '15px Open Sans';
						mctx.fillText('Future Spot', remainingX + remainingWidth / 2, ele.y + 250);
						mctx.font = 'bold 15px Open Sans';
						mctx.fillText('Future Developer', remainingX + remainingWidth / 2, ele.y + 270);
						mctx.textAlign = 'start';

						mctx.font = '15px Open Sans';
						mctx.fillRect(remainingX + 15, ele.y + 285, remainingWidth - 25, 2);

						mctx.textAlign = 'center'; // use these for near perfect centering
						mctx.font = 'bold 15px Open Sans';
						mctx.fillText('vibeOS was created with help from:', remainingX + remainingWidth / 2, ele.y + 310);
						mctx.font = '15px Open Sans';
						mctx.fillText('TitaniumNetwork', remainingX + remainingWidth / 2, ele.y + 330);
						mctx.fillText('IStealYourMemes', remainingX + remainingWidth / 2, ele.y + 350);
						mctx.textAlign = 'start';

						// footer
						
						mctx.fillStyle = '#000'
						mctx.font = '13px Open Sans'
						
						mctx.textAlign = 'center'; // use these for near perfect centering
						mctx.fillText('vibeOS is In Development', remainingX + remainingWidth / 2, ele.y + ele.height);
						mctx.textAlign = 'start';
						
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
			
					e[1].this().interactable.index = ele.contentBox.index + 1 + i;
					
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
		
		Object.entries(screenResButtons).forEach((e,i)=>{
			if(e[1] == null)return;
			
			e[1].this().interactable.clickend = ()=>{
				if(e[1].this().interactable.hover != true)return;
				var res = e[0].split('x'); // [1920, 1080]
				
				msize.w = res[0];
				msize.h = res[1];
			}
		});
		
		window.width = 500
		window.height = 418
		
		window.icon = 'categories/24/package_settings.png'
		window.title = 'vibeOS Settings'
	}