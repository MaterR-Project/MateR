class MenuModel extends Model{

    constructor() {
		super();
	}

	async initialize(mvc) {
        super.initialize(mvc);
    }
    async getConv(myId){
        let request = "getShortConvFromId/" + myId;
        let result = await Comm.get(request);
        return result.response.return;
    }
    async getName(id){
        let request = "getNameFromId/" + id;
        let result = await Comm.get(request);
        return result.response.return
    }
}

class MenuView extends View {
	constructor() {
		super();
    }
    attach(parent){
        this.mvc.controller.fetchConv(this.mvc.app.profileMVC.model.id);
        super.attach(parent);
    }

	initialize(mvc) {
        super.initialize(mvc);
        this.stage.style.display ="flex";
        this.stage.style.alignItems = "center";
        this.mainDiv = document.createElement("div");
        this.mainDiv.style.display = "flex";
        this.mainDiv.style.flexDirection = "column";
		this.mainDiv.style.height = "100%";
		this.mainDiv.style.width = "100%";
        this.stage.appendChild(this.mainDiv);

        // profile header
        this.profileDiv = document.createElement("div");
        this.mainDiv.appendChild(this.profileDiv);
        this.profileDiv.style.display = "flex";
        this.profileDiv.style.alignItems = "center";
        this.profileDiv.style.height = "15%"
        this.profileDiv.style.border = "solid #999999";
        this.profileIcon = this.mvc.app.getElementIcon("icon-Profile", "45px");
        this.profileIcon.style.marginLeft="10px";
        this.profileIcon.style.marginRight="10px";
        this.profileDiv.appendChild(this.profileIcon);
        this.nameDiv = document.createElement("h2");
        this.profileDiv.appendChild(this.nameDiv);
        this.nameDiv.innerHTML = "My Profile";

        // search header
        this.searchDiv = document.createElement("div");
        this.mainDiv.appendChild(this.searchDiv);
        this.searchDiv.style.display = "flex";
        this.searchDiv.style.alignItems = "center";
        this.searchDiv.style.height = "15%";
        this.searchDiv.style.border = "solid #999999";
        this.searchIcon = this.searchIcon = this.mvc.app.getElementIcon("icon-Search", "45px");
        this.searchIcon.style.marginLeft="10px";
        this.searchIcon.style.marginRight="10px";
        this.searchDiv.appendChild(this.searchIcon);
        this.searchText = document.createElement("h2");
        this.searchDiv.appendChild(this.searchText);
        this.searchText.innerHTML = "Find some mates !";

        // conv header
        this.headerDiv = document.createElement("div");
        this.mainDiv.appendChild(this.headerDiv);
        this.headerDiv.style.display = "flex";
        this.headerDiv.style.alignItems = "center";
        this.headerDiv.style.height = "15%"
        this.headerDiv.style.border = "solid #999999";
        this.msgIcon = this.mvc.app.getElementIcon("icon-bubbles", "45px");
        this.msgIcon.style.marginLeft="10px";
        this.msgIcon.style.marginRight="10px";
        this.headerDiv.appendChild(this.msgIcon);
        this.msgDiv = document.createElement("h2");
        this.headerDiv.appendChild(this.msgDiv);
        this.msgDiv.innerHTML = "Tchats";

        // conversation summury div
        this.convDiv = document.createElement("div");
        this.mainDiv.appendChild(this.convDiv);
        this.convDiv.style.border = "solid #999999";
        this.convDiv.style.height = "50%"
        this.convDiv.style.overflow = "auto";
        this.convDiv.style.display = "flex";
        this.convDiv.style.flexDirection = "column";
        this.convDiv.style.alignItems = "center";
        this.convDiv.style.marginBottom = "15px"

    }
    activate() {
		super.activate();
		this.addListeners(); // listen to events
	}

	deactivate() {
		super.deactivate();
		this.removeListeners();
	}

	addListeners() {
        this.profileHandler = e => this.profileClick(e);
        this.profileDiv.addEventListener("click", this.profileHandler);
        this.searchHandler = e => this.searchClick(e);
        this.searchDiv.addEventListener("click", this.searchHandler);

    }
    removeListeners() {
        this.profileDiv.removeEventListener("click", this.profileHandler);
        this.searchDiv.removeEventListener("click", this.searchHandler);
    }
    profileClick(e){
        this.mvc.controller.goProfile();
    }
    searchClick(e){
        this.mvc.controller.goSearch();
    }
    async displayShortConv(data){
        data.map(async e =>{
            // main div for each conversation
            let shortDiv = document.createElement("div");
            this.convDiv.appendChild(shortDiv);
            shortDiv.style.display = "flex";
            shortDiv.style.flexDirection = "column";
            shortDiv.style.width ="100%";
            shortDiv.style.border = "thin solid #999999"

            // notif
            let notifSpan = document.createElement("span");
            shortDiv.appendChild(notifSpan);    // display # of notifications, defaults to 0
            notifSpan.style.display = "none";

            // user name
            let userNameDiv = document.createElement("span");
            userNameDiv.style.fontSize = "20px";
            userNameDiv.style.fontWeight = "bold";
            userNameDiv.style.margin = "5px";
            shortDiv.appendChild(userNameDiv);
            let name = await this.mvc.controller.goName(e.id);
            userNameDiv.innerHTML = name;

            // body
            let messageBody = document.createElement("span");
            messageBody.style.marginRight = "5px";
            messageBody.style.marginTop = "0px";
            messageBody.style.marginBottom = "10px";
            messageBody.style.display = "flex";
            messageBody.style.alignSelf = "flex-start";
            messageBody.style.marginLeft = "20px";
            messageBody.style.maxWidth = "90%";
            messageBody.style.textOverflow = "ellipsis";
            messageBody.style.whiteSpace = "nowrap";
            messageBody.style.overflow = "hidden";
            shortDiv.appendChild(messageBody);
            if(e.message.Id == this.mvc.app.profileMVC.model.id){
              messageBody.innerHTML = "You   : ";
            }
            else{
              messageBody.innerHTML = ""+name+" : "
            }
            messageBody.innerHTML += e.message.Message;
            shortDiv.addEventListener("click", () => this.mvc.controller.goToConv(e.id));

        })
    }
}

class MenuController extends Controller{

    constructor() {
		super();
	}

	initialize(mvc) {
        super.initialize(mvc);
    }

    goProfile(){
        this.mvc.view.convDiv.innerHTML = "";
        this.mvc.view.destroy();
        this.mvc.view.deactivate();
        this.mvc.app.profileMVC.view.attach(document.body);
        this.mvc.app.profileMVC.view.activate();
    }
    goSearch(){
        this.mvc.view.convDiv.innerHTML = "";
        this.mvc.view.deactivate();
        this.mvc.view.destroy();
        this.mvc.app.searchMVC.view.attach(document.body);
        this.mvc.app.searchMVC.view.activate();
    }
    async fetchConv(myId){
        this.convList = await this.mvc.model.getConv(myId);
        await this.mvc.view.displayShortConv(this.convList); // get the conersation list of this user

    }
    async goName(id){
        let name = await this.mvc.model.getName(id);
        return name;
    }
    goToConv(id){
        this.mvc.view.convDiv.innerHTML = "";
        this.mvc.view.destroy();
        this.mvc.view.deactivate();
        this.mvc.app.tchatMVC.view.attach(document.body, id);
        this.mvc.app.tchatMVC.view.activate()
    }
}