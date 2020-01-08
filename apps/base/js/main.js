window.addEventListener("load", event => new Base());

class Base {

	constructor() {
		console.log("loaded");

		this.initialize();
	}

	async initialize() {

		this.autenticationMVC = new MVC("autenticationMVC", this, new AutenticationModel(), new AutenticationView(), new AutenticationController()); // init app MVC
		await this.autenticationMVC.initialize(); // run init async tasks

		this.autenticationMVC.view.attach(document.body); // attach view
		this.autenticationMVC.view.activate(); // activate user interface

	}

		/**
		 * @method initSocket : connect socket
		 */
		initSocket(sessionId) {
			trace("init socket");
			this.io = io();
			this.io.emit('authentication', sessionId);
			this.io.on('message', msg => {
				this.conversationMVC.model.updateConversation();	// TODO remplacer par fonction qui gere les message recu
			});
		}

	/**
	 * @method onIOConnect : socket is connected
	 */
	onIOConnect() {
		trace("yay IO connected");
		this.io.on("dummy", packet => this.onDummyData(packet)); // listen to "dummy" messages
		this.io.emit("dummy", {value: "dummy data from client"}) // send test message
	}

	/**
	 * @method onDummyData : dummy data received from io server
	 * @param {Object} data
	 */
	onDummyData(data) {
		trace("IO data", data);
		this.testMVC.controller.ioDummy(data); // send it to controller
	}
}
