class ProfileModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}

	async getProfile(){
		trace("get session id");
		let result = await Comm.get("getProfileFromSessionId/"+this.mvc.app.autenticationMVC.model.sessionId);
		trace(result);
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
/*
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
*/

		// fill profile data with fields :
			// bio
			this.bioDiv = document.createElement("div");
			this.bioLabel = document.createElement("h4");
			this.bioLabel.setAttribute("class","profil-label");
			this.bioLabel.innerHTML = "bio : ";
			this.bioDiv.appendChild(this.bioLabel);
			this.bio = document.createElement("div");
			this.bio.setAttribute("class","profil-element");
			this.bioDiv.appendChild(this.bio);
			this.profileData.appendChild(this.bioDiv);

			//games
			this.gamesDiv = document.createElement("div");
			this.gamesLabel = document.createElement("h4");
			this.gamesLabel.setAttribute("class","profil-label");
			this.gamesLabel.innerHTML = "games : ";
			this.gamesDiv.appendChild(this.gamesLabel);
			this.games = document.createElement("div");
			this.games.setAttribute("class","profil-element");
			this.gamesDiv.appendChild(this.games);
			this.profileData.appendChild(this.gamesDiv);

			// vocals
			this.vocalsDiv = document.createElement("div");
			this.vocalsLabel = document.createElement("h4");
			this.vocalsLabel.setAttribute("class","profil-label");
			this.vocalsLabel.innerHTML = "vocals : ";
			this.vocalsDiv.appendChild(this.vocalsLabel);
			this.vocals = document.createElement("div");
			this.vocals.setAttribute("class","profil-element");
			this.vocalsDiv.appendChild(this.vocals);
			this.profileData.appendChild(this.vocalsDiv);

			// Lang
			this.languagesDiv = document.createElement("div");
			this.languagesLabel = document.createElement("h4");
			this.languagesLabel.setAttribute("class","profil-label");
			this.languagesLabel.innerHTML = "languages : ";
			this.languagesDiv.appendChild(this.languagesLabel);
			this.languages = document.createElement("div");
			this.languages.setAttribute("class","profil-element");
			this.languagesDiv.appendChild(this.languages);
			this.profileData.appendChild(this.languagesDiv);

			// Reg
			this.regionDiv = document.createElement("div");
			this.regionLabel = document.createElement("h4");
			this.regionLabel.setAttribute("class","profil-label");
			this.regionLabel.innerHTML = "region : ";
			this.regionDiv.appendChild(this.regionLabel);
			this.region = document.createElement("div");
			this.region.setAttribute("class","profil-element");
			this.regionDiv.appendChild(this.region);
			this.profileData.appendChild(this.regionDiv);

			// Country
			this.countryDiv = document.createElement("div");
			this.countryLabel = document.createElement("h4");
			this.countryLabel.setAttribute("class","profil-label");
			this.countryLabel.innerHTML = "country : ";
			this.countryDiv.appendChild(this.countryLabel);
			this.country = document.createElement("div");
			this.country.setAttribute("class","profil-element");
			this.countryDiv.appendChild(this.country);
			this.profileData.appendChild(this.countryDiv);

			// Year (brith year)
			this.ageDiv = document.createElement("div");
			this.ageLabel = document.createElement("h4");
			this.ageLabel.setAttribute("class","profil-label");
			this.ageLabel.innerHTML = "age : ";
			this.ageDiv.appendChild(this.ageLabel);
			this.age = document.createElement("div");
			this.age.setAttribute("class","profil-element");
			this.ageDiv.appendChild(this.age);
			this.profileData.appendChild(this.ageDiv);

			// Gender
			this.genderDiv = document.createElement("div");
			this.genderLabel = document.createElement("h4");
			this.genderLabel.setAttribute("class","profil-label");
			this.genderLabel.innerHTML = "gender : ";
			this.genderDiv.appendChild(this.genderLabel);
			this.gender = document.createElement("div");
			this.gender.setAttribute("class","profil-element");
			this.genderDiv.appendChild(this.gender);
			this.profileData.appendChild(this.genderDiv);

			// Mail
			this.mailDiv = document.createElement("div");
			this.mailLabel = document.createElement("h4");
			this.mailLabel.setAttribute("class","profil-label");
			this.mailLabel.innerHTML = "mail : ";
			this.mailDiv.appendChild(this.mailLabel);
			this.mail = document.createElement("div");
			this.mail.setAttribute("class","profil-element");
			this.mailDiv.appendChild(this.mail);
			this.profileData.appendChild(this.mailDiv);

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

	// activate UI
	activate() {
		//this.mvc.controller.grabRegions();
		this.mvc.controller.initProfil();
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

	updateProfil(data) {
		console.log(data);
		this.profileName.innerHTML = data.username;
		this.bio.innerHTML = data.bio;
		this.games.innerHTML = data.games;

		this.vocals.innerHTML = data.vocals;
		this.languages.innerHTML = data.languages;
		this.region.innerHTML = data.region;
		this.country.innerHTML = data.country;
		this.age.innerHTML = new Date().getFullYear() - data.year;
		this.gender.innerHTML = data.gender;
		this.mail.innerHTML = data.mail;
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

	async initProfil(){
		this.mvc.view.updateProfil(await this.mvc.model.getProfile());
	}

}
