
class ProfileModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}

	async getProfileFromId(id){
		// gets called by auth to get the profile of the guy who connected
		/* trace("get data2");
        // keep data in class variable ? refresh rate ?
        let result = await Comm.get("data2"); // calls method data2 from server passer le session id
		return result.response;  */
		//parse the response
		console.log("truc")
	}
}

class ProfileView extends View {

	constructor() {
		super();
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);


	    this.stage.style.display = "flex";
        // axe y
        this.stage.style.alignItems = "center";
        // axe x
        this.stage.style.justifyContent = "center";

        // View main div
        this.mainDiv = document.createElement("div");

        this.mainDiv.style.alignItems = "center";
        this.mainDiv.style.justifyContent = "center";
		this.mainDiv.style.display = "flex";
		this.mainDiv.style.justifyContent = "space-between";
        this.mainDiv.style.height = "90%";
        this.mainDiv.style.flexDirection = "column";
        this.stage.appendChild(this.mainDiv);

		this.topBtnDiv = document.createElement("div");
		this.mainDiv.appendChild(this.topBtnDiv);
		
		this.topBtnDiv.style.display = "flex";
		this.topBtnDiv.style.justifyContent = "space-between"
		this.topBtnDiv.style.width ="100%";
		// create search btn to open the conversation slide tab
		this.menuButton = document.createElement("button");
		this.menuButton.innerHTML = "Menu";
		this.menuButton.style.fontSize = "15px";
		this.topBtnDiv.appendChild(this.menuButton);
		// create disconnect btn
		this.logoutButton = document.createElement("button");
		this.logoutButton.innerHTML = "Disconnect";
		this.logoutButton.style.fontSize = "15px";
		this.topBtnDiv.appendChild(this.logoutButton);

		this.nameDiv = document.createElement("div");
		this.nameDiv.style.display = "flex";
		this.nameDiv.style.alignItems = "center";
		this.nameDiv.style.justifyContent = "space-evenly";
		this.nameDiv.style.marginTop = "15%";
		this.mainDiv.appendChild(this.nameDiv);

		this.profileName = document.createElement("h1");
        this.profileName.innerHTML = "My Name";
        this.profileName.style.marginTop = "3%"
		this.profileName.style.fontSize = "35px";
		this.nameDiv.appendChild(this.profileName);
		// create a change button to modify the name
		this.nameButton = document.createElement("button");
		this.nameButton.innerHTML = "Change";
		this.nameButton.style.height = "30%";
		this.nameDiv.appendChild(this.nameButton);

        this.profileData = document.createElement("div");
        this.profileData.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis sollicitudin lorem, viverra ultrices dolor maximus nec. Fusce semper ligula sed ornare facilisis. Fusce ligula dolor, feugiat rhoncus placerat eget, semper ut lectus. Mauris rutrum pulvinar eros, eu laoreet eros eleifend id. Aliquam erat volutpat. Nulla eu velit tortor. Donec placerat quam ante, id congue velit tempus sit amet. In hac habitasse platea dictumst. Curabitur nec mi sit amet urna feugiat sollicitudin suscipit in ante. Ut laoreet mauris quis elit placerat, eget scelerisque tellus tristique. Aenean et tellus et magna efficitur rhoncus. Nunc iaculis mi sit amet dui tempor interdum. Vestibulum condimentum, nulla nec molestie faucibus, nibh purus dictum diam, in lobortis est dolor et mauris. Ut luctus finibus quam, sed sagittis lorem mollis utLorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis sollicitudin lorem, viverra ultrices dolor maximus nec. Fusce semper ligula sed ornare facilisis. Fusce ligula dolor, feugiat rhoncus placerat eget, semper ut lectus. Mauris rutrum pulvinar eros, eu laoreet eros eleifend id. Aliquam erat volutpat. Nulla eu velit tortor. Donec placerat quam ante, id congue velit tempus sit amet. In hac habitasse platea dictumst. Curabitur nec mi sit amet urna feugiat sollicitudin suscipit in ante. Ut laoreet mauris quis elit placerat, eget scelerisque tellus tristique. Aenean et tellus et magna efficitur rhoncus. Nunc iaculis mi sit amet dui tempor interdum. Vestibulum condimentum, nulla nec molestie faucibus, nibh purus dictum diam, in lobortis est dolor et mauris. Ut luctus finibus quam, sed sagittis lorem mollis ut"
		this.profileData.style.overflow = "auto";
		this.profileData.style.marginBottom = "15%";
		this.profileData.style.height = "75%";
		this.profileData.style.width = "70%";
        this.mainDiv.appendChild(this.profileData);

		this.bottomDiv = document.createElement("div");
		this.bottomDiv.style.display = "flex";
		this.bottomDiv.style.justifyContent = "space-around";
		this.bottomDiv.style.width = "100%";
		this.mainDiv.appendChild(this.bottomDiv)
		// create btn to save changes applied to the other fields
		this.applyButton = document.createElement("button");
		this.applyButton.innerHTML = "Apply Changes";
		this.applyButton.style.fontSize = "15px";
		this.bottomDiv.appendChild(this.applyButton);
		// create btn to link to Search MVC
		this.searchButton = document.createElement("button");
		this.searchButton.innerHTML = "Search";
		this.searchButton.style.fontSize = "15px";
		this.bottomDiv.appendChild(this.searchButton);



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
		this.lougoutHandler = e => this.lougoutClick(e);
		this.logoutButton.addEventListener("click", 	this.lougoutHandler);

		this.searchHandler = e => this.searchClick(e);
		this.searchButton.addEventListener("click", 	this.searchHandler);
		
		this.applyHandler = e => this.applyClick(e);
		this.applyButton.addEventListener("click", 		this.applyHandler);

		this.menuHandler = e => this.menuClick(e);
		this.menuButton.addEventListener("click", 		this.menuHandler);

		this.changeNameHandler = e => this.changeNameClick(e);
		this.nameButton.addEventListener("click", 		this.changeNameHandler);
	}

	removeListeners() {
		this.logoutButton.removeEventListener("click", 	this.logoutHandler);
		this.searchButton.removeEventListener("click", 	this.searchHandler);
		this.applyButton.removeEventListener("click", 	this.applyHandler);
		this.menuButton.removeEventListener("click", 	this.menuHandler);
		this.nameButton.removeEventListener("click", 	this.changeNameHandler);

	}
	/* ------- Calling the Controller of this MVC ------------------------- */
	lougoutClick(event){
		this.mvc.controller.logoutClicked();	// link to the disconect part of the controller

	}
	searchClick(event){
		this.mvc.controller.searchClicked();	// link for the search part of the controller

	}
	applyClick(event) {
		console.log("apply");					// link to the apply part of the controller

	}
	menuClick(event) {
		// reminder : this.mvc.controller.ioBtnWasClicked("io parameters"); // dispatch
		this.mvc.controller.menuClicked();		// link to the menu part of the controller

	}
	changeNameClick(event){
		this.mvc.controller.nameBtnClicked();    // link to the controller
	}
	/* -------------------------------------------------------------------- */
	
	editableName(data){
		this.profileName.contentEditable = "true";
	}

	update(data) {
		/*while(this.table.firstChild) this.table.removeChild(this.table.firstChild); // empty table
		data.forEach(el => { // loop data
			let line = document.createElement("tr"); // create line
			Object.keys(el).forEach(key => { // loop object keys
				let cell = document.createElement("td"); // create cell
				cell.innerHTML = el[key]; // display
				line.appendChild(cell); // add cell
			});
			this.table.appendChild(line); // add line
		});*/
		console.log("useless data");
	}

}

class ProfileController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}
	async searchClicked(params){
		trace("search btn click", params);
		this.mvc.view.destroy();						// destroy current view
		this.mvc.app.mvc = this.mvc.app.mvcTest;		// change current mvc to search MVC
		this.mvc.app.mvcTest.view.attach(document.body);// attach view of search MVC
		this.mvc.app.mvcTest.view.activate();			// activate user interface of search MVC
	}
	async logoutClicked(params) {
		trace("logout btn click", params);
		this.mvc.view.destroy(); 						 // destroy current view
		this.mvc.app.mvc = this.mvc.app.mvcTest;		 // change current MVC to the target MVC : authenticate
		this.mvc.app.mvcTest.view.attach(document.body); // attach view of authenticate MVC
		this.mvc.app.mvcTest.view.activate(); 			 // activate user interface of authenticate MVC
	}
	async menuClicked(params) {
		trace("menu btn click", params);
		this.mvc.view.destroy(); 						 // destroy current view
		this.mvc.app.mvc = this.mvc.app.mvcTest;		 // change current MVC to the target MVC : menu
		this.mvc.app.mvcTest.view.attach(document.body); // attach view of menu MVC
		this.mvc.app.mvcTest.view.activate(); 			 // activate user interface of menu MVC
	}
	async nameBtnClicked (params){
		this.mvc.view.editableName();
	}

}