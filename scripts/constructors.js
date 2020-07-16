var webViewContainer = document.getElementById('webViews');

class webview {
	constructor(baseURL, name){
		this.interactable = new interactable('webview_' + name, 500, 500, ()=>{
			// hoverstart
			
		}, ()=>{
			// hoverend
			
		}, ()=>{
			// click start
			
		}, ()=>{
			// clickend
			
		});
		
		this.id = this.interactable.id;
		
		this.object = document.createElement('iframe')
		
		this.width = 500;
		this.height = 500;
		
		this.x = 500;
		this.y = 500;
		
		this.baseURL = baseURL;
		
		overlay.appendChild(this.object);
		
		this.object.src = this.baseURL
		// this.object.type = 'text/html'
		
		this.object.style.width = this.width;
		this.object.style.height = this.height;
		
		this.object.setAttribute('class', 'webview');
		
		this.destroy = ()=>{
			
		}
	}
}

var initWebView = ((title, icon, url, width, height, proxy)=>{
			if(typeof proxy == 'boolean' && proxy == false)this.url = url
			else this.url = globalProxy + url;
			
			var vWebview = new webview(this.url, 'bing' + Date.now()),
				window = new cwindow('webview-bing', 50, 50, (window)=>{
					// render business happens here
					
					vWebview.interactable.x = window.x;
					vWebview.interactable.y = window.y + 30;
					
					
					vWebview.object.style.left = (window.x) + 'px';
					vWebview.object.style.top = (window.y + 30) + 'px';
					
					vWebview.object.style.width = window.width + 'px';
					vWebview.object.style.height = window.height - 11 + 'px';
					vWebview.object.style.cursor = 'url("tango/cursor/'+cursor.img+'.cur"), none';
					
					if(window.titleBar.pressed || (cursor.focus != window.titleBar.id && cursor.focus != window.closeButton.id && cursor.focus != window.contentBox.id) ){
						if(vWebview.interactable.id == cursor.focus)return vWebview.object.style.display = 'block';;
						vWebview.object.style.display = 'none';
						
						mctx.fillStyle='#000';
						mctx.font = '14px Open Sans';
						mctx.fillText('Focus the window or title bar to use this app', window.x + 15 , window.y + 50);
					}else{
						vWebview.object.style.display = 'block';
					}
					
				});

			window.title = title;
			window.icon = icon;
			window.width = width;
			window.height = height;
			
			window.closing = ()=>{
				vWebview.object.parentNode.removeChild(vWebview.object);
			}
		});

class inputbar {
	constructor(width, height, placeholder, onChange, onSubmit){ // caller needs to set interactable index to get anything working as intended
		this.index = 12;
		
		this.interactable = new interactable('inputbar' + Date.now(), width, height,
		()=>{
			// hoverstart
		},
		()=>{
			// hoverend
		}
		);
		
		this.value = '';
		this.preValue = '';
		this.blinkStr = '';
		
		setInterval(()=>{
			if(cursor.focus == this.interactable.id){
				if(this.blinkStr=='')this.blinkStr='|'
				else this.blinkStr='';
			}else{
				this.blinkStr='';
			}
			
		}, 1000);
		
		if(placeholder != null)this.placeholder = placeholder
		else this.placeholder = 'Input field'
		
		window.addEventListener('paste', e=>{
			if(cursor.focus != this.interactable.id)return;
			var paste = (event.clipboardData || window.clipboardData).getData('text');
			this.value += paste;
		});
		
		window.addEventListener('keydown', e=>{
			
			if(cursor.focus != this.interactable.id)return;
			
			switch(e.keyCode){
				case 8: // backspace
					this.value = this.value.substr(0,this.value.length-1);
					break
				case 38: // up arrow
					this.value=this.preValue;
					break
				case 16: case 20:case 36:case 144:case 93:case 17:case 27:case 9:case 91:case 18:case 46:case 35:case 34:case 45:case 33:case 40:case 39:case 37:
					break
				case 13: // enter key
					
					onSubmit(this.value); // run callback stuff before clearing
					
					this.preValue=this.value; // set previous value for uparrow presses
					
					// this.value='';
					
					break
				default:
					this.value=this.value+e.key;
					
					onChange(e.key, this.value);
					
					break
			}
		});
		
		this.render = ()=>{ // let the caller do this part because we absolutely should not push to the renderq on our own
			
			if(cursor.focus == this.interactable.id){
				mctx.fillStyle='#fff';
			}else if(this.interactable.hover){
				mctx.fillStyle='#bdbdbd';
			}else{
				mctx.fillStyle='#8a8a8a';
			}
			
			mctx.fillRect(this.interactable.x, this.interactable.y, this.interactable.width, this.interactable.height);
			
			mctx.fillStyle='#000';
			mctx.fillRect(this.interactable.x+2, this.interactable.y+2, this.interactable.width-4, this.interactable.height-4);
			
			/*
			mctx.fillStyle='#000';
			mctx.font = "16px Roboto";
			mctx.fillText(this.placeholder, this.interactable.x + 3 , this.interactable.y - 20 );
			*/
			
			
			mctx.font = '14px Open Sans';
			
			if(cursor.focus == this.interactable.id){ // focused and has value
				
				mctx.fillStyle='#fff';
				mctx.fillText(this.value + this.blinkStr, this.interactable.x + 10 , this.interactable.y +  this.interactable.height/2 + 5 );
				
			}else if(this.value.length >= 1 ){ // not focused
				mctx.fillStyle='#8c8c8c';
				
				mctx.fillText(this.value, this.interactable.x + 10 , this.interactable.y +  this.interactable.height/2 + 5 );
				
				mctx.fillText(this.blinkStr, this.interactable.x + 10 , this.interactable.y +  this.interactable.height/2 + 5 );
			}
		}
	}
}

class button {
	constructor(text, width, height){
		this.interactable = new interactable('button' + Object.entries(interactables).length , width, height,
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
			}
		);
		
		// let interactable index be set by caller and perhaps contentbox  index +1
		
		this.text = text;
		
		this.this = ()=>{
			return this
		}
		
		this.render = ()=>{ // make caller render the button
			// border
			
			mctx.fillStyle = 'transparent';
			mctx.strokeStyle = '#c95528';
			
			mctx.roundRect(this.interactable.x, this.interactable.y, this.interactable.width, this.interactable.height, 15);
			
			// content
			
			this.grad = mctx.createLinearGradient(this.interactable.x, this.interactable.y, this.interactable.x, this.interactable.y + this.interactable.height);
			
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
			
			// this.grad.addColorStop(0, '#fff');
			// this.grad.addColorStop(1, '#000');
			
			mctx.fillStyle = this.grad;
			mctx.strokeStyle = this.grad;
			
			mctx.roundRect(this.interactable.x + 1, this.interactable.y + 1, this.interactable.width - 2, this.interactable.height - 2, 15);
			
			mctx.fillStyle = '#fff'
			mctx.font = '14px Open Sans';
			mctx.textAlign = 'center'; 
			
			mctx.fillText(this.text, this.interactable.x + this.interactable.width / 2, this.interactable.y + this.interactable.height / 2  + 4);
			
			mctx.textAlign = 'start'; 
		}
	}
}

class cswitch {
	constructor(width, height, value){
		this.value = value; // starting value
		
		this.split = 2
		
		this.interactable = new interactable('button' + Object.entries(interactables).length , width, height,
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
		
		this.width = width
		
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
			
			this.switchX = (this.value ? (this.interactable.x + this.interactable.width - this.interactable.width / this.split) : this.interactable.x)
			
			// background border
			
			mctx.fillStyle = 'transparent';
			mctx.strokeStyle = '#A8A8A8';
			
			mctx.roundRect(this.interactable.x, this.interactable.y, this.interactable.width, this.interactable.height, 15);
			
			// background
			
			mctx.fillStyle = this.bgGrad;
			mctx.strokeStyle = this.bgGrad;
			mctx.roundRect(this.interactable.x + 1, this.interactable.y + 1, this.interactable.width - 2, this.interactable.height - 2, 15);
			
			// border
			
			mctx.fillStyle = 'transparent';
			mctx.strokeStyle = '#c95528';
			
			mctx.roundRect(this.switchX, this.interactable.y, this.interactable.width / this.split, this.interactable.height, 15);
			
			// content 
			
			mctx.fillStyle = this.grad;
			mctx.strokeStyle = this.grad;
			mctx.roundRect(this.switchX + 1, this.interactable.y + 1, (this.interactable.width - 2) / this.split, this.interactable.height - 2, 15);
			
			if(this.value){ // enabled

			}else{ //probably disabled
				
			}
			/*
			mctx.fillStyle = '#fff'
			mctx.font = '14px Open Sans';
			mctx.textAlign = 'center'; 
			
			mctx.fillText(this.text, this.interactable.x + this.interactable.width / 2, this.interactable.y + this.interactable.height / 2  + 4);
			
			mctx.textAlign = 'start'; 
			*/
		}
	}
}

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