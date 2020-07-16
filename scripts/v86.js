class windowOptions {
	constructor(elements){
		this.interactable = new interactable('windowOptions' + Object.entries(interactables).length , 250, 20,
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
		
		this.elements = elements;
		
		this.elements.forEach((e,i)=>{ // add interactable elements
			e.interactable = new interactable('windowOptions' + Object.entries(interactables).length , 50, 24,
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
					e.open = !e.open
				}
			);
			
			e.contents.forEach((entry,index)=>{
				entry.interactable = new interactable('windowOptions_contents_' + Object.entries(interactables).length, e.value.length * 18, 24,
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
						entry.func(); // run callback
					}
				);
				entry.interactable.disabled = true
			});
		});
		
		this.render = (window)=>{
			this.interactable.width = window.width
			this.interactable.height = 25
			this.interactable.x = window.x
			this.interactable.y = window.y + 30
			
			mctx.fillStyle = '#404040'
			mctx.fillRect(this.interactable.x, this.interactable.y, this.interactable.width, this.interactable.height);
			
			// draw elements
			
			this.elements.forEach((e,i)=>{
				e.interactable.index = window.contentBox.index + 232
				
				e.interactable.x = this.interactable.x + 10 + i * e.interactable.width - 4
				e.interactable.y = this.interactable.y
		
				// border
			
				if(e.interactable.hover){
					mctx.fillStyle = '#2D557F';
					mctx.fillRect(e.interactable.x, e.interactable.y, e.interactable.width, e.interactable.height);
					
					mctx.fillStyle = '#4890DA';
					mctx.fillRect(e.interactable.x + 1, e.interactable.y + 1, e.interactable.width - 1, e.interactable.height - 2);
					
					mctx.fillStyle = '#287CD5';
					mctx.fillRect(e.interactable.x + 2, e.interactable.y + 2, e.interactable.width - 3, e.interactable.height - 4);
				
				}else{
					mctx.fillStyle = 'transparent';
					mctx.fillRect(e.interactable.x, e.interactable.y, e.interactable.width, e.interactable.height);
				}
				
				mctx.fillStyle = '#fff'
				mctx.textAlign = 'center'
				
				mctx.font = 'normal 13px Open Sans'
				
				mctx.fillText(e.value, e.interactable.x + e.interactable.width / 2, e.interactable.y + 16);
				
				mctx.textAlign = 'start'
				
				if(cursor.down && cursor.focus != e.interactable.id)e.open = false;
				
				if(e.open){
					e.contents.forEach((entry,index)=>{
						entry.interactable.disabled = false
						
						entry.interactable.index = window.contentBox.index + 233
						
						entry.interactable.width = e.interactable.width
						
						entry.interactable.x = e.interactable.x
						entry.interactable.y = e.interactable.y + (index+1) * entry.interactable.height
				
						// border
					
						if(entry.interactable.hover){
							mctx.fillStyle = '#2D557F';
							mctx.fillRect(entry.interactable.x, entry.interactable.y, entry.interactable.width, entry.interactable.height);
							
							mctx.fillStyle = '#4890DA';
							mctx.fillRect(entry.interactable.x + 1, entry.interactable.y + 1, entry.interactable.width - 1, entry.interactable.height - 2);
							
							mctx.fillStyle = '#287CD5';
							mctx.fillRect(entry.interactable.x + 2, entry.interactable.y + 2, entry.interactable.width - 4, entry.interactable.height - 4);
						
						}else{
							mctx.fillStyle = '#404040';
							mctx.fillRect(entry.interactable.x, entry.interactable.y, entry.interactable.width, entry.interactable.height);
						}
						
						mctx.fillStyle = '#fff'
						mctx.textAlign = 'center'
						
						mctx.font = 'normal 13px Open Sans'
						
						mctx.fillText(entry.value, entry.interactable.x + entry.interactable.width / 2, entry.interactable.y + 16);
						
						mctx.textAlign = 'start'					
					});
				}else{
					e.contents.forEach((entry,index)=>{
						entry.interactable.disabled = true
					});
				}
			});
		}
	}
}

var elementA = document.createElement('div'),
	elementB = document.createElement('div'),
	elementC = document.createElement('canvas');

hiddenContainer.appendChild(elementA);
elementA.appendChild(elementB);
elementA.appendChild(elementC);

/*var emulator = window.emulator = new V86Starter({
	memory_size: 32 * 1024 * 1024,
	vga_memory_size: 2 * 1024 * 1024,
	screen_container: elementA,
	bios: {
		url: 'https://sys32.dev/assets/v86/bios/seabios.bin',
	},
	vga_bios: {
		url: 'https://sys32.dev/assets/v86/bios/vgabios.bin',
	},
	cdrom: {
		url: 'https://sys32.dev/assets/v86/images/linux3.iso'
	},
	network_relay_url: 'wss://relay.widgetry.org/',
	autostart: false,
});*/

var initLinuxVM = (()=>{ // TODO: replace bios and linux images with blob urls
		var emulator = window.emulator = new V86Starter({
			memory_size: 128 * 1024 * 1024,
			vga_memory_size: 8 * 1024 * 1024,
			screen_container: elementA,
			
			initial_state: {
				// url: 'https://sys32.dev/assets/v86/images/archState.bin',
				url: 'https://sys32.dev/assets/v86/images/windows98_state.bin',
				size: 142770436,
			},
			
			bios: {
				url: 'https://sys32.dev/assets/v86/bios/seabios.bin',
			},
			
			vga_bios: {
				url: 'https://sys32.dev/assets/v86/bios/vgabios.bin',
			},
			
			hda: {
				// url: 'https://sys32.dev/assets/v86/images/archBruh.img',
				url: 'https://sys32.dev/assets/v86/images/windows98.img',
				async: true,
				size: 10 * 1024 * 1024 * 1024,
			},
			
			cdrom: {
				url: 'https://sys32.dev/assets/v86/images/linux4.iso?wee',
			},
			
			filesystem: {
				baseurl: 'https://ldm.sys32.dev/arch/',
				basefs: 'https://sys32.dev/assets/v86/images/fs.json',
			},
			
			network_relay_url: 'wss://relay.widgetry.org/',
			
			autostart: true,
		});

		// emulator.run();
		
		var wino = new windowOptions([
			{
				value: 'VM',
				contents: [
					{
						value: 'Run',
						func: ()=>{
							emulator.run();
						},
					},
					{
						value: 'Stop',
						func: ()=>{
							emulator.stop();
						},
					},
					
				]
			},
			{
				value: 'wee',
				contents: [
					
				]
			},
		]),
			vmWindow = new cwindow('vm-linux', 50, 50, (ele)=>{
				
				if(!emulator.is_running()){
					mctx.textAlign = 'center';
					
					mctx.fillStyle = '#fff';
					mctx.font = '14px Inconsolata';
					
					mctx.fillText(`Your VM will load shortly...`, vmWindow.contentBox.x + vmWindow.contentBox.width / 2, vmWindow.contentBox.y + vmWindow.contentBox.height / 2 - 14);
					
					mctx.textAlign = 'start';
				}else if(emulator.is_running()){
						if(vmWindow.contentBox.hover){
							emulator.keyboard_set_status(true);
							// emulator.mouse_set_status(true);
						}else{
							emulator.keyboard_set_status(false);
							
							// emulator.mouse_set_status(false);
						}
				}
				if(elementB.style.display != 'none'){ // text display
					var lines = Array.from(elementB.getElementsByTagName('div')),
						display = [];
					
					lines.forEach((e,i)=>{
						var line = '',
							pixels = Array.from(e.getElementsByTagName('span'));
						
						pixels.forEach((ee,ii)=>{
							line = line + ee.innerHTML;
						});
						
						display.push(line);
					});
					
					display.forEach((e,i)=>{
						mctx.fillStyle='#fff';
						mctx.font = textSize+'px Inconsolata';
						mctx.fillText(e, vmWindow.x + 15 , vmWindow.y + 75 + i*lineHeight);
					});
				}else{
					// elementC.width = vmWindow.contentBox.width
					// elementC.height = vmWindow.contentBox.height
					
					mctx.drawImage(elementC, vmWindow.contentBox.x, vmWindow.y + 55, elementC.width, elementC.height);
				}
				
				wino.render(ele);
				wino.interactable.index = 30
			}),
			textSize = 14,
			lineHeight = 16;

		vmWindow.title = 'Emulator';
		vmWindow.width = 650;
		vmWindow.height = 460;
		vmWindow.bgColor = 'black'
		vmWindow.icon = 'apps/24/bash.png';
		vmWindow.cursor = {}
		vmWindow.cursor.hover = 'text'
		
		vmWindow.onclose = ()=>{
			emulator.stop();
		}
		
		mCanvas.addEventListener('click', ()=>{
			if(vmWindow.contentBox.hover)mCanvas.requestPointerLock();
		});
		
		emulator.add_listener('screen-set-size-graphical', (e)=>{
			// console.log(e);
			vmWindow.width = e[0]
			vmWindow.height = e[1] + 35
			return e
		});
	});