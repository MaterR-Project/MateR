window.addEventListener("load", event => new Base());

trace("cookie : ", document.cookie);

class Base {

	constructor() {
		console.log("loaded");

		this.initialize();
	}

	async initialize() {

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

		this.resultMVC = new MVC("resultMVC", this, new ResultModel(), new ResultView(), new ResultController());
		await this.resultMVC.initialize();

		if (document.cookie != ""){
			let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)ssid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
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
						location.reload();
          }
        });
				this.io.on('msg', data => {
					trace('msg a notifier : ', data);
					let message =  JSON.parse(data);
					this.tchatMVC.view.addMessage(message.message,message.src," ");
				});
      });
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
