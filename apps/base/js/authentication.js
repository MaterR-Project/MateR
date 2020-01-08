
class AutenticationModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

		this.sessionId = undefined;
	}

	async updateWrongPsw(){

	}

	async login(pseudo, password) {
		trace("get session id");
		let result = await Comm.get("login/"+pseudo+"/"+password);
		trace(result);
		if (result.status == 200) {
			this.sessionId = result.response.return;
		}
		trace(this.sessionId);
		return result.response;
	}

}

class AutenticationView extends View {

	constructor() {
		super();
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);

    this.stage.style.display = "flex";
    this.stage.style.alignItems = "center";
    this.stage.style.justifyContent = "center";

		this.mainDiv = document.createElement("div");
		this.mainDiv.style.display = "flex";
		this.mainDiv.style.justifyContent = "center";
		this.mainDiv.style.flexDirection = "column";

		//logo MateR
    this.header = document.createElement("h1");
    this.header.innerHTML = "MateR";
		this.header.style.margin = "10px";
    this.header.style.fontSize = "60px";
    this.mainDiv.appendChild(this.header);

		//division pour le pseudo
		this.pseudoDiv = document.createElement("div");
		this.pseudoDiv.style.width = "100%";
		this.pseudoDiv.style.display = "flex";
    this.pseudoDiv.style.flexDirection = "column";
		this.pseudoDiv.style.marginBottom = "10px";

		//this.pseudoLabel = document.createElement("label");
		this.pseudoLabel = this.mvc.app.getElementIcon("icon-Profile", "auto");
		this.pseudoLabel.setAttribute("for","username");
		this.pseudoLabel.innerHTML = " Username :";
		this.pseudoDiv.appendChild(this.pseudoLabel);

		this.pseudoInput = document.createElement("input");
		this.pseudoInput.setAttribute("type","text");
		this.pseudoInput.setAttribute("name","username");
		this.pseudoDiv.appendChild(this.pseudoInput);

		this.mainDiv.appendChild(this.pseudoDiv);

		//division pour le password
		this.passwordDiv = document.createElement("div");
		this.passwordDiv.style.width = "100%";
		this.passwordDiv.style.display = "flex";
    this.passwordDiv.style.flexDirection = "column";

		//this.passwordLabel = document.createElement("label");
		this.passwordLabel = this.mvc.app.getElementIcon("icon-Password", "auto");
		this.passwordLabel.setAttribute("for","password");
		this.passwordLabel.innerHTML = " Password (8 characters minimum) :";
		this.passwordDiv.appendChild(this.passwordLabel);

    this.passwordInput = document.createElement("input");
    this.passwordInput.setAttribute("type","password");
		this.passwordInput.setAttribute("name","password");
		this.passwordInput.setAttribute("minlength","8");
		this.passwordInput.setAttribute("maxlength","32");
		this.passwordDiv.appendChild(this.passwordInput);

		this.mainDiv.appendChild(this.passwordDiv);

		//autentication error
		this.erreur = document.createElement("p");
		this.erreur.style.color = "red";
		this.mainDiv.appendChild(this.erreur);

    //button connect
    this.connectBtn = document.createElement("button");
    this.connectBtn.innerHTML = "Connect";
		this.connectBtn.style.marginBottom = "10px";
    this.mainDiv.appendChild(this.connectBtn);

    //button create account
    this.createAccountBtn = document.createElement("button");
    this.createAccountBtn.innerHTML = "Create an Account";
    this.mainDiv.appendChild(this.createAccountBtn);

		this.stage.appendChild(this.mainDiv);

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

class AutenticationController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}

	// TODO with profile.js
  async connectBtnWasClicked(pseudo, password) {
		trace("btn click", pseudo, password);
		if (this.verifyPassword(password)) {
			let cryptPassword = sha512(password);
			let response = await this.mvc.model.login(pseudo,cryptPassword)
			if (this.mvc.model.sessionId == undefined) {
				this.mvc.view.updateWrongPsw(response.return);
			}else{
				this.mvc.view.destroy();
		    this.mvc.app.profileMVC.view.attach(document.body);
				this.mvc.app.initSocket(this.mvc.app.profileMVC.model.id);
		    this.mvc.app.profileMVC.view.activate();
			}
		}
  }

	async createAccountBtnWasClicked() {
    this.mvc.view.destroy();
    this.mvc.app.registrationMVC.view.attach(document.body);
    this.mvc.app.registrationMVC.view.activate();
  }

	verifyPassword(password){
		if (password.length < 8 || password.length > 32) {
			return false;
		}
		return true
	}

}
