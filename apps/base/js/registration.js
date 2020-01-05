class RegistrationModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}

}

class RegistrationView extends View {

	constructor() {
		super();
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);


		//
		this.stage.style.display = "flex";
		// axe y
		this.stage.style.alignItems = "center";
		// axe x
		this.stage.style.justifyContent = "center";

		// View main div
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.alignItems = "center";
		this.mainDiv.style.justifyContent = "center";
		this.mainDiv.style.display = "flex";
		this.mainDiv.style.width = "70%";
		this.mainDiv.style.height = "75%";
		this.mainDiv.style.flexDirection = "column";
		this.stage.appendChild(this.mainDiv);

		// MateR Title
		this.materLogo = document.createElement("h1");
		this.materLogo.innerHTML = "MateR";
		this.materLogo.style.marginTop = "3%"
		this.materLogo.style.fontSize = "60px";
		this.mainDiv.appendChild(this.materLogo);

		// Account data fields
		this.text = document.createElement("p");
		this.text.innerHTML = "Lorem ipsum dolor sit amet,\n consectetur adipisci Sed"
		+" varius,\n enim congue sollicitudin aliquet, tellus mi volutpat justo, eu"
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh.";
		this.text.style.overflow = "auto";
		this.mainDiv.appendChild(this.text);

		// create account button
		this.navButton = document.createElement("button");
		this.navButton.innerHTML = "Create Account";
		this.navButton.style.fontSize = "15px";
		this.navButton.style.marginTop = "10%"
		this.navButton.style.marginBottom = "10%"
		this.mainDiv.appendChild(this.navButton);
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
		this.navBtnHandler = e => this.navBtnClick(e);
		this.navButton.addEventListener("click", this.navBtnHandler);
	}

	removeListeners() {
		this.navButton.removeEventListener("click", this.navBtnHandler);
	}

	navBtnClick(event) {
		this.mvc.controller.navBtnWasClicked("go test parameters"); // dispatch
	}

}

class RegistrationControler extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}

	async navBtnWasClicked(params) {
		let test = await Comm.get("getProfileFromSessionId/1234");
		trace(test);
		trace("go test btn click", params);
		this.mvc.view.destroy();
		this.mvc.app.mvcTest.view.attach(document.body); // attach view
		this.mvc.app.mvcTest.view.activate(); // activate user interface
		this.mvc.app.mvc = this.mvc.app.mvcTest;
	}

}