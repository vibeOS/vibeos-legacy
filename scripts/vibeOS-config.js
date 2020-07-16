class cradio {
	constructor(label, wh, value){
		this.value = value; // starting value
		
		this.split = 2
		
		this.label = label
		
		this.interactable = new interactable('buttonveee' + Date.now() + Object.entries(interactables).length , wh, wh,
			()=>{
				// hoverstart
			},
			()=>{
				// hoverend
			},
			()=>{
				// clickstart
			},
			()=>{
				// clickend
				this.value = !this.value
			}
		);
		
		this.this = ()=>{
			return this
		}
		
		this.render = ()=>{ // never push to renq in a constructor
			
			// content
			
			this.grad = mctx.createLinearGradient(this.interactable.x, this.interactable.y, this.interactable.x, this.interactable.y + this.interactable.height)
			
			this.bgGrad = mctx.createLinearGradient(this.interactable.x, this.interactable.y, this.interactable.x, this.interactable.y + this.interactable.height)
			
			if(this.interactable.pressed){
				this.grad.addColorStop(0, '#d2692a');
			}else if(this.interactable.hover){
				this.grad.addColorStop(0, '#de985b');
				this.grad.addColorStop(0.8, '#d2612a');
				this.grad.addColorStop(1, '#d2612a');
			}else{
				this.grad.addColorStop(0, '#de985b');
				this.grad.addColorStop(1, '#d2612a');
			}
			
			this.bgGrad.addColorStop(0, '#DDDDDD');
			this.bgGrad.addColorStop(1, '#D1D1D1');
			
			// background border
			
			mctx.fillStyle = 'transparent'
			mctx.strokeStyle = '#A8A8A8'
			
			mctx.roundRect(this.interactable.x, this.interactable.y, this.interactable.width, this.interactable.height, 50);
			
			// background
			
			mctx.fillStyle = 'transparent'
			mctx.strokeStyle = this.bgGrad
			
			mctx.roundRect(this.interactable.x + 1, this.interactable.y + 1, this.interactable.width - 2, this.interactable.height - 2, 40);
			
			// content 
			
			if(this.value){ // enabled
				mctx.fillStyle = this.grad
				mctx.strokeStyle = this.grad
				
				mctx.roundRect(
					this.interactable.x + this.interactable.width / 4,
					this.interactable.y + this.interactable.width / 4,
					this.interactable.width / 2,
					this.interactable.height / 2,
					40
				);
			}else{ //probably disabled
				
			}
			
			mctx.fillStyle='#000';
			mctx.font = "14px Open Sans";
			mctx.fillText(this.label, this.interactable.x + this.interactable.width + 8, this.interactable.y + this.interactable.height - 8);
			
		}
	}
}

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
			},
			switches = {
				'pee': new cswitch(50, 25, false),
			},
			cradios = {
				'1280x720': new cradio('1280x720', 25, false),
				'1366x768': new cradio('1366x768', 25, false),
				'1920x1080': new cradio('1920x1080', 25, false),
			},
			
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
						mctx.fillText('General Settings', remainingX + remainingWidth / 2, ele.y + 75);
						mctx.textAlign = 'start';
						
						mctx.textAlign = 'start';
						mctx.font = '16px Open Sans';
						mctx.fillText('Screen resolution:', remainingX + 16, ele.y + 150);
						
						// todo: dropdown menu and radio buttons
						
						Object.entries(cradios).forEach((e,i)=>{
							if(e[1] == null)return;
							
							e[1].this().interactable.x = remainingX + 16
							
							e[1].this().interactable.y = ele.y + 175 + i * 60
					
							e[1].this().interactable.index = ele.contentBox.index + 3 + i;
							
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
						
						
						Object.entries(switches).forEach((e,i)=>{
							if(e[1] == null)return;
							
							e[1].this().interactable.x = remainingX + 16 + i * 120
							
							e[1].this().interactable.y = ele.y + 175
					
							e[1].this().interactable.index = ele.contentBox.index + 1 + i;
							
							e[1].this().render();
						});
						
						
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
		
		Object.entries(cradios).forEach((e,i)=>{
			if(e[1] == null)return;
			
			var prevFunc = e[1].this().interactable.clickend; // have this somewhere since we overwrite it
			
			e[1].this().interactable.clickend = ()=>{
				// prevFunc();
				
				Object.entries(cradios).forEach((ee,ii)=>{
					ee[1].this().value = false;
				});
				
				e[1].this().value = true
				
				// if(e[1].this().value != true)return;
				
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