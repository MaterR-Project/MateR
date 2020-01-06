class ResultModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}

	async data() {

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
        this.curDiv.style.margin = "8%";
        this.curDiv.innerHTML = "2Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
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
        trace("", this.dist, this.elapsedTime);
        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
        if(this.elapsedTime <= this.allowedTime){       // adequate time
            if(this.dist >= this.threshold && Math.abs(touchobj.pageY - this.startY) <= 100){    // adequate dist right
                this.handleswipe(0);
            }else if(this.dist <= - this.threshold && Math.abs(touchobj.pageY - this.startY) < 100){    // adequate dist left
                this.handleswipe(1);
            }
        }
        //e.preventDefault()
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
}
