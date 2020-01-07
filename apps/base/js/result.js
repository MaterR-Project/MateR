class ResultModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}

	async getProfile(ssid) {
        this.profileList = [];
        this.ssidList = [ssid];
        /*this.ssidList.map(async e =>{
            let request = "getProfileFromSessionId/" + e;
            let result = await Comm.get(request);
            this.profileList.push(result.response.return);
        })*/
        for(var i = 0; i < this.ssidList.length; i++){
            let request = "getProfileFromSessionId/" + this.ssidList[i];
            let result = await Comm.get(request);
            this.profileList.push(result.response.return);
        }
        return this.profileList;
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
		//this.btnDiv.style.justifyContent = "space-between"
        this.btnDiv.style.width ="100%";
        //this.btnDiv.style.height = "100%";
        this.menuButton = document.createElement("button");
		this.menuButton.innerHTML = "Menu";
		this.menuButton.style.fontSize = "15px";
        this.btnDiv.appendChild(this.menuButton);
        this.mainDiv.appendChild(this.btnDiv);
        // name div
        this.nameDiv = document.createElement("h1");
		this.nameDiv.style.display = "flex";
		this.nameDiv.style.alignItems = "center";
		this.nameDiv.style.justifyContent = "space-evenly";
        this.nameDiv.style.marginTop = "15%";
        this.nameDiv.innerHTML = "His profile";
		this.mainDiv.appendChild(this.nameDiv);
        //div to contain the reult profile part
        this.profileDiv = document.createElement("div");
        this.profileDiv.style.display = "flex";
        this.profileDiv.style.alignItems ="center";
        this.profileDiv.style.height = "85%";
        this.profileDiv.style.width = "100%";
        this.profileDiv.style.justifyContent = "space-between";
        this.mainDiv.appendChild(this.profileDiv);
        // div displayed on the left of the dislayed div
        this.prevDiv = document.createElement("div");
        this.prevDiv.style.display = "none";
        this.prevDiv.innerHTML = "1Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        this.profileDiv.appendChild(this.prevDiv);
        //left btn
        this.leftBtn = document.createElement("a");
        this.leftBtn.style.padding = "5%";
        this.leftBtn.onclick = ("plusProfile(-1");
        this.leftBtn.innerHTML =("&#10094");
        this.profileDiv.appendChild(this.leftBtn);
        // displayed div
        this.curDiv = document.createElement("div");
        this.curDiv.style.overflow = "auto";
        this.curDiv.style.width = "100%";
        this.curDiv.style.height = "90%";
        //this.curDiv.innerHTML = "2Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        this.profileDiv.appendChild(this.curDiv);
        //right btn
        this.rightBtn = document.createElement("a");
        this.rightBtn.style.padding = "5%";
        this.rightBtn.onclick = ("plusProfile(1");
        this.rightBtn.innerHTML =("&#10095");
        this.profileDiv.appendChild(this.rightBtn);
        // div displayed on the right of the displayed div
        this.nextDiv = document.createElement("div");
        this.nextDiv.style.display = "none";
        this.nextDiv.innerHTML = "3Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        this.profileDiv.appendChild(this.nextDiv);
	}

	// activate UI
	activate() {
        super.activate();
        this.mvc.controller.fetchProfile(this.mvc.app.authenticationMVC.model.sessionId);
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
            this.moveRight();
        } else {
            this.moveLeft();
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
            this.mvc.controller.startTalk("id");
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
        let tmp1 = this.curDiv.innerHTML;
        let tmp2 = this.prevDiv.innerHTML;
        let tmp3 = this.nextDiv.innerHTML;
        this.curDiv.innerHTML = tmp2;
        this.prevDiv.innerHTML = tmp3;
        this.nextDiv.innerHTML = tmp1;
    }
    /**
     * @method moveLeft : Updates the view to the left user
     */
    moveLeft(){
        let tmp1 = this.curDiv.innerHTML;
        let tmp2 = this.prevDiv.innerHTML;
        let tmp3 = this.nextDiv.innerHTML;
        this.curDiv.innerHTML = tmp3;
        this.prevDiv.innerHTML = tmp1;
        this.nextDiv.innerHTML = tmp2;
    }
    /**
     * @method doubleTaoed : triggers the controller for a double tap
     */
    doubleTaped(){
        trace("was double tapped");
        this.mvc.controller.startTalk("id");
    }
    /**
     * @method swipedLeft : triggers the controller left swipe wichich is similar
     *                      to a press on the left button
     */
    swipedLeft(){
        trace("swipe left");
        this.mvc.controller.leftClicked();
    }
    /**
     * @method swipeRight : triggers the controller right swipe wichich is similar
     *                      to a press on the right button
     */
    swipedRight(){
        trace("swipe right");
        this.mvc.controller.rightClicked();
    }
    //build profiles
    displayProfiles(profilesList){
        profilesList.map(e =>{
            // set name
            this.nameDiv.innerHTML = e.username;
            // add bio
            let bio = document.createElement("div");
            bio.style.display = "flex";
            bio.style.width = "100%";
            bio.style.justifyContent = "space-between";
            bio.style.alignItems = "center";
            let bioHead = document.createElement("h4");
            bioHead.innerHTML= "Bio :"
            bio.appendChild(bioHead);
            let bioContent = document.createElement("div");
            bioContent.overflow = "true";
            bioContent.style.width = "65%";
            bioContent.innerHTML = e.bio;
            bio.appendChild(bioContent);
            this.curDiv.appendChild(bio);
            // add age
            let age = document.createElement("div");
            age.style.display = "flex";
            age.style.justifyContent = "space-between";
            age.style.alignItems = "center";
            let ageHead = document.createElement("h4");
            ageHead.innerHTML= "Age :"
            age.appendChild(ageHead);
            let ageContent = document.createElement("div");
            ageContent.style.width = "65%";
            let year = new Date().getFullYear();
            if(e.year != "undefined"){
                ageContent.innerHTML = year - parseInt(e.year);
            }else{
                ageContent.innerHTML = "undefined";
            }
            age.appendChild(ageContent);
            this.curDiv.appendChild(age);
            // add gender
            let gender = document.createElement("div");
            gender.style.display = "flex";
            gender.style.justifyContent = "space-between";
            gender.style.alignItems = "center";
            let genderHead = document.createElement("h4");
            genderHead.innerHTML= "Gender :"
            gender.appendChild(genderHead);
            let genderContent = document.createElement("div");
            genderContent.style.width = "65%";
            let genderString;
            genderContent.innerHTML = e.gender;
            gender.appendChild(genderContent);
            this.curDiv.appendChild(gender); 
            // add Country
            let country = document.createElement("div");
            country.style.display = "flex";
            country.style.justifyContent = "space-between";
            country.style.alignItems = "center";
            let countryHead = document.createElement("h4");
            countryHead.innerHTML= "Country :"
            country.appendChild(countryHead);
            let countryContent = document.createElement("div");
            countryContent.style.width = "65%";
            countryContent.innerHTML = e.country;
            country.appendChild(countryContent);
            this.curDiv.appendChild(country);  
            //  add region
            let region = document.createElement("div");
            region.style.display = "flex";
            region.style.justifyContent = "space-between";
            region.style.alignItems = "center";
            let regionHead = document.createElement("h4");
            regionHead.innerHTML= "Region :"
            region.appendChild(regionHead);
            let regionContent = document.createElement("div");
            regionContent.style.width = "65%";
            regionContent.innerHTML = e.region;
            region.appendChild(regionContent);
            this.curDiv.appendChild(region);
            // add languages
            let languages = document.createElement("div");
            languages.style.display = "flex";
            languages.style.justifyContent = "space-between";
            languages.style.alignItems = "center";
            let languagesHead = document.createElement("h4");
            languagesHead.innerHTML= "Languages :"
            languages.appendChild(languagesHead);
            let languagesContent = document.createElement("div");
            languagesContent.style.width = "65%";
            let languagesStr = "";
            e.languages.map(f =>{
                languagesStr = languagesStr.concat(f);
                languagesStr = languagesStr.concat(", ");
            })
            languagesStr = languagesStr.substring(0, languagesStr.length - 2);
            languagesContent.innerHTML = languagesStr;
            languages.appendChild(languagesContent);
            this.curDiv.appendChild(languages);  
            // add games
            let games = document.createElement("div");
            games.style.display = "flex";
            games.style.justifyContent = "flex-end";
            games.style.alignItems = "flex-start";
            games.style.flexDirection = "column"
            let gamesHead = document.createElement("h4");
            gamesHead.innerHTML= "Games :"
            games.appendChild(gamesHead);
            let gamesContent = document.createElement("div");
            gamesContent.style.display = "flex";
            gamesContent.style.justifyContent = "flex-end";
            gamesContent.style.width = "65%";
            let gamesStr = "";
            e.games.map(f =>{
                gamesStr = gamesStr.concat(f.name);
                gamesStr = gamesStr.concat(" : <br/>&emsp; - ");
                gamesStr = gamesStr.concat(f.platform); 
                gamesStr = gamesStr.concat("<br/>&emsp; - ");
                gamesStr = gamesStr.concat(f.level); 
                f.playstyles.map(p =>{
                    gamesStr = gamesStr.concat("<br/>&emsp;&emsp;- ");
                    gamesStr = gamesStr.concat(p);
                })      
                gamesStr = gamesStr.concat("<br/><br/>")
            })
            gamesContent.innerHTML = gamesStr;
            games.appendChild(gamesContent);
            this.curDiv.appendChild(games); 
            // add vocals
            let vocals = document.createElement("div");
            vocals.style.display = "flex";
            vocals.style.justifyContent = "space-between";
            vocals.style.alignItems = "center";
            let vocalsHead = document.createElement("h4");
            vocalsHead.innerHTML= "Vocals :"
            vocals.appendChild(vocalsHead);
            let vocalsContent = document.createElement("div");
            vocalsContent.style.width = "65%";
            let vocalsStr = "";
            e.vocals.map(f =>{
                vocalsStr = vocalsStr.concat(f);
                vocalsStr = vocalsStr.concat(", ");
            })
            vocalsStr = vocalsStr.substring(0, vocalsStr.length - 2);
            vocalsContent.innerHTML = vocalsStr;
            vocals.appendChild(vocalsContent);
            this.curDiv.appendChild(vocals); 
        })
    }

}

class ResultController extends Controller {

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
    /**
     * @method rightClicked : updates the view on the next user
     */
    async rightClicked(){
        this.mvc.view.moveRight();
    }
    /**
     * @method leftClicked : updates the view on the previous user
     */
    async leftClicked(){
        this.mvc.view.moveLeft();
    }
    /**
     * @method startTalk : pops the element from the list to view and continues to next user
     */
    async startTalk(id){
        trace("engaging conversation with : ", id);
        // todo : pop
        this.mvc.view.moveLeft();
    }
    async fetchProfile(ssid){
        this.mvc.view.displayProfiles(await this.mvc.model.getProfile(ssid));
    }
}
