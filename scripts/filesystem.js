// sexy filesystem stuff

class filesystem {
	constructor(mnt, knownFiles){
		this.mnt = mnt;
		
		this.hiddenContainer = document.createElement('div');
		document.body.appendChild(this.hiddenContainer);
		this.hiddenContainer.style.display = 'none';
		this.hiddenContainer.style.position = 'absolute';
		
		this.exists = (fn, timeout) => { // see if a file is ** available ** within our system without truly loading it
			return new Promise((solve, reject)=>{
				var obj=document.createElement('iframe'),
					success=false;
				this.hiddenContainer.appendChild(obj);
				obj.src = this.mnt+fn;
				
				obj.setAttribute('sandbox', 'allow-same-origin');
				
				obj.addEventListener('load', ()=>{
					success=true;
					obj.parentNode.removeChild(obj);
					solve(success);
				});
				
				obj.addEventListener('err', err=>{
					success=false;
					obj.parentNode.removeChild(obj);
					reject(success, err);
				});
				
				setTimeout(()=>{
					if(!success)reject('timed out');
				}, timeout);
			});
		}
		
		this.get = (fn, timeout, format) => { // ajax stuff or xhttp requests
			return new Promise(async (solve, reject) => {
				var exists = await fs.exists('test.txt', timeout);
				if(exists != true)return reject(null);
				
				var xhttp = new XMLHttpRequest(),
					file = this.mnt+fn;
				
				xhttp.addEventListener('readystatechange', e=>{
					if(xhttp.readyState == 4 && xhttp.status == 200){
						solve(xhttp.responseText);
					}
				});
				
				xhttp.addEventListener('error', err=>{
					// JSON.stringify(err, null, '\t');
					reject(null);
				});
				
				xhttp.open('GET', file, true);
				xhttp.send();
				
			});
		}
	}
}

var fs = new filesystem('./mnt/');

(async () =>{
	var fileExists = await fs.exists('test.txt', 2000);
	console.log('does a file exist? : ', fileExists);
	
	var file = await fs.get('test.txt', 2000);
	console.log(file);
})();



