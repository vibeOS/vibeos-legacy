var proxy='https://ldm.sys32.dev/',
	regProxy=new RegExp(`^`+proxy.replace(/\./gi, '\\.').replace(/\//gi, '\\/'), 'gi'),
	request=((url, method, data)=>{
		return new Promise( (solve, reject)=>{
			var methodd='GET';
			if(method.toLowerCase=='post')methodd='POST';
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange=((e)=>{
				if(xhttp.readyState == 4 && xhttp.status == 200){
					solve({html: xhttp.responseText, url: xhttp.responseURL  });
				}
			});
			xhttp.open(methodd,encodeURI(url), true);
			xhttp.send();
		});
	}),
	addproto=((url)=>{
		if (!/^(?:f|ht)tps?\:\/\//.test(url))url = "https://" + url;
		return url;
	}),
	renderWebPage=((html, url)=>{
		console.log(html);
		
		var lines=html.replace(/[\s\S]*?<body[\s\S]*?>([\s\S]*?)<\/\s*?body\s*?>[\s\S]*?/gi, '$1').split('\n'),
			rewroteLines=[],
			htmlTitle=html.match(/<title>([\s\S]*?)<\/title>/i)[1],
			fullTitle=`${htmlTitle} - ${url.replace(regProxy, '')}` // hide proxy portion in url
			longestStr='',
			maxLineLength=50;
		
		this.closed=false;
		
		lines.forEach((e,i)=>{
			if(longestStr.length <= e.length)longestStr = e;
			
			/*wordWrap(e, maxLineLength).split('\n').forEach((e,i)=>{
				rewroteLines.push(e);
			});*/
			
			e.split('<').forEach((ee,ii)=>{
				var lineData={str: '<'+ee, size: 16, color: '#000', weight: 'normal'},
					tag=lineData.str.match(/<([^\s]*) ?[\s\S]*?>/i);
				
				if(tag != null && tag[1] != null)tag=tag[1].toLowerCase()
				else if(tag == null)tag='';
				
				console.log(tag);
				
				switch(tag){
					case'p':
					default:
						lineData.size = 16;
						break
					
					case'h1':
						lineData.size = 32;
						break
					
					case'a':
						lineData.color = 'blue'
						break
				}
				
				if(lineData.str.match(/&[\S]*?;/gi) !=null)lineData.str.match(/&[\S]*?;/gi).forEach((e,i)=>{
					if(e.startsWith('&#')){
						var charCode=e.replace(/\D/gi, ''), // remove all non-digits
							chare=String.fromCharCode(Number(charCode)); // convert charcode to a character
						
						lineData.str = lineData.str.replace(e, chare);
					}
				});
				
				lineData.str = lineData.str
				.replace(/<[\s\S]*?>/gi, '') // hide tags
				.replace(/[<>]/gi, '') // hide tags pt 2
				.replace(/&[\S]*?;/gi, '') // hide escaped characters
				;
				if(lineData.str.match(/(^$|^<\s*?$)/gi))lineData.str='';
				
				if(lineData.str!='')rewroteLines.push(lineData);
			});
		});
		
		var window=new cwin(moLs.length+1, maxLineLength*16, rewroteLines.length*26, fullTitle, (type, ele)=>{ // info panel
				// render
			}, (ele)=>{ // on closing
				
			}, 100, 200, 'img/html.png');
		
		rewroteLines.forEach((e,i)=>{
			
			renderQ.push(()=>{
				var ele=moLs[window.eleID];
				if(ele == 'null' || ele == null)return;
				
				mctx.fillStyle=e.color;
				mctx.font = e.size+'px Arial';
				mctx.fillText(e.str, ele.xpos + 10 , ele.ypos + 60 + i*20);
			});
		});
		
	}),
	initBrowser=(async()=>{
		var blinkStr='',
			lines=[],
			blinkInterval=()=>{
				var ele=moLs[urlBar.eleID];
				
				if(typeof ele == 'undefined')return;
				
				if(ele.focused){
					if(blinkStr=='')blinkStr='|'
					else blinkStr='';
				}else{
					blinkStr='';
				}
			},
			window=new cwin(moLs.length, 500 , 250, 'VibeBrowser', (ele)=>{ // info panel
				
			}, (ele)=>{ // on closing
			
				clearInterval(blinkInterval);
			
			}, msize.w/3, msize.h/4, 'img/web.png'),
			responseHTML='',
			urlValue='',
			urlBar=new cele(moLs.length, 0, 0, 470, 24); // define urlbar after window has made for correct order of stuff
		
		setInterval(blinkInterval, 1000);
		
		document.addEventListener('keydown', async e=>{
			var ele=moLs[urlBar.eleID];
			
			if(ele.focused){
				
				switch(e.keyCode){
					case 8: // backspace
						urlValue=urlValue.substr(0,urlValue.length-1);
						break
					case 38: // up arrow
						urlValue=prevTermStr;
						break
					case 16: case 20:case 36:case 144:case 93:case 17:case 27:case 9:case 91:case 18:case 46:case 35:case 34:case 45:case 33:case 40:case 39:case 37:
						break
					case 13: // enter key
						// lines.push('https://'+urlValue);
						var output='';
						try {
							output=eval(urlValue);
						}catch(err){
							output=err;
						}
						
						var response = await request(proxy+addproto(urlValue), 'GET');
						
						renderWebPage(response.html, response.url );
						
						prevTermStr=urlValue;
						urlValue='';
						
						lines.push(output);
						
						break
					default:
						var keyyy=e.key
						urlValue=urlValue+keyyy;
						break
				}
			}
		});
		
		renderQ[urlBar.eleID]=(()=>{
			var ele=moLs[urlBar.eleID],
				winBar=moLs[window.eleID];
			
			if(typeof ele == 'undefined' || typeof winBar == 'undefined' || winBar == null)return renderQ.splice(urlBar.eleID, 1);
			
			if(ele.focused){
				mctx.fillStyle='#fff';
			}else if(ele.hover){
				mctx.fillStyle='#bdbdbd';
			}else{
				mctx.fillStyle='#8a8a8a';
			}
			
			moLs[urlBar.eleID].xpos = winBar.xpos+15;
			moLs[urlBar.eleID].ypos = winBar.ypos + 240;
			
			mctx.fillRect(ele.xpos, ele.ypos, ele.width, ele.height);
			
			mctx.fillStyle='#000';
			mctx.fillRect(ele.xpos+2, ele.ypos+2, ele.width-4, ele.height-4);
			
			mctx.fillStyle='#000';
			mctx.font = "16px Roboto";
			mctx.fillText(`Enter a URL for the application to visit`, ele.xpos + 3 , ele.ypos - 20 );
			
			mctx.fillStyle='#fff';
			mctx.font = "14px Roboto";
			
			if(urlValue.length <= 0 && ele.focused==true){
				mctx.fillStyle='#8c8c8c';
				mctx.fillText(blinkStr, ele.xpos + 10 , ele.ypos +  ele.height/2 + 5 );
			}else if(urlValue.length <= 0){
				mctx.fillStyle='#8c8c8c';
				mctx.fillText('https://example.org', ele.xpos + 10 , ele.ypos +  ele.height/2 + 5 );
			}else{
				mctx.fillText(urlValue+blinkStr, ele.xpos + 10 , ele.ypos +  ele.height/2 + 5 );
			}
			
		});
	});

addDockIcon('img/web.png', 'Web browser', initBrowser);