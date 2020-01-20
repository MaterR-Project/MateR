class ResultModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}

	async getProfile(id) {
        this.profileList = [];
        id = id.toString();
        this.idList = id.split(",");
        for(var i = 0; i < this.idList.length; i++){
            let request = "getProfileFromId/" + this.idList[i];
            trace(request);
            let result = await Comm.get(request);
            this.profileList.push(result.response.return);
        }
        return this.profileList;
    }
    async addConvToUser (ssid, dest){
        let request = "addConvToUsers/" + ssid + "/" +dest;
        let result = await Comm.get(request);
        trace(result)
    }
    async createConv(src, dest){
        let request = "createConvForUsers/" + src + "/" + dest;
        let result = await Comm.get(request);
        trace(result)
    }
    async initConv(content, src, dest){
        let request = "sendMessage/";
        let data = {message : content, src : src, dest : dest};
        let result = await Comm.post(request, data);
				trace("retour server : ", result.response);
        return result.response.return;
    }

}

class ResultView extends View {

	constructor() {
        super();
        this.threshold = 100; //required min distance traveled to be considered swipe
        this.allowedTime = 300; // maximum time allowed to travel that distance
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);
        // create elements here
        this.stage.style.display ="flex";
        this.stage.style.alignItems = "center";
        this.stage.justifiyContent = "space-between";
        // main div container
        this.mainDiv = document.createElement("div");
        this.mainDiv.style.display = "flex";
        this.mainDiv.style.flexDirection = "column";
		this.mainDiv.style.justifyContent = "space-between";
		this.mainDiv.style.height = "100%";
		this.mainDiv.style.width = "100%";
        this.stage.appendChild(this.mainDiv);
        // menu button
        this.btnDiv = document.createElement("div");
        this.btnDiv.style.display = "flex";
        this.btnDiv.style.width ="100%";
		this.menuButton = document.createElement("span");
		this.menuButton.setAttribute("class", "icon-Menu");
		this.menuButton.style.fontSize = "45px";
		this.menuButton.style.marginLeft="10px";
        this.btnDiv.appendChild(this.menuButton);
        this.mainDiv.appendChild(this.btnDiv);
        //div to contain the reult profile part
        this.profileDiv = document.createElement("div");
        this.profileDiv.style.display = "flex";
        this.profileDiv.style.alignItems ="center";
        this.profileDiv.style.height = "85%";
        this.profileDiv.style.width = "100%";
        this.profileDiv.style.justifyContent = "stretch";
        this.mainDiv.appendChild(this.profileDiv);
        // div displayed on the left of the dislayed div
        this.prevDiv = document.createElement("div");
        this.prevDiv.style.display = "none";
        this.profileDiv.appendChild(this.prevDiv);
        //left btn
        this.leftBtn = document.createElement("a");
        this.leftBtn.style.padding = "5%";
        this.leftBtn.innerHTML =("&#10094");
        this.profileDiv.appendChild(this.leftBtn);
        // displayed div
        this.curDiv = document.createElement("div");
				this.curDiv.setAttribute("class","profil");
        //this.curDiv.style.overflow = "auto";
        this.curDiv.style.width = "100%";
        //this.curDiv.style.height = "90%";
        this.profileDiv.appendChild(this.curDiv);
        //right btn
        this.rightBtn = document.createElement("a");
        this.rightBtn.style.padding = "5%";
        this.rightBtn.innerHTML =("&#10095");
        this.profileDiv.appendChild(this.rightBtn);
        // div displayed on the right of the displayed div
        this.nextDiv = document.createElement("div");
        this.nextDiv.style.display = "none";
        this.profileDiv.appendChild(this.nextDiv);
	}

	// activate UI
	activate() {
        super.activate();
        this.searchResults = this.mvc.app.searchMVC.controller.searchResults;
        trace(this.searchResults)
        this.last = 0;
        this.curIndex = 1;
        this.mvc.controller.fetchProfile(-1);
		this.addListeners(); // listen to events
	}

	// deactivate
	deactivate() {
		super.deactivate();
		this.removeListeners();
	}

	addListeners() {
        //events listeners
        this.menuHandler = e => this.menuClick(e);
        this.menuButton.addEventListener("click", this.menuHandler);
        this.rightHandler = e => this.rightClick(e);
        this.rightBtn.addEventListener("click", this.rightHandler);
        this.leftHandler = e => this.leftClick(e);
        this.leftBtn.addEventListener("click", this.leftHandler);
        this.tapHandler = e => this.taped(e);
        this.lasTap= 0;
        this.curDiv.addEventListener("click", this.tapHandler);
        this.touchStartHandler = e => this.touchStart(e);
        this.curDiv.addEventListener("touchstart", this.touchStartHandler);
        this.touchEndHandler = e => this.touchEnd(e);
        this.curDiv.addEventListener("touchend", this.touchEndHandler);
        this.keyHandler = e => this.keyPressed(e);
        document.addEventListener("keydown", this.keyHandler);
	}

	removeListeners() {
        // event listeners
        this.menuButton.removeEventListener("click", this.menuHandler);
        this.rightBtn.removeEventListener("click", this.rightHandler);
        this.leftBtn.removeEventListener("click", this.leftHandler);
        this.curDiv.removeEventListener("click", this.tapHandler);
        this.curDiv.removeEventListener("touchstart", this.touchStartHandler);
        this.curDiv.removeEventListener("touchend", this.touchEndHandler)
        document.removeEventListener("keydown", this.keyHandler);
    }
    // event triggers
    menuClick() {
		this.mvc.controller.menuClicked();		// link to the menu part of the controller
    }
    rightClick(){
        this.mvc.controller.rightClicked();
    }
    leftClick(){
        this.mvc.controller.leftClicked();
    }
    touchStart(e){
        var touchobj = e.changedTouches[0];
        this.dist = 0;
        this.startX = touchobj.pageX;
        this.startY = touchobj.pageY;
        this.startTime = new Date().getTime(); // record time when finger first makes contact with surface
    }

    touchEnd(e){
        var touchobj = e.changedTouches[0]
        this.dist = touchobj.pageX - this.startX // get total dist traveled by finger while in contact with surface
        this.elapsedTime = new Date().getTime() - this.startTime // get time elapsed
        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
        if(this.elapsedTime <= this.allowedTime){       // adequate time
            if(this.dist >= this.threshold && Math.abs(touchobj.pageY - this.startY) <= 100){    // adequate dist right
                this.handleswipe(0);
            }else if(this.dist <= - this.threshold && Math.abs(touchobj.pageY - this.startY) < 100){    // adequate dist left
                this.handleswipe(1);
            }
        }
    }

    handleswipe(isrightswipe){
        if (isrightswipe == 0){
            this.moveLeft();
        } else {
            this.moveRight();
        }
    }

    // figures out if a double tap happened and calls the double tap
    async taped(){
        var now = new Date().getTime();
        var timesince = now - this.mvc.view.lasTap;
        if((timesince < 600) && timesince > 0){
            this.mvc.view.doubleTaped();
        }
        this.mvc.view.lasTap = new Date().getTime();
    }
    /**
     * @method keyPressed : Updates the view based on the key press :
     *                      engage discussion, previous user / next user
     */
    async keyPressed(event){
        if(event.which === 13){
            // start tchatting with this user
            this.mvc.controller.startTalk();
        }
        if(event.which === 37){
            // previous user
            this.mvc.controller.leftClicked();
        }
        if(event.which === 39){
            // next user
            this.mvc.controller.rightClicked();
        }
    }
    /**
     * @method moveRight : Updates the view to the right user
     */
    moveRight(){
        if(this.curIndex < this.searchResults.length){
            let tmp1 = this.curDiv.innerHTML;
            let tmp2 = this.nextDiv.innerHTML;
            this.curDiv.innerHTML = tmp2;
            this.prevDiv.innerHTML = tmp1;
            if(this.curIndex + 1 != this.searchResults.length){
                this.mvc.controller.fetchProfile(0);

            }
            this.curIndex ++;

        }
        if(this.last == 1 && this.curIndex != this.searchResults.length)
            this.curIndex++
        if(this.curIndex == this.searchResults.length- 1)
            this.last = 1;

        }
    /**
     * @method moveLeft : Updates the view to the left user
     */
    moveLeft(){
        if(this.curIndex > 1){
            let tmp1 = this.curDiv.innerHTML;
            this.nextDiv.innerHTML = tmp1;
            this.mvc.controller.fetchProfile(1);
            this.curIndex--;
            this.last = 0;
        }
    }
    /**
     * @method doubleTaoed : triggers the controller for a double tap
     */
    doubleTaped(){
        trace("was double tapped");
        this.mvc.controller.startTalk();
    }

    //build profiles
	displayProfile2(index, profile, score){
			trace(profile)
			trace("display 2")
			let posIndex;
			profile = profile[0];
			if(index == 0){
					posIndex = this.prevDiv;
			} else if(index == 1){
					posIndex = this.curDiv;
			} else{
					posIndex = this.nextDiv;
			}
			posIndex.innerHTML = "";

			let nameDiv = document.createElement("div");
			nameDiv.style.display = "flex";
			nameDiv.style.alignItems = "center";
			nameDiv.style.justifyContent = "space-evenly";
			nameDiv.style.flexDirection = "column";
			nameDiv.style.marginBottom = "35px";
			let usernameSpan = document.createElement("h1");
			usernameSpan.id = "username"
			usernameSpan.innerHTML = profile.username;
			nameDiv.appendChild(usernameSpan);
			let tagSpan = document.createElement("span")
			tagSpan.style.display ="none";
			tagSpan.innerHTML = profile.id;
			nameDiv.appendChild(tagSpan);
			let compSpan = document.createElement("span");
			nameDiv.appendChild(compSpan);
			compSpan.style.fontStyle = "italic";
			compSpan.innerHTML = "Matching Score: " + Math.round(score) + "%"
			posIndex.appendChild(nameDiv);

			this.mvc.app.profileMVC.view.updateProfile(profile);

			[...this.mvc.app.profileMVC.view.profileData.childNodes].map(elem => {
				trace(elem);
				if (elem != this.mvc.app.profileMVC.view.mailDiv
					&& elem != this.mvc.app.profileMVC.view.newPswDiv
					&& elem != this.mvc.app.profileMVC.view.confPswDiv
					&& elem != this.mvc.app.profileMVC.view.oldPswDiv){
					let clone = elem.cloneNode(true);
					posIndex.appendChild(clone);
				}
			});
		}

    addGameToDisplay(game, container){
		// game div
		let gameDiv = document.createElement("div");
			gameDiv.setAttribute("class","game");
            gameDiv
			// game title
			let gameName = document.createElement("span");
				gameName.innerHTML = game.name;
				gameName.style.textDecoration = "underline";
				gameName.style.marginBottom = "5px";
			gameDiv.appendChild(gameName);

			//game property
			let gameProperty = document.createElement("div");
				gameProperty.setAttribute("class", "gameProperties");
				gameProperty.style.display = "flex";
				gameProperty.style.flexDirection = "column";

				// platform
				let platform = document.createElement("div");
					platform.setAttribute("class","property");
					platform.style.display = "flex";
					platform.style.flexDirection ="row";
					platform.style.justifyContent = "flex-start";
					let labelPlatform = document.createElement("span");
						labelPlatform.innerHTML = "Platform : "
					platform.appendChild(labelPlatform);
					let icon = this.mvc.app.getElementIcon("icon-"+game.platform.split(" ").join("-"), "auto");
					icon.style.marginLeft = "5px";
					icon.style.marginRight = "5px";
					platform.appendChild(icon);
					let namePlatform = document.createElement("span");
						namePlatform.style.marginLeft = "3px";
						namePlatform.innerHTML = game.platform;
					platform.appendChild(namePlatform);
				gameProperty.appendChild(platform);

				// playstyle
				let playstyle = document.createElement("div");
					playstyle.setAttribute("class","property");
					playstyle.style.display = "flex";
					playstyle.style.flexDirection ="column";
					playstyle.style.justifyContent = "flex-start";
					let labelPlaystyle = document.createElement("span");
						labelPlaystyle.innerHTML = "Playstyles : "
					playstyle.appendChild(labelPlaystyle);

					let playStyleNames = document.createElement("div");
					game.playstyles.forEach((ps, _, psArray) => {
						let playStyleSpan = document.createElement("span");
						if (ps == psArray[psArray.length-1]) {
							playStyleSpan.append(ps);
						}else playStyleSpan.append(ps+", ");
						//playStyleSpan.style.marginRight = "3px";
						//playStyleSpan.style.alignSelf = "flex-end";
						playStyleNames.appendChild(playStyleSpan);
					});
						playStyleNames.style.marginLeft = "10px";
						playStyleNames.style.alignSelf = "flex-end";
						//playStyleNames.innerHTML = game.playstyles.join(', ')
					playstyle.appendChild(playStyleNames);

				gameProperty.appendChild(playstyle);

				// level of play
				let level = document.createElement("div");
					level.setAttribute("class","property");
					level.style.display = "flex";
					level.style.flexDirection = "row";
					level.style.justifyContent = "flex-start";
					let labelLevel = document.createElement("span");
						labelLevel.innerHTML = "Level : "
					level.appendChild(labelLevel);
					let nameLevel = document.createElement("span");
						nameLevel.style.marginLeft = "3px";
						nameLevel.innerHTML = game.level;
					level.appendChild(nameLevel);
				gameProperty.appendChild(level);

			gameDiv.appendChild(gameProperty);
		container.appendChild(gameDiv);
	}
}

class ResultController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);
    }

	async menuClicked() {
        this.mvc.view.curDiv.innerHTML = "";
        this.mvc.view.nextDiv.innerHTML = "";
        this.mvc.view.prevDiv.innerHTML = "";
        this.mvc.view.deactivate()
		this.mvc.view.destroy(); 						     // destroy current view
		this.mvc.app.menuMVC.view.attach(document.body);     // attach view of menu MVC
		this.mvc.app.menuMVC.view.activate(); 			     // activate user interface of menu MVC
    }

    async rightClicked(){
        this.mvc.view.moveRight();
    }

    async leftClicked(){
        this.mvc.view.moveLeft();
    }

    async startTalk(){
				trace("searchResults : ",this.mvc.view.searchResults);
				trace("curIndex : ",this.mvc.view.curIndex);
        let matchedUserId = await this.mvc.view.searchResults[this.mvc.view.curIndex - 1].user
				trace("matchedUserId : ",matchedUserId);
        trace("curIndex - 1 : ",this.mvc.view.curIndex -1);
				//let username = this.mvc.view.curDiv.childNodes[0].childNodes[0].innerHTML
        await this.mvc.view.searchResults.splice(this.mvc.view.curIndex-1, 1);
        this.mvc.view.curIndex--;
        trace(this.mvc.view.curIndex);
        trace(this.mvc.view.searchResults)
        if(this.mvc.view.curIndex == this.mvc.view.searchResults.length){
            this.mvc.view.moveLeft();
            this.mvc.view.moveLeft();
            this.mvc.view.moveRight();
        }else{
            this.mvc.view.moveRight();
        }
        let src = this.mvc.app.profileMVC.model.id;
        //let dest = this.mvc.view.curDiv.childNodes[0].childNodes[1].innerHTML
        let message = "---- Starting Tchat ----<br> I'm searching a mate to play "
											+ this.mvc.app.searchMVC.controller.searchGameName
											+ " on " + this.mvc.app.searchMVC.controller.searchGamePlatform;
        await this.mvc.model.addConvToUser(this.mvc.app.authenticationMVC.model.sessionId, matchedUserId);
        await this.mvc.model.createConv(src, matchedUserId);
        this.mvc.model.initConv(message, src, matchedUserId);
        //TODO : call server for notification sending to the other user and adding conv
    }

    async fetchProfile(it){
        if(it == -1){
            if(this.mvc.view.searchResults.length != 0){
                this.mvc.view.displayProfile2(1,
                                            await this.mvc.model.getProfile(this.mvc.view.searchResults[this.mvc.view.curIndex-1].user),
                                            this.mvc.view.searchResults[this.mvc.view.curIndex-1].score);                                        // display A on the visible div

            }                                                                                                                  // initial fetch : get the two first ( [empty, A, B]...), a and b are new
            if(this.mvc.view.searchResults.length > 1){
                this.mvc.view.displayProfile2(2,
                                            await this.mvc.model.getProfile(this.mvc.view.searchResults[this.mvc.view.curIndex].user),
                                            this.mvc.view.searchResults[this.mvc.view.curIndex].score)                                    // put B on the invisible div on the right
            }
                    }
        if(it == 0){                                                                                                                       // move right : only ftech the next one (...[a, b, C]...), a and b are reused, C is newly fetched
            this.mvc.view.displayProfile2(2,
                                        await this.mvc.model.getProfile(this.mvc.view.searchResults[this.mvc.view.curIndex + 1].user),
                                        this.mvc.view.searchResults[this.mvc.view.curIndex].score)                                     // put C on the right, ready for display at next swipe right
        }
        if(it == 1){
            this.mvc.view.displayProfile2(0,
                                        await this.mvc.model.getProfile(this.mvc.view.searchResults[this.mvc.view.curIndex-2].user),
                                        this.mvc.view.searchResults[this.mvc.view.curIndex].score);                                        // put A on visible div
            if(this.mvc.view.curIndex > 0){
               this.mvc.view.displayProfile2(1,
                                           await this.mvc.model.getProfile(this.mvc.view.searchResults[this.mvc.view.curIndex-1].user),
                                         this.mvc.view.searchResults[this.mvc.view.curIndex-1].score)// and if not at the end of the array, put D on left div
           }
        }
    }
}
