
class autenticationModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

		this.sessionId = undefined;
	}

	async updateWrongPsw(){

	}

	async getSessionId(pseudo, password) {
		trace("get session id");
		let result = await Comm.get("login/"+pseudo+"/"+password);
		trace(result);
		if (result.status == 200) {
			this.sessionId = result.response.message
		}
		trace(this.sessionId);
		return result.response;
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

		//champ texte pour le password
    this.erreur = document.createElement("p");
    this.stage.appendChild(this.erreur);

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
    this.mvc.controller.connectBtnWasClicked(this.pseudoInput.value,this.passwordInput.value);
  }

  createAccountClick(event) {
    this.mvc.controller.createAccountBtnWasClicked();
  }

	updateWrongPsw(message){
		this.erreur.innerHTML = message
	}

}

class autenticationController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}

  async connectBtnWasClicked(pseudo, password) {
		trace("btn click", pseudo, password);
		let response = await this.mvc.model.getSessionId(pseudo,password)
		if (this.mvc.model.sessionId === undefined) {
			this.mvc.view.updateWrongPsw(response.message);
		}else{
			this.mvc.view.destroy();
	    this.mvc.app.testMVC.view.attach(document.body);
	    this.mvc.app.testMVC.view.activate();
		}
  }

  async createAccountBtnWasClicked() {
    this.mvc.view.destroy();
    this.mvc.app.testMVC.view.attach(document.body);
    this.mvc.app.testMVC.view.activate();
  }


}
