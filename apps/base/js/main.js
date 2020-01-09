window.addEventListener("load", event => new Base());

class Base {

	constructor() {
		console.log("loaded");

		this.initialize();
	}

	async initialize() {

		this.registrationMVC = new MVC("registrationMVC", this, new RegistrationModel(), new RegistrationView(), new RegistrationControler());
		await this.registrationMVC.initialize(); // run init async tasks

		this.authenticationMVC = new MVC("authenticationMVC", this, new AutenticationModel(), new AutenticationView(), new AutenticationController()); // init app MVC
		await this.authenticationMVC.initialize(); // run init async tasks

		this.profileMVC = new MVC("profileMVC", this, new ProfileModel(), new ProfileView(), new ProfileController());
		await this.profileMVC.initialize();

		this.tchatMVC = new MVC("tchatMVC", this, new TchatModel(), new TchatView(), new TchatController());
		await this.tchatMVC.initialize();

		this.menuMVC = new MVC("menuMVC", this, new MenuModel(), new MenuView(), new MenuController());
		await this.menuMVC.initialize();

		this.searchMVC = new MVC("searchMVC", this, new SearchModel(), new SearchView(), new SearchController());
		await this.searchMVC.initialize();

		this.authenticationMVC.view.attach(document.body);
		this.authenticationMVC.view.activate();

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
        console.log("emit ping with session = 0");
        this.io.on('authConfirm', data =>{
          console.log("authentication : "+data);
          if (data == "ok") {
            this.io.on('msg', data => {
							// todo afficher les message dans tchat
            });
          }
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

	/**
	 * @method onIOConnect : socket is connected
	 */
	/*onIOConnect() {
		trace("yay IO connected");
		this.io.on("dummy", packet => this.onDummyData(packet)); // listen to "dummy" messages
		this.io.emit("dummy", {value: "dummy data from client"}) // send test message
	}*/

	/**
	 * @method onDummyData : dummy data received from io server
	 * @param {Object} data
	 */
	/*onDummyData(data) {
		trace("IO data", data);
		this.testMVC.controller.ioDummy(data); // send it to controller
	}*/
}
