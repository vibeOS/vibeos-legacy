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
		
		this.object = document.createElement('iframe')
		
		this.width = 500;
		this.height = 500;
		
		this.x = 500;
		this.y = 500;
		
		this.baseURL = baseURL;
		
		document.body.appendChild(this.object);
		
		this.object.src = this.baseURL
		// this.object.type = 'text/html'
		
		this.object.style.width = this.width;
		this.object.style.height = this.height;
		
		this.object.setAttribute('class', 'webview');
		
		this.destroy = ()=>{
			
		}
	}
}

var initDiscord = (()=>{
		var vWebview = new webview(globalProxy + 'https://discord.com/login', 'disc-wv'),
			window = new cwindow('webview-bing', 50, 50, (ele)=>{
				// on render business happens here
				vWebview.object.style.left = ele.x + 10 + 'px';
				vWebview.object.style.top = ele.y + 51 + 'px';
				
				vWebview.object.style.width = ele.width - 2 + 'px';
				vWebview.object.style.height = ele.height - 12 + 'px';
				
				
			});

		window.title = 'Discord';
		window.width = 650;
		window.height = 430;
		window.icon = 'mimetypes/24/html.png';
		window.closing = ()=>{
			vWebview.object.parentNode.removeChild(vWebview.object);
		}
	});
