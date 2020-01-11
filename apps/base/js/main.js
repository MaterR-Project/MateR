window.addEventListener("load", event => new Base());

trace("cookie : ", document.cookie);

class Base {

	constructor() {
		console.log("loaded");

		this.initialize();
	}

	async initialize() {

		this.convMsgRecList = new Map();

		this.registrationMVC = new MVC("registrationMVC", this, new RegistrationModel(), new RegistrationView(), new RegistrationControler());
		await this.registrationMVC.initialize(); // run init async tasks

		this.tchatMVC = new MVC("tchatMVC", this, new TchatModel(), new TchatView(), new TchatController());
		await this.tchatMVC.initialize();

		this.menuMVC = new MVC("menuMVC", this, new MenuModel(), new MenuView(), new MenuController());
		await this.menuMVC.initialize();

		this.searchMVC = new MVC("searchMVC", this, new SearchModel(), new SearchView(), new SearchController());
		await this.searchMVC.initialize();

		this.profileMVC = new MVC("profileMVC", this, new ProfileModel(), new ProfileView(), new ProfileController());
		await this.profileMVC.initialize();

		this.authenticationMVC = new MVC("authenticationMVC", this, new AutenticationModel(), new AutenticationView(), new AutenticationController()); // init app MVC
		await this.authenticationMVC.initialize(); // run init async tasks

		if (document.cookie != ""){
			trace("connect direct gros")
			let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)ssid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			//trace(typeof cookieValue);
			this.authenticationMVC.model.sessionId = cookieValue;
			this.initSocket(cookieValue);
			this.profileMVC.view.attach(document.body);
			this.profileMVC.view.activate();
		}
		else{
			this.authenticationMVC.view.attach(document.body);
			this.authenticationMVC.view.activate();
		}

	}

		/**
		 * @method initSocket : connect socket
		 */
		initSocket(sessionId) {
			trace("init socket with : "+sessionId);
			this.io = io();
      this.io.on('connectSession', data => {
        console.log("connection : " + data);
        this.io.emit('auth', sessionId);
        console.log("emit ping with session : ", sessionId);
        this.io.on('authConfirm', data =>{
          console.log("authentication : "+data);
          if (data == "not ok") {
						alert("authentication failed plz reload your browser");
          }
        });
				this.io.on('msg', data => {
					trace('msg a notifier : ', data);
					let message =  JSON.parse(data);
					this.tchatMVC.view.addMessage(message.message,message.src," ");
					trace("type of : ", typeof message.src);
					if (this.convMsgRecList.has(parseInt(message.src))) {
						this.convMsgRecList.set(parseInt(message.src),this.convMsgRecList.get(message.src)+1);
					}else {
						this.convMsgRecList.set(parseInt(message.src),1);
					}
					this.updateNotif();
				});
      });
		}

		/**
		 * @method updateNotif : update number message not read
		 */
		updateNotif(){
			//add notif message with menu
			let count = 0;
			this.convMsgRecList.forEach( (countConv, conv) =>{
				count = count + countConv;
			});
			if (count == 0) {
				this.profileMVC.view.menuButton.innerHTML = "";
				this.tchatMVC.view.menuButton.innerHTML = "";
			}else{
				this.profileMVC.view.menuButton.innerHTML = count;
				this.tchatMVC.view.menuButton.innerHTML = count;
			}
		}

		/**
		 * @method getElementIcon : return element for required icon
		 * @param {string} iconName
     * @param {string} size
		 */
		getElementIcon(iconName, size){
			let iconSpan = document.createElement("span");
			iconSpan.setAttribute("class", iconName);
			iconSpan.style.fontSize = size;
			return iconSpan;
		}
}
