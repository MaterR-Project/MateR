window.addEventListener("load", event => new Base());

class Base {

	constructor() {
		console.log("loaded");

		this.initialize();
	}

	async initialize() {

		//this.iospace = "baseapp"; // IO namespace for this app
		//this.io = io.connect("http://192.168.1.20/" + this.iospace); // connect socket.io
		//this.io.on("connect", () => this.onIOConnect()); // listen connect event

		this.mvcRegistration = new MVC("mvcRegistration", this, new RegistrationModel(), new RegistrationView(), new RegistrationControler());
		await this.mvcRegistration.initialize(); // run init async tasks

		this.mvcTest = new MVC("myMVC", this, new MyModel(), new MyView(), new MyController()); // init app MVC
		await this.mvcTest.initialize(); // run init async tasks

		this.mvc = this.mvcRegistration;

		//this.body = document.body;
		//this.body.setAttribute("style", "width: "+window.screen.width+"; height: "+window.screen.height);
		//this.body.setAttribute("style", "width = "+window.screen.width)
		//this.body.style.width = window.screen.width;
		//this.body.style.height = window.screen.height;


		this.mvc.view.attach(document.body); // attach view
		this.mvc.view.activate(); // activate user interface

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
		this.mvc.controller.ioDummy(data); // send it to controller
	}*/
}

class MyModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}

	async data() {
		trace("get data");
		// keep data in class variable ? refresh rate ?
		let result = await Comm.get("data"); // wait data from server
		return result.response; // return it to controller
	}

}

class MyView extends View {

	constructor() {
		super();
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);

		// create get test btn
		this.btn = document.createElement("button");
		this.btn.innerHTML = "get test";
		this.stage.appendChild(this.btn);

		// create io test btn
		/*this.iobtn = document.createElement("button");
		this.iobtn.innerHTML = "io test";
		this.stage.appendChild(this.iobtn);*/

		// create go registration btn
		this.navButton = document.createElement("button");
		this.navButton.innerHTML = "registration test";
		this.stage.appendChild(this.navButton);

		// io random value display
		/*this.iovalue = document.createElement("div");
		this.iovalue.innerHTML = "no value";
		this.stage.appendChild(this.iovalue);*/

		// get dataset display
		this.table = document.createElement("table");
		this.stage.appendChild(this.table);
	}

	// activate UI
	activate() {
		super.activate();
		this.addListeners(); // listen to events
	}

	// deactivate
	deactivate() {
		super.deactivate();
		this.removeListeners();
	}

	addListeners() {
		this.getBtnHandler = e => this.btnClick(e);
		this.btn.addEventListener("click", this.getBtnHandler);

	/*	this.ioBtnHandler = e => this.ioBtnClick(e);
		this.iobtn.addEventListener("click", this.ioBtnHandler);*/

		this.navBtnHandler = e => this.navBtnClick(e);
		this.navButton.addEventListener("click", this.navBtnHandler);
	}

	removeListeners() {
		this.btn.removeEventListener("click", this.getBtnHandler);
	//	this.iobtn.removeEventListener("click", this.ioBtnHandler);
		this.navButton.removeEventListener("click", this.navBtnHandler);
	}

	btnClick(event) {
		this.mvc.controller.btnWasClicked("more parameters"); // dispatch
	}

/*	ioBtnClick(event) {
		this.mvc.controller.ioBtnWasClicked("io parameters"); // dispatch
	}*/

	navBtnClick(event) {
		this.mvc.controller.navBtnWasClicked("registration parameters"); // dispatch
	}

	update(data) {
		while(this.table.firstChild) this.table.removeChild(this.table.firstChild); // empty table
		data.forEach(el => { // loop data
			let line = document.createElement("tr"); // create line
			Object.keys(el).forEach(key => { // loop object keys
				let cell = document.createElement("td"); // create cell
				cell.innerHTML = el[key]; // display
				line.appendChild(cell); // add cell
			});
			this.table.appendChild(line); // add line
		});
	}

	/*updateIO(value) {
		this.iovalue.innerHTML = value.toString(); // update io display
	}*/

}

class MyController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}

	async btnWasClicked(params) {
		trace("btn click", params);
		this.mvc.view.update(await this.mvc.model.data()); // wait async request > response from server and update view table values
	}

	/*async ioBtnWasClicked(params) {
		trace("io btn click", params);
		this.mvc.app.io.emit("dummy", {message: "dummy io click"}); // send socket.io packet
	}*/

	async navBtnWasClicked(params) {
		trace("registration btn click", params);
		this.mvc.view.destroy();
		this.mvc.app.mvcRegistration.view.attach(document.body); // attach view
		this.mvc.app.mvcRegistration.view.activate(); // activate user interface
		this.mvc.app.mvc = this.mvc.app.mvcRegistration;
	}

	/*ioDummy(data) {
		this.mvc.view.updateIO(data.value); // io dummy data received from main app
	}*/

}