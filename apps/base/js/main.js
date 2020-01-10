window.addEventListener("load", event => new Base());

trace("cookie : ", document.cookie);

class Base {

	constructor() {
		console.log("loaded");

		this.initialize();
	}

	async initialize() {

<<<<<<< HEAD
		this.iospace = "baseapp"; // IO namespace for this app
		this.io = io.connect("http://localhost/" + this.iospace); // connect socket.io
		this.io.on("connect", () => this.onIOConnect()); // listen connect event

		this.testMVC = new MVC("myMVC", this, new MyModel(), new MyView(), new MyController()); // init app MVC
		await this.testMVC.initialize(); // run init async tasks

		this.authenticationMVC = new MVC("authenticationMVC", this, new AutenticationModel(), new AutenticationView(), new AutenticationController());
		await this.authenticationMVC.initialize();

		this.resultMVC = new MVC("resultMVC", this, new ResultModel(), new ResultView(), new ResultController()); // init app MVC
		await this.resultMVC.initialize(); // run init async tasks

		this.authenticationMVC.view.attach(document.body); // attach view
		this.authenticationMVC.view.activate(); // activate user interface

	}

	/**
	 * @method test : test server GET fetch
	 */
	async test() {
		console.log("test server hello method");
		let result = await Comm.get("hello/everyone"); // call server hello method with argument "everyone"
		console.log("result", result);
		console.log("response", result.response);
	}
=======
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
					alert("incoming transmission !! " + JSON.parse(data).message);
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
>>>>>>> origin/master

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
