var proxy='https://ldm.sys32.dev/',
	regProxy=new RegExp(`^`+proxy.replace(/\./gi, '\\.').replace(/\//gi, '\\/'), 'gi'),
	request=((url, method, data)=>{
		return new Promise( (solve, reject)=>{
			var methodd='GET',
				success=false;
			if(method.toLowerCase=='post')methodd='POST';
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange=((e)=>{
				if(xhttp.readyState == 4 && xhttp.status == 200){
					success=true;
					solve({html: xhttp.responseText, url: xhttp.responseURL  });
				}
			});
			setTimeout(()=>{
				if(!success)reject('Timed out..');
			}, 5000);
			xhttp.open(methodd,encodeURI(url), true);
			xhttp.send();
		});
	}),
	addproto=((url)=>{
		if (!/^(?:f|ht)tps?\:\/\//.test(url))url = "https://" + url;
		return url;
	}),
	output='',
	rewroteLines = [],
	links = [],
	initBrowser=(async()=>{
		var lines = [],
			winEle = {},
			winID = moLs.length,
			ib = {},
			responseHTML='',
			window=new cwin(winID, 600 , 250, 'VibeBrowser', (ele)=>{
				winEle = ele;
				
				ib.setPos(ele.xpos + 30, ele.ypos + 35);

				rewroteLines.forEach((e,i)=>{
					// if(ele == 'null' || ele == null)return;

					mctx.fillStyle=e.color;
					mctx.font = e.size+'px Arial';
					mctx.fillText(e.str, ele.xpos + 15 , ele.ypos + 80 + i*20);
					
					if(e.href != null){
						var linkEle = moLs[e.linkEleID],
							winEle = moLs[winID];
						
						linkEle.xpos = ele.xpos + 15;
						linkEle.ypos = ele.ypos + 70 + i*20;
						
						mctx.fillRect(linkEle.xpos, linkEle.ypos, linkEle.width, linkEle.height);
					}
				});
				
				/*
				mctx.fillStyle='#000';
				mctx.font = "16px Roboto";
				mctx.fillText(`Enter a URL for the application to visit`, ele.xpos + 6, ele.ypos + 70 );
				*/
			}, (ele)=>{ // on closing
			
			}, msize.w/3, msize.h/4, 'img/apps/web-browser.png');
		
		ib = new inputbar(winID + 2, 0, 0, 425, 24, 'placeholder ig',
		(key, string)=>{ // on change
			
		},
		async str => { // on submit
			var response = await request(proxy+addproto(str), 'GET');
			
			renderWebPage(response.html, response.url );
		});

		renderWebPage=((html, url)=>{
			var lines=html.replace(/[\s\S]*?<body[\s\S]*?>([\s\S]*?)<\/\s*?body\s*?>[\s\S]*?/gi, '$1').split('\n'),
				htmlTitle=html.match(/<title>([\s\S]*?)<\/title>/i)[1],
				fullTitle=`${htmlTitle} - ${url.replace(regProxy, '')}` // hide proxy portion in url
				longestStr='',
				maxLineLength=50;
			
			// reset values
			rewroteLines=[];
			
			links.forEach((e,i)=>{
				e.destroy();
			});
			
			links = []; 
			
			this.closed=false;
			
			lines.forEach((e,i)=>{
				if(longestStr.length <= e.length)longestStr = e;
				
				wordWrap(e, maxLineLength).split('\n').forEach((e,i)=>{
					// rewroteLines.push(e);
				});
				
				e.split('<').forEach((ee,ii)=>{
					var lineData={str: '<'+ee, size: 16, color: '#000', weight: 'normal'},
						tag=lineData.str.match(/<([^\s]*) ?[\s\S]*?>/i);
					
					if(tag != null && tag[1] != null)tag=tag[1].toLowerCase()
					else if(tag == null)tag='';
					
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
							var hrefMatched = lineData.str.match(/<[\s\S]*?href\s*=\s*(?:"|')([\s\S]*?)(?:"|')/i);
							
							if(hrefMatched != null){
								var linkEleID = moLs.length,
									linkEle = new cele(linkEleID, 10000, 100000, lineData.str.length, lineData.size, async(type, e)=>{
										// if the type is a click then redirect 
										console.log(type);
										if(type == 'mouseDownLeft'){
											// hrefMatched[1]
											var response = await request(proxy+addproto(hrefMatched[1]), 'GET');
											
											renderWebPage(response.html, response.url );
											
											lines.push(output);
										}
									}, )
									// { hover : 'link', pressed : 'link' }),
									ele = moLs[linkEleID],
									winEle = moLs[winID];
								

								
								lineData.href = hrefMatched[1];
								lineData.linkEleID = linkEleID;
							}
							
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
		});

	});

addDockIcon('img/apps/web-browser.png', 'Web browser', initBrowser);