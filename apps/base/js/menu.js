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
        this.stage.justifiyContent = "space-between";
        this.mainDiv = document.createElement("div");
        this.mainDiv.style.display = "flex";
        this.mainDiv.style.flexDirection = "column";
		//this.mainDiv.style.justifyContent = "space-between";
		this.mainDiv.style.height = "100%";
		this.mainDiv.style.width = "100%";
        this.stage.appendChild(this.mainDiv);
        // profile header
        this.profileDiv = document.createElement("div");
        this.mainDiv.appendChild(this.profileDiv);
        this.profileDiv.style.display = "flex";
        this.profileDiv.style.justifyContent = "space-around";
        this.profileDiv.style.alignItems = "center";
        this.profileDiv.style.height = "20%"
        this.profileDiv.style.border = "solid #999999";
        this.profileIcon = document.createElement("i");
        this.profileIcon.innerHTML = "?";
        this.profileDiv.appendChild(this.profileIcon);
        this.nameDiv = document.createElement("h2");
        this.profileDiv.appendChild(this.nameDiv);
        this.nameDiv.innerHTML = "My Profile";
        // search header
        this.searchDiv = document.createElement("div");
        this.mainDiv.appendChild(this.searchDiv);
        this.searchDiv.style.display = "flex";
        this.searchDiv.style.justifyContent = "space-around";
        this.searchDiv.style.alignItems = "center";
        this.searchDiv.style.height = "20%";
        this.searchDiv.style.border = "solid #999999";
        this.searchIcon = document.createElement("i");
        this.searchIcon.innerHTML = "?";
        this.searchDiv.appendChild(this.searchIcon);
        this.searchText = document.createElement("h2");
        this.searchDiv.appendChild(this.searchText);
        this.searchText.innerHTML = "Give me some mates !";
        // conversation summury div
        this.convDiv = document.createElement("div");
        this.mainDiv.appendChild(this.convDiv);
        
        this.convDiv.style.overflow = "auto";
        this.convDiv.style.display = "flex";
        this.convDiv.style.flexDirection = "column";
        this.convDiv.style.justifyContent = "center";
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
            trace(e);
            let shortDiv = document.createElement("div");
            this.convDiv.appendChild(shortDiv);
            shortDiv.style.marginLeft = "10px";
            shortDiv.style.marginBottom = "15px";
            shortDiv.style.display = "flex";
            shortDiv.style.flexDirection = "column";
            shortDiv.style.width ="66%";
            shortDiv.style.border = "thin solid #999999"
            // notif
            let notifSpan = document.createElement("span");
            shortDiv.appendChild(notifSpan);    // display # of notifications, defaults to 0
            notifSpan.style.display = "none";
            // user name
            let userNameDiv = document.createElement("span");
            userNameDiv.style.fontSize = "15px";
            userNameDiv.style.fontWeight = "bold";
            userNameDiv.style.margin = "5px";
            shortDiv.appendChild(userNameDiv);
            let name = await this.mvc.controller.goName(e.message.Id);
            userNameDiv.innerHTML = name;
            // body
            let messageBody = document.createElement("span");
            messageBody.style.margin = "5px";
            messageBody.style.display = "flex";
            messageBody.style.alignSelf = "flex-end";
            shortDiv.appendChild(messageBody);
            messageBody.style.overflow = "ellipsis";
            if(e.message.Id == this.mvc.app.profileMVC.model.id){
                messageBody.innerHTML = "You   : ";
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
        this.mvc.view.destroy();
        this.mvc.app.profileMVC.view.attach(document.body);
        this.mvc.app.profileMVC.view.activate();
    }
    goSearch(){
        trace("uncomment the lines below me !!");
        //this.mvc.view.destroy();
        //this.mvc.app.searchMVC.view.attach(document.body);
        //this.mvc.app.searchMVC.view.activate();
    }
    async fetchConv(myId){
        trace("asking for the convs of : ", myId);
        this.convList = await this.mvc.model.getConv(myId)
        await this.mvc.view.displayShortConv(this.convList); // get the conersation list of this user
        
    }
    async goName(id){
        let name = await this.mvc.model.getName(id);
        return name;
    }
    goToConv(id){
        this.mvc.view.destroy();
        this.mvc.app.tchatMVC.view.attach(document.body, id);
        this.mvc.app.tchatMVC.view.activate()
    }
}