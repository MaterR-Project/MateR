class TchatModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);
    }
    async getConv(id1, id2){
        let request = "getConvFromId/" + id1 + "/" + id2;
        this.convList = await Comm.get(request);
        trace(this.convList);
    }
}

class TchatView extends View {

	constructor() {
		super();
		this.table = null;
	}

	initialize(mvc) {
        super.initialize(mvc);
        this.stage.style.display ="flex";
        this.stage.style.alignItems = "center";
        this.stage.justifiyContent = "space-between";
        this.mainDiv = document.createElement("div");
        this.mainDiv.style.display = "flex";
        this.mainDiv.style.flexDirection = "column";
		this.mainDiv.style.justifyContent = "space-between";
		this.mainDiv.style.height = "100%";
		this.mainDiv.style.width = "100%";
        this.stage.appendChild(this.mainDiv);
        // header section above discussio
        this.headDiv = document.createElement("div");
        this.mainDiv.appendChild(this.headDiv);
        this.headDiv.style.display = "flex";
        this.headDiv.style.justifyContent = "space-between";
        this.headDiv.style.aligneItems = "center";
        this.headDiv.style.width ="100%";
        this.headDiv.style.height = "15%";
        this.headDiv.style.borderBottom ="thick solid #000000";
        this.menuButton = document.createElement("button");
        this.menuButton.innerHTML = "Menu";
		this.menuButton.style.fontSize = "15px";
        this.headDiv.appendChild(this.menuButton);
        // profile display
        this.profileDiv = document.createElement("h3");
        this.profileDiv.style.display = "flex";
        this.profileDiv.style.aligneItems = "center";
        this.profileDiv.style.marginRight = "15%";
        this.profileDiv.innerHTML = "correspondant_name"
        this.headDiv.appendChild(this.profileDiv);
        // conversation history
        this.convDiv = document.createElement("div");
        this.convDiv.style.height = "70%";
        this.convDiv.style.width = "100%";
        this.mainDiv.appendChild(this.convDiv);
        // text input and send button
        this.inputDiv = document.createElement("div");
        this.mainDiv.appendChild(this.inputDiv);
        this.inputDiv.style.display = "flex";
        this.inputDiv.style.justifyContent = "space-between";
        this.inputDiv.style.height = "8%";
        this.inputDiv.style.borderTop ="thick solid #000000";
        this.textInput = document.createElement("textarea");
        this.textInput.style.overflow = "true";
        this.textInput.setAttribute("placeholder", "Type your message here !");
        this.textInput.setAttribute("maxlength", "2000");
        this.textInput.style.width = "85%";
        this.inputDiv.appendChild(this.textInput);
        this.sendBtn = document.createElement("button");
        this.sendBtn.style.width = "15%";
        this.inputDiv.appendChild(this.sendBtn);
        this.sendBtn.innerHTML = "Send";
	}
    attach(parent, id){
        //this.targetId = id; // get the id of the person you want to speak with
        let targetId = 1;
        //this.myId = this.mvc.profileMVC.controller.id; // get my own id from the profile mvc
        let myId = 0;
        this.mvc.controller.fetchConv(myId, targetId); // init the controller to start getting the conv bewteen us
        super.attach(parent);
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
        // menu button lsitener
        this.menuHandler = e => this.menuClick(e);
        this.menuButton.addEventListener("click", this.menuHandler);
        this.sendHandler = e => this.sendClick(e);
        this.sendBtn.addEventListener("click", this.sendHandler);
	}

	removeListeners() {
        this.menuButton.removeEventListener("click", this.menuHandler);
	}
    // event triggers
    menuClick() {
		this.mvc.controller.menuClicked();		// link to the menu part of the controller
    }
    sendClick(){
        let content = this.textInput.value;
        // call controller func to send this string to the dest;
        trace(content);
    }

}

class TchatController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}
    /**
     * @method menuClicked : destroys the current view and start the menu MVC
     */
	async menuClicked() {
		this.mvc.view.destroy(); 						     // destroy current view
		this.mvc.app.mvc = this.mvc.app.testMVC;		     // change current MVC to the target MVC : menu
		this.mvc.app.testMVC.view.attach(document.body);     // attach view of menu MVC
		this.mvc.app.testMVC.view.activate(); 			     // activate user interface of menu MVC
    }
    async fetchConv(myId, targetId){
        if(myId > targetId){
            trace("asking for the conv : ", targetId, "_", myId);
            await this.mvc.model.getConv(targetId, myId);
        }else{
            trace("asking for the conv : ", myId, "_", targetId);
            await this.mvc.model.getConv(myId, targetId);
        }
    }
}
