class TchatModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);
    }
    // get the conersation between two users from server
    async getConv(id1, id2){
        let request = "getConvFromId/" + id1 + "/" + id2;
        this.convList = await Comm.get(request);
        return this.convList.response.return;
    }
    // send a message to the server with the destination id and the source id
    async pushMessage(content){
        let request = "sendMessage/";
        let data = {message : content, src : this.mvc.view.src, dest : this.mvc.view.dest};
        let result = await Comm.post(request, data);
        return result.response.return;
    }
    // gets the name of a user from his id
    async getName(id){
        let request = "getNameFromId/" + id;
        let result = await Comm.get(request);
        return result.response.return;
    }
}

class TchatView extends View {

	constructor() {
		super();
		this.table = null;
	}
    // create the skeleton of the view
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
        this.headDiv.style.borderBottom ="thick solid #303030";
        this.menuButton = this.mvc.app.getElementIcon("icon-Menu", "45px");
        //this.menuButton.innerHTML = "Menu";
				//this.menuButton.style.fontSize = "15px";
        this.headDiv.appendChild(this.menuButton);
        // profile display
        this.profileDiv = document.createElement("span");
        this.profileDiv.style.display = "flex";
        this.profileDiv.style.aligneItems = "center";
				this.profileDiv.style.marginTop = "20px";
        this.profileDiv.style.fontSize = "45px";
				this.profileDiv.style.fontWeight = "bold";
        this.profileDiv.innerHTML = "correspondant_name"
        this.headDiv.appendChild(this.profileDiv);
				let tmpSpan = document.createElement("span");
				this.headDiv.appendChild(tmpSpan);
        // conversation history
        this.convDiv = document.createElement("div");
        this.convDiv.style.overflow = "auto";
        this.convDiv.style.height = "70%";
        this.convDiv.style.width = "100%";
        this.mainDiv.appendChild(this.convDiv);
        // text input and send button
        this.inputDiv = document.createElement("div");
        this.mainDiv.appendChild(this.inputDiv);
        this.inputDiv.style.display = "flex";
        this.inputDiv.style.flexDirection = "row";
				this.inputDiv.style.marginBottom = "1px";
        this.inputDiv.style.height = "10%";
        this.inputDiv.style.borderTop ="thick solid #303030";
        this.textInput = document.createElement("textarea");
        this.textInput.style.overflow = "true";
        this.textInput.setAttribute("placeholder", "Type your message here !");
        this.textInput.setAttribute("maxlength", "2000");
        this.textInput.style.width = "100%";
        this.inputDiv.appendChild(this.textInput);
        //this.sendBtn = document.createElement("button");
				this.sendBtn = this.mvc.app.getElementIcon("icon-paper-plane", "45px");
        //this.sendBtn.style.width = "15%";
				this.sendBtn.style.justifyContent = "center";
				this.sendBtn.style.marginLeft = "10px";
				this.sendBtn.style.marginRight = "10px";
				this.sendBtn.style.marginTop = "8px";
        this.inputDiv.appendChild(this.sendBtn);
        //this.sendBtn.innerHTML = "Send";
    }
    // atatch the view and collects the user's ID
    attach(parent, id){
        //this.targetId = id; // get the id of the person you want to speak with
        this.dest = id;
        this.myId = this.mvc.app.profileMVC.model.id; // get my own id from the profile mvc
        this.src = this.myId;
        this.mvc.controller.fetchConv(this.myId, this.dest); // init the controller to start getting the conv bewteen us
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
    // add event listeners
	addListeners() {
        // menu button lsitener
        this.menuHandler = e => this.menuClick(e);
        this.menuButton.addEventListener("click", this.menuHandler);
        this.sendHandler = e => this.sendClick(e);
        this.sendBtn.addEventListener("click", this.sendHandler);
        this.keyHandler = e => this.keyPressed(e);
        document.addEventListener("keydown", this.keyHandler);
	}
    // remove event listeners
	removeListeners() {
        this.menuButton.removeEventListener("click", this.menuHandler);
        this.sendBtn.removeEventListener("click", this.sendHandler);
        document.removeEventListener("keydown", this.keyHandler)
	}
    // handler to link to the controller and launch menuMVC
    menuClick() {
		this.mvc.controller.menuClicked();
    }
    // handler for the cliking of the send button, also user by keyPressed()
    sendClick(){
        let content = this.textInput.value;
        // call controller func to send this string to the dest;
        if(content !=""){
            this.addMessage(content, this.src, "sending...");
            this.mvc.controller.sendMessage(content);
            this.textInput.value = "";
        }
    }
    // key down event handler to detect the press of ENTER
    keyPressed(event){
        if(event.which === 13){
            // start tchatting with this user
            this.sendClick();
        }
    }
    // updates the view with the list of messages returned by the model
    displayConv(conv){
        conv.map(e =>{
            let messageDiv = document.createElement("div");
            this.convDiv.appendChild(messageDiv);
            if(this.src == e.Id){
                messageDiv.style.float = "right";   // sent by us
                messageDiv.style.backgroundColor = "#598500";
                messageDiv.style.color = "white";
            } else if (this.dest == e.Id){
                messageDiv.style.float = "left";    // sent by other
                messageDiv.style.backgroundColor = "#292929";
                messageDiv.style.color = "white";

            }
            messageDiv.style.margin = "5px";
            messageDiv.style.border = "medium solid #303030";
            messageDiv.style.width = "50%";
            let messageContent = document.createElement("span");
            messageContent.style.width = "100%";
						messageContent.style.marginLeft="5px";
            messageDiv.appendChild(messageContent);
            messageContent.style.fontSize = "15px";
            messageContent.style.overflowWrap = "break-word";
            messageContent.innerHTML = e.Message;
            let messageHeader = document.createElement("div");
            messageDiv.appendChild(messageHeader);
            messageHeader.style.display = "flex";
            messageHeader.style.fontSize = "12px";
            messageHeader.style.flexDirection = "row";
            messageHeader.style.justifyContent = "space-between";
            messageHeader.style.color = "#b5b5b5";
            let statusDiv = document.createElement("span");
            //let statusDiv = document.createElement("div");
						//trace(e.State == "seen", this.src == e.Id)
            if(e.State == "seen" && this.src == e.Id){
                statusDiv = this.mvc.app.getElementIcon("icon-seen", "auto");// e.State;
								messageHeader.style.marginLeft="5px";
            }
						messageHeader.appendChild(statusDiv);
            let timeStamp = document.createElement("span");
						timeStamp.innerHTML = e.Time;
						//timeStamp.style.width = "100%";
						timeStamp.style.justifyContent = "flex-end";
            messageHeader.appendChild(timeStamp);
        })
        // scroll to the bottom of the conversation aka newest messages
        this.convDiv.scrollTo(0, this.convDiv.scrollHeight);
    }
    // adds a message to the view
    addMessage(content, src, state){
        trace("adding message : ", content, "from user : ", src);
        let messageDiv = document.createElement("div");
        this.convDiv.appendChild(messageDiv);
        if(this.src == src){
            messageDiv.style.float = "right";   // sent by us
            messageDiv.style.backgroundColor = "#598500";
        } else if (this.dest == src){
            messageDiv.style.float = "left";    // sent by other
            messageDiv.style.backgroundColor = "#292929";
        }
        messageDiv.style.margin = "5px";
        messageDiv.style.border = "medium solid #303030";
        messageDiv.style.width = "50%";
        messageDiv.style.color = "#FFFFFF";
        let messageContent = document.createElement("div");
        messageDiv.appendChild(messageContent);
        messageContent.style.fontSize = "15px";
        messageContent.innerHTML = content;
        let messageHeader = document.createElement("div");
        messageHeader.id = "latest";
        messageContent.style.width = "100%";
        messageContent.style.overflowWrap = "break-word";
        messageDiv.appendChild(messageHeader);
        messageHeader.style.display = "flex";
        messageHeader.style.fontSize = "12px";
        messageHeader.style.color = "#b5b5b5";
        messageHeader.style.flexDirection = "row";
        messageHeader.style.justifyContent = "space-between";
        let statusDiv = document.createElement("div");
        messageHeader.appendChild(statusDiv);
        messageHeader.innerHTML = state;
        let timeStamp = document.createElement("div");
        messageHeader.appendChild(timeStamp);
        var time = new Date();
				let minutes = time.getMinutes();
				let hours = time.getHours();
				if (minutes < 10) minutes = "0"+minutes;
				if (hours < 10) hours = "0"+hours;
        timeStamp.innerHTML = hours+":"+ minutes;
        //timeStamp.
        // scroll to the bottom of the conversation aka newest messages
        this.convDiv.scrollTo(0, this.convDiv.scrollHeight);
    }
    // updates the first div to the correspondant's user name
    setName(name){
        this.profileDiv.innerHTML = name;
    }
    // updates the latest sent message to set the message status
    setStatus(data){
        var lastMessage = document.getElementById("latest");
        if(data == "ok"){
            lastMessage.innerHTML = "";        // remove the sending status : it was sent
            lastMessage.removeAttribute("id"); // clear the id
            let timeStamp = document.createElement("div");  //set time to sent time
            lastMessage.appendChild(timeStamp);
            var time = new Date();
						let minutes = time.getMinutes();
						let hours = time.getHours();
						if (minutes < 10) minutes = "0"+minutes;
						if (hours < 10) hours = "0"+hours;
            timeStamp.innerHTML = hours+":"+ minutes;
            lastMessage.style.float = "right";
        } else {
            lastMessage.innerHTML = "FAILED TO SEND";
            lastMessage.removeAttribute("id");
            let timeStamp = document.createElement("div");  //set time to sent time
            lastMessage.appendChild(timeStamp);
            var time = new Date();
						let minutes = time.getMinutes();
						let hours = time.getHours();
						if (minutes < 10) minutes = "0"+minutes;
						if (hours < 10) hours = "0"+hours;
            timeStamp.innerHTML = hours+":"+ minutes;
        }
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
        this.mvc.view.convDiv.innerHTML = ""
        this.mvc.view.deactivate();
		this.mvc.view.destroy(); 						     // destroy current view
		this.mvc.app.menuMVC.view.attach(document.body);     // attach view of menu MVC
		this.mvc.app.menuMVC.view.activate(); 			     // activate user interface of menu MVC
    }
    // function to link to the model that gets the message history and update the view
    async fetchConv(myId, targetId){
        if(myId > targetId){
            trace("asking for the conv : ", targetId, "_", myId);
            this.mvc.view.displayConv(await this.mvc.model.getConv(targetId, myId));
        }else{
            trace("asking for the conv : ", myId, "_", targetId);
            this.mvc.view.displayConv(await this.mvc.model.getConv(myId, targetId));
        }
        this.mvc.view.setName(await this.mvc.model.getName(this.mvc.view.dest));
    }
    // function to link to the model that sends a message and update the view
    async sendMessage (content){
        this.mvc.view.setStatus(await this.mvc.model.pushMessage(content));

    }
}
