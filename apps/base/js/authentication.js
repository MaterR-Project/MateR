
class autenticationModel extends Model {

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

class autenticationView extends View {

	constructor() {
		super();
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);

    this.stage.style.display = "flex";
    this.stage.style.alignItems = "center";
    this.stage.style.justifyContent = "center";
    this.stage.style.flexDirection = "column";

    //logo MateR
    this.header = document.createElement("h1");
    this.header.innerHTML = "MateR";
    this.header.style.fontSize = "60px";
    this.stage.appendChild(this.header);

    //champ texte pour le pseudo
    this.pseudoInput = document.createElement("input");
    this.pseudoInput.setAttribute("type","text");
    this.stage.appendChild(this.pseudoInput);

    //champ texte pour le password
    this.passwordInput = document.createElement("input");
    this.passwordInput.setAttribute("type","text");
    this.stage.appendChild(this.passwordInput);

    //
    //button connect
    this.connectBtn = document.createElement("button");
    this.connectBtn.innerHTML = "connect";
    this.stage.appendChild(this.connectBtn);

    //button create account
    this.createAccountBtn = document.createElement("button");
    this.createAccountBtn.innerHTML = "create an account";
    this.stage.appendChild(this.createAccountBtn);

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
    this.connectBtnHandler = e => this.connectClick(e);
    this.connectBtn.addEventListener("click", this.connectBtnHandler);

    this.createAccountBtnHandler = e => this.createAccountClick(e);
    this.createAccountBtn.addEventListener("click", this.createAccountBtnHandler);
	}

	removeListeners() {
    this.connectBtn.removeEventListener("click", this.connectBtnHandler);
    this.createAccountBtn.removeEventListener("click", this.createAccountBtnHandler);
	}

  connectClick(event) {
    this.mvc.controller.connectBtnWasClicked();
  }

  createAccountClick(event) {
    this.mvc.controller.createAccountBtnWasClicked();
  }

}

class autenticationController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}

  async connectBtnWasClicked(params) {
  }

  async createAccountBtnWasClicked(params) {
    this.mvc.view.deactivate();
    this.mvc.view.detach();
    this.mvc.app.testMVC.view.attach(document.body);
    this.mvc.app.testMVC.view.activate();
  }


}
