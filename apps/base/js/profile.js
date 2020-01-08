class ProfileModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}

	async getProfile(){
		trace("get session id");
		let result = await Comm.get("getProfileFromSessionId/"+this.mvc.app.authenticationMVC.model.sessionId);
		trace(result);
		this.id = result.response.return.id;
		return result.response.return;
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
		//this.nameDiv.style.marginTop = "15%";
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
		this.profileData.setAttribute("class","profil");

		// fill profile data with fields :

			// Mail
			this.mailDiv = document.createElement("div");
			this.mailLabel = document.createElement("h4");
			this.mailLabel.setAttribute("class","profil-label");
			this.mailLabel.innerHTML = "E-mail : ";
			this.mailDiv.appendChild(this.mailLabel);
			this.mail = document.createElement("div");
			this.mail.setAttribute("class","profil-element");
			this.mailDiv.appendChild(this.mail);
			this.profileData.appendChild(this.mailDiv);

			// bio
			this.bioDiv = document.createElement("div");
			this.bioLabel = document.createElement("h4");
			this.bioLabel.setAttribute("class","profil-label");
			this.bioLabel.innerHTML = "Bio : ";
			this.bioDiv.appendChild(this.bioLabel);
			this.bio = document.createElement("div");
			this.bio.setAttribute("class","profil-element");
			this.bioDiv.appendChild(this.bio);
			this.profileData.appendChild(this.bioDiv);

			// Gender
			this.genderDiv = document.createElement("div");
			this.genderLabel = document.createElement("h4");
			this.genderLabel.setAttribute("class","profil-label");
			this.genderLabel.innerHTML = "Gender : ";
			this.genderDiv.appendChild(this.genderLabel);
			this.gender = document.createElement("div");
			this.gender.setAttribute("class","profil-element");
			this.genderDiv.appendChild(this.gender);
			this.profileData.appendChild(this.genderDiv);

			// Year (brith year)
			this.ageDiv = document.createElement("div");
			this.ageLabel = document.createElement("h4");
			this.ageLabel.setAttribute("class","profil-label");
			this.ageLabel.innerHTML = "Age : ";
			this.ageDiv.appendChild(this.ageLabel);
			this.age = document.createElement("div");
			this.age.setAttribute("class","profil-element");
			this.ageDiv.appendChild(this.age);
			this.profileData.appendChild(this.ageDiv);

			// Reg
			this.regionDiv = document.createElement("div");
			this.regionLabel = document.createElement("h4");
			this.regionLabel.setAttribute("class","profil-label");
			this.regionLabel.innerHTML = "Region : ";
			this.regionDiv.appendChild(this.regionLabel);
			this.region = document.createElement("div");
			this.region.setAttribute("class","profil-element");
			this.regionDiv.appendChild(this.region);
			this.profileData.appendChild(this.regionDiv);

			// Country
			this.countryDiv = document.createElement("div");
			this.countryLabel = document.createElement("h4");
			this.countryLabel.setAttribute("class","profil-label");
			this.countryLabel.innerHTML = "Country : ";
			this.countryDiv.appendChild(this.countryLabel);
			this.country = document.createElement("div");
			this.country.setAttribute("class","profil-element");
			this.countryDiv.appendChild(this.country);
			this.profileData.appendChild(this.countryDiv);

			// Lang
			this.languagesDiv = document.createElement("div");
			this.languagesLabel = document.createElement("h4");
			this.languagesLabel.setAttribute("class","profil-label");
			this.languagesLabel.innerHTML = "Languages : ";
			this.languagesDiv.appendChild(this.languagesLabel);
			this.languages = document.createElement("div");
			this.languages.setAttribute("class","profil-element");
			this.languagesDiv.appendChild(this.languages);
			this.profileData.appendChild(this.languagesDiv);

			//games
			this.gamesDiv = document.createElement("div");
			this.gamesLabel = document.createElement("h4");
			this.gamesLabel.setAttribute("class","profil-label");
			this.gamesLabel.innerHTML = "Games : ";
			this.gamesDiv.appendChild(this.gamesLabel);
			this.games = document.createElement("div");
			this.games.setAttribute("class","profil-element");
			this.gamesDiv.appendChild(this.games);
			this.profileData.appendChild(this.gamesDiv);

			// vocals
			this.vocalsDiv = document.createElement("div");
			this.vocalsLabel = document.createElement("h4");
			this.vocalsLabel.setAttribute("class","profil-label");
			this.vocalsLabel.innerHTML = "Vocals : ";
			this.vocalsDiv.appendChild(this.vocalsLabel);
			this.vocals = document.createElement("div");
			this.vocals.setAttribute("class","profil-element");
			this.vocalsDiv.appendChild(this.vocals);
			this.profileData.appendChild(this.vocalsDiv);

			// old password
			this.oldPswDiv = document.createElement("div");
			this.oldPswLabel = document.createElement("h4");
			this.oldPswLabel.setAttribute("class","profil-label");
			this.oldPswLabel.innerHTML = "Old Password :";
			this.oldPswDiv.appendChild(this.oldPswLabel);
			this.oldPsw = document.createElement("input");
			this.oldPsw.setAttribute("type","password");
			this.oldPsw.setAttribute("class","profil-element");
			this.oldPswDiv.appendChild(this.oldPsw);
			this.profileData.appendChild(this.oldPswDiv);

			// new password
			this.newPswDiv = document.createElement("div");
			this.newPswLabel = document.createElement("h4");
			this.newPswLabel.setAttribute("class","profil-label");
			this.newPswLabel.innerHTML = "New Password :";
			this.newPswDiv.appendChild(this.newPswLabel);
			this.newPsw = document.createElement("input");
			this.newPsw.setAttribute("type","password");
			this.newPsw.setAttribute("class","profil-element");
			this.newPswDiv.appendChild(this.newPsw);
			this.profileData.appendChild(this.newPswDiv);

			// conf password
			this.confPswDiv = document.createElement("div");
			this.confPswLabel = document.createElement("h4");
			this.confPswLabel.setAttribute("class","profil-label");
			this.confPswLabel.innerHTML = "Confirm New Password :";
			this.confPswDiv.appendChild(this.confPswLabel);
			this.confPsw = document.createElement("input");
			this.confPsw.setAttribute("type","password");
			this.confPsw.setAttribute("class","profil-element");
			this.confPswDiv.appendChild(this.confPsw);
			this.profileData.appendChild(this.confPswDiv);

    this.mainDiv.appendChild(this.profileData);

		this.footer = document.createElement("div");
		this.footer.setAttribute("class", "footer");
			//button for change profil infos
			this.changeBtn = document.createElement("button");
			this.changeBtn.innerHTML = "Apply Changes";
			this.footer.appendChild(this.changeBtn);

			//button for search
			this.searchBtn = document.createElement("button");
			this.searchBtn.innerHTML = "Search";
			this.footer.appendChild(this.searchBtn);

		this.mainDiv.appendChild(this.footer);

	}

	attach(parent){
		super.attach(parent);
		trace("init profile");
		this.mvc.controller.initProfil();
	}

	// activate UI
	activate() {
		//this.mvc.controller.grabRegions();
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
		this.searchBtn.addEventListener("click", 	this.searchHandler);

		this.applyHandler = e => this.applyClick(e);
		this.changeBtn.addEventListener("click", 		this.applyHandler);

		this.menuHandler = e => this.menuClick(e);
		this.menuButton.addEventListener("click", 		this.menuHandler);
	}

	removeListeners() {
		this.logoutButton.removeEventListener("click", 	this.logoutHandler);
		this.searchBtn.removeEventListener("click", 	this.searchHandler);
		this.changeBtn.removeEventListener("click", 	this.applyHandler);
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

	updateProfil(data) {
		console.log(data);
		let languagesDisplay = "";
		let vocalsDisplay = "";
		data.languages.forEach(e => languagesDisplay += e+", ");
		data.vocals.forEach(e => vocalsDisplay += e+", ");

		this.profileName.innerHTML = data.username;
		this.mail.innerHTML = data.mail;
		this.bio.innerHTML = data.bio;
		this.gender.innerHTML = data.gender;
		this.age.innerHTML = new Date().getFullYear() - data.year;
		this.region.innerHTML = data.region;
		this.country.innerHTML = data.country;
		this.languages.innerHTML = languagesDisplay.slice(0, -2);
		this.games.innerHTML = data.games;
		this.vocals.innerHTML = vocalsDisplay.slice(0, -2);
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
		this.mvc.app.mvcTest.view.attach(document.body);// attach view of search MVC
		this.mvc.app.mvcTest.view.activate();			// activate user interface of search MVC
	}
	async logoutClicked(params) {
		trace("logout btn click", params);
		this.mvc.view.destroy(); 						 // destroy current view
		this.mvc.app.authenticationMVC.view.attach(document.body); // attach view of authenticate MVC
		this.mvc.app.authenticationMVC.view.activate(); 			 // activate user interface of authenticate MVC
	}
	async menuClicked(params) {
		trace("menu btn click", params);
		this.mvc.view.destroy(); 						 // destroy current view
		this.mvc.app.mvcTest.view.attach(document.body); // attach view of menu MVC
		this.mvc.app.mvcTest.view.activate(); 			 // activate user interface of menu MVC
	}

	async initProfil(){
		this.mvc.view.updateProfil(await this.mvc.model.getProfile());
	}

}
