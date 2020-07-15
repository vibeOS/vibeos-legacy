var elementA = document.createElement('div'),
	elementB = document.createElement('div'),
	elementC = document.createElement('canvas');

hiddenContainer.appendChild(elementA);
elementA.appendChild(elementB);
elementA.appendChild(elementC);

var emulator = window.emulator = new V86Starter({
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
	autostart: false,
});

// todo: finish installing arch then impliment this fucking string somehow
/*
          {
                id: "archlinux",
                state: {
                    "url": HOST + "images/v86state.bin",
                    "size": 142770436,
                },
                name: "Arch Linux",
                memory_size: 128 * 1024 * 1024,
                vga_memory_size: 8 * 1024 * 1024,

                // required for restoring state, should not be used when booted on 9p
                hda: {
                    "url": HOST + "images/arch3.img",
                    "size": 16 * 1024 * 1024 * 1024,
                    "async": true,
                },

                filesystem: {
                    "basefs": {
                        "url": HOST + "images/fs.json",
                        "size": 10232633,
                    },
                    "baseurl": HOST + "arch/",
                },
            },
*/

var initLinuxVM = (()=>{ // TODO: replace bios and linux images with blob urls
		emulator.run();
		
		var vmWindow = new cwindow('vm-linux', 50, 50, (ele)=>{
				if(vmWindow.contentBox.hover){
					emulator.keyboard_set_status(true);
				}else{
					emulator.keyboard_set_status(false);
				}
				
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
					mctx.fillText(e, vmWindow.x + 15 , vmWindow.y + 50 + i*lineHeight);
				});
			}),
			textSize = 14,
			lineHeight = 16;

		vmWindow.title = 'Linux emulator';
		vmWindow.width = 650;
		vmWindow.height = 430;
		vmWindow.bgColor = 'black'
		vmWindow.icon = 'apps/24/bash.png';
		vmWindow.cursor = {}
		vmWindow.cursor.hover = 'text'
		
		vmWindow.vmWindow = ()=>{
			emulator.stop();
		}
	});