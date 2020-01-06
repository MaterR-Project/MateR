class ProfileModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}
	setSessionId(ssid){
		this.ssid = ssid;
		console.log(this.ssid);
	}
	async getRegions (){
		let request = "getRegionsFromDatabase";
		this.database = await Comm.get(request);
		return this.database.response.return;
	}
	async getProfileFromSsid(){
		// gets called by auth to get the profile of the guy who connected
		/* trace("get data2");
        // keep data in class variable ? refresh rate ?
        let result = await Comm.get("data2"); // calls method data2 from server passer le session id
		return result.response;  */
		//parse the response
		let request = "getProfileFromSessionId/"+this.ssid;
		this.profile = await Comm.get(request);
		return this.profile.response.return;
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
		this.mainDiv.style.width = "100%";
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
		this.profileName.contentEditable = "true";
		this.nameDiv.appendChild(this.profileName);

		// get screen height and width
		let sizeWidth = window.screen.width;

		this.profileData = document.createElement("div");
		this.profileData.style.fontSize = "20px";
		this.profileData.style.overflow = "auto";
		this.profileData.style.marginBottom = "15%";
		this.profileData.style.height = "75%";
		// set the scroll box height depending on device resolution
		this.profileData.style.width = "70%";
		if (sizeWidth > 1200) {
			  this.profileData.style.width = "45%";
			  this.profileData.style.height = "150%";
			  this.mainDiv.style.height = "100%";
		}
		else if (sizeWidth > 992) {
			this.profileData.style.width = "55%";
		}
		else if (sizeWidth > 768){
			this.profileData.style.width = "60%";
		}
		// fill profile data with fields :
			// bio section
			this.bioDiv = document.createElement("div");
			this.bioDiv.style.display = "flex";
			this.bioDiv.style.height = "15%";
			this.bioDiv.style.alignItems = "center";
			this.bioDiv.style.justifyContent = "space-between";
			this.bio = document.createElement("h4");
			this.bio.innerHTML ="Bio :";
			this.bioDiv.appendChild(this.bio);
			this.bioText = document.createElement("div");
			this.bioText.style.width = "70%";
			this.bioText.contentEditable = "true";
			this.bioText.innerHTML = "This is my bio";
			this.bioDiv.appendChild(this.bioText);
			this.profileData.appendChild(this.bioDiv);
			//games section
			this.gamesDiv = document.createElement("div");
			this.gamesDiv.style.display = "flex";
			this.gamesDiv.style.height = "15%";
			this.gamesDiv.style.alignItems = "center";
			this.gamesDiv.style.justifyContent = "space-between";
			this.games = document.createElement("h4");
			this.games.innerHTML = "Games :";
			this.comboGame = document.createElement("select");
			this.gamesDiv.appendChild(this.games);
			this.gamesDiv.appendChild(this.comboGame);
			this.profileData.appendChild(this.gamesDiv);
			// vocals section
			this.vocalsDiv = document.createElement("div");
			this.vocalsDiv.style.display = "flex";
			this.vocalsDiv.style.height = "15%";
			this.vocalsDiv.style.alignItems = "center";
			this.vocalsDiv.style.justifyContent = "space-between";
			this.vocals = document.createElement("h4");
			this.vocals.innerHTML = "Vocals :";
			this.comboVocals = document.createElement("select");
			this.vocalsDiv.appendChild(this.vocals);
			this.vocalsDiv.appendChild(this.comboVocals);
			this.profileData.appendChild(this.vocalsDiv);
			// Lang section
			this.langDiv = document.createElement("div");
			this.langDiv.style.display = "flex";
			this.langDiv.style.height = "15%";
			this.langDiv.style.alignItems = "center";
			this.langDiv.style.justifyContent = "space-between";
			this.lang = document.createElement("h4");
			this.lang.innerHTML = "Languages :";
			this.comboLang = document.createElement("select");
			this.langDiv.appendChild(this.lang);
			this.langDiv.appendChild(this.comboLang);
			this.profileData.appendChild(this.langDiv);
			// Reg section
			this.regDiv = document.createElement("div");
			this.regDiv.style.display = "flex";
			this.regDiv.style.height = "15%";
			this.regDiv.style.alignItems = "center";
			this.regDiv.style.justifyContent = "space-between";
			this.reg = document.createElement("h4");
			this.reg.innerHTML = "Region :";
			this.comboReg = document.createElement("select");
			this.regDiv.appendChild(this.reg);
			this.regDiv.appendChild(this.comboReg);
			this.profileData.appendChild(this.regDiv);
			// Country section
			this.countDiv = document.createElement("div");
			this.countDiv.style.display = "flex";
			this.countDiv.style.height = "15%";
			this.countDiv.style.alignItems = "center";
			this.countDiv.style.justifyContent = "space-between";
			this.country = document.createElement("h4");
			this.country.innerHTML = "Country :";
			this.comboCount = document.createElement("select");
			this.countDiv.appendChild(this.country);
			this.countDiv.appendChild(this.comboCount);
			this.profileData.appendChild(this.countDiv);
			// Year section (brith year)
			this.yearDiv = document.createElement("div");
			this.yearDiv.style.display = "flex";
			this.yearDiv.style.height = "15%";
			this.yearDiv.style.alignItems = "center";
			this.yearDiv.style.justifyContent = "space-between";
			this.year = document.createElement("h4");
			this.year.innerHTML = "Birth Year :";
			this.comboYear = document.createElement("select");
			// add an entry for earch 120 year before now
			var currentYear = new Date().getFullYear()
			var option = "";
			for (var i = currentYear-120 ; i <= currentYear; i++) {
				var option = document.createElement("option");
				option.text = i;
				option.value = i;
				this.comboYear.appendChild(option)
				
			}
			this.yearDiv.appendChild(this.year);
			this.yearDiv.appendChild(this.comboYear);
			this.profileData.appendChild(this.yearDiv);
			// Gender section
			this.genderDiv = document.createElement("div");
			this.genderDiv.style.display = "flex";
			this.genderDiv.style.height = "15%";
			this.genderDiv.style.alignItems = "center";
			this.genderDiv.style.justifyContent = "space-between";
			this.gender = document.createElement("h4");
			this.gender.innerHTML = "Gender :";
			this.comboGender = document.createElement("select");
			// add undefined male and female options
			this.undefinedGender = document.createElement("option");
			this.undefinedGender.value = "0";
			this.undefinedGender.appendChild (document.createTextNode("Gamer 8)"));
			this.maleGender = document.createElement("option");
			this.maleGender.value = "1";
			this.maleGender.appendChild (document.createTextNode("Male"));
			this.femaleGender = document.createElement("option");
			this.femaleGender.value = "2";
			this.femaleGender.appendChild (document.createTextNode("Female"));
			this.comboGender.appendChild(this.undefinedGender);
			this.comboGender.appendChild(this.maleGender);
			this.comboGender.appendChild(this.femaleGender);
			this.genderDiv.appendChild(this.gender);
			this.genderDiv.appendChild(this.comboGender);
			this.profileData.appendChild(this.genderDiv);
			// ask old password
			this.oldPwdDiv =document.createElement("div");
			this.oldPwdDiv.style.display = "flex";
			this.oldPwdDiv.style.height = "35%";
			this.oldPwdDiv.style.alignItems = "center";
			this.oldPwdDiv.style.justifyContent ="space-between";
			this.oldPwd = document.createElement("h4");
			this.oldPwd.innerHTML = "Input your old password :"
			this.oldPwdText = document.createElement("input");
			this.oldPwdText.type ="password";
			this.oldPwdDiv.appendChild(this.oldPwd);
			this.oldPwdDiv.appendChild(this.oldPwdText);
			this.profileData.appendChild(this.oldPwdDiv);
			// new password
			this.newPwdDiv1 =document.createElement("div");
			this.newPwdDiv1.style.display = "flex";
			this.newPwdDiv1.style.height = "35%";
			this.newPwdDiv1.style.alignItems = "center";
			this.newPwdDiv1.style.justifyContent ="space-between";
			this.newPwd1 = document.createElement("h4");
			this.newPwd1.innerHTML = "Input your new password :";
			this.newPwd1Text = document.createElement("input");
			this.newPwd1Text.type ="password";
			this.newPwdDiv1.appendChild(this.newPwd1);
			this.newPwdDiv1.appendChild(this.newPwd1Text);
			this.profileData.appendChild(this.newPwdDiv1);
			// new password confirmation
			this.newPwdDiv2 =document.createElement("div");
			this.newPwdDiv2.style.display = "flex";
			this.newPwdDiv2.style.height = "35%";
			this.newPwdDiv2.style.alignItems = "center";
			this.newPwdDiv2.style.justifyContent ="space-between";
			this.newPwd2 = document.createElement("h4");
			this.newPwd2.innerHTML = "Confirm your new password :";
			this.newPwd2Text = document.createElement("input");
			this.newPwd2Text.type ="password";
			this.newPwdDiv2.appendChild(this.newPwd2);
			this.newPwdDiv2.appendChild(this.newPwd2Text);
			this.profileData.appendChild(this.newPwdDiv2);
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

	attach(parent, ssid){
		this.mvc.controller.initProfile(ssid);
		super.attach(parent);
	}
	// activate UI
	activate() {
		// passer au modele le ssid
		this.mvc.controller.grabRegions();
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
	}

	removeListeners() {
		this.logoutButton.removeEventListener("click", 	this.logoutHandler);
		this.searchButton.removeEventListener("click", 	this.searchHandler);
		this.applyButton.removeEventListener("click", 	this.applyHandler);
		this.menuButton.removeEventListener("click", 	this.menuHandler);

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
		this.mvc.controller.menuClicked();		// link to the menu part of the controller

	}
	/* -------------------------------------------------------------------- */

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
    displayProfile(data){
		//display the profile
		this.bioText.innerHTML = data.bio;
	}
	createRgeionEntries(data){
		let inc = 0;
		let combo = this.comboReg;
		data.forEach(function(element){
			let entry = document.createElement("option");
			entry.value = inc;
			entry.text = element;
			combo.appendChild(entry);
			inc++;
		})
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
	async initProfile(ssid){
		this.mvc.model.setSessionId("123");
		this.mvc.view.displayProfile(await this.mvc.model.getProfileFromSsid());
	}
	async grabRegions(){
		this.mvc.view.createRgeionEntries(await this.mvc.model.getRegions());
	}
}