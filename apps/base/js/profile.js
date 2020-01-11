class ProfileModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}

	async getProfile(){
		//trace("get session id");
		let result = await Comm.get("getProfileFromSessionId/"+this.mvc.app.authenticationMVC.model.sessionId);

		this.id = result.response.return.id;

		if (this.id == undefined){
			this.mvc.view.stage.innerHTML = "";
			document.cookie = "ssid=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			//alert("Invalid Cookie - You'll need to reconnect");
    	location.reload();
		}
		trace(this.id, result.response.return);
		return result.response.return;
	}

	async dummyRequest(){
		//let data = {OriginId : "0", Game :"Apex Legends", Level : "Pro Player", Playstyle : "Try Hard", Country : "France", Region: "Western Europe", Languages: ["French", "English", "Arabic"], Age : "25", Genre : "", Vocals : ["Discord", "Skype"]}
		let data = {
			"originId" : ["0", "suppr"],
			"game": ["Apex Legends", "suppr"],
			"platform": ["Windows", "suppr"],
			"level": ["Pro Player", "4"],
			"playstyle": [["Try Hard"], "2"],
			"region" : ["Northern America", "4"],
			"pays" : ["Canada", "4"],
			"languages": [["French", "English"], "4"],
			"vocals": [["Discord", "Skype"], "-1"],
			"genre": ["Male", "-1"],
			"age": ["34", "-1"]
		  }
		let result = await Comm.post("getMatchingProfiles/", data);
		trace(result.response.return);
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
		this.topBtnDiv.style.justifyContent = "space-between";
		this.topBtnDiv.style.width ="100%";
		// create search btn to open the conversation slide tab
		this.menuButton = document.createElement("span");
		this.menuButton.setAttribute("class", "icon-Menu");
		this.menuButton.style.fontSize = "45px";
		this.menuButton.style.marginLeft="10px";
		this.topBtnDiv.appendChild(this.menuButton);
		// create disconnect btn
		this.logoutButton = document.createElement("span");
		this.logoutButton.setAttribute("class", "icon-disconnect");
		//this.logoutButton.innerHTML = "Disconnect";
		this.logoutButton.style.fontSize = "45px";
		this.logoutButton.style.marginRight="10px";
		this.topBtnDiv.appendChild(this.logoutButton);

		// header
		this.header = document.createElement("div");
			// create search btn to open the conversation slide tab

			// create disconnect btn
		this.mainDiv.appendChild(this.header);

		// profile name
		this.profileName = document.createElement("h1");
		this.profileName.innerHTML = "My Name";
		this.profileName.style.fontSize = "40px";
		this.profileName.setAttribute("class","profil- name");

		this.mainDiv.appendChild(this.profileName);

		this.profileData = document.createElement("div");
		this.profileData.setAttribute("class","profil");

		// fill profile data with fields :

			// Mail
			this.mailDiv = document.createElement("div");
			this.mailLabel = document.createElement("h4");
			//this.mailLabel.style.display = "flex";
			//this.mailLabel.style.justifyContent = "space-between";
			this.mailIcon = this.mvc.app.getElementIcon("icon-Mail", "auto");
			this.mailIcon.style.marginRight = "5px";
			this.mailLabel.appendChild(this.mailIcon);
			this.mailLabel.append(" E-mail :");
			this.mailLabel.setAttribute("class","profil-label");
			this.mailLabel.style.alignSelf = "flex-start";

			this.mailDiv.appendChild(this.mailLabel);
			this.mail = document.createElement("div");
			this.mail.setAttribute("class","profil-element");
			this.mail.style.alignSelf = "center";
			this.mailDiv.appendChild(this.mail);
			this.profileData.appendChild(this.mailDiv);

			// bio
			this.bioDiv = document.createElement("div");
			this.bioLabel = document.createElement("h4");
			this.bioLabel.setAttribute("class","profil-label");
			this.bioIcon = this.mvc.app.getElementIcon("icon-Bio", "auto");
			this.bioIcon.style.marginRight = "5px";
			this.bioLabel.appendChild(this.bioIcon);
			this.bioLabel.append(" Bio : ");
			this.bioDiv.appendChild(this.bioLabel);
			this.bio = document.createElement("div");
			this.bio.setAttribute("class","profil-element");
			this.bio.style.alignSelf = "center";
			this.bioDiv.appendChild(this.bio);
			this.profileData.appendChild(this.bioDiv);

			// Gender
			this.genderDiv = document.createElement("div");
			this.genderLabel = document.createElement("h4");
			this.genderLabel.setAttribute("class","profil-label");
			this.genderIcon = this.mvc.app.getElementIcon("icon-Gender", "auto");
			this.genderIcon.style.marginRight = "5px";
			this.genderLabel.appendChild(this.genderIcon);
			this.genderLabel.append(" Gender : ");
			this.genderDiv.appendChild(this.genderLabel);
			this.gender = document.createElement("div");
			this.gender.setAttribute("class","profil-element");
			this.gender.style.alignSelf = "center";
			this.genderDiv.appendChild(this.gender);
			this.profileData.appendChild(this.genderDiv);

			// Year (brith year)
			this.ageDiv = document.createElement("div");
			this.ageLabel = document.createElement("h4");
			this.ageLabel.setAttribute("class","profil-label");
			this.ageIcon = this.mvc.app.getElementIcon("icon-Year", "auto");
			this.ageIcon.style.marginRight = "5px";
			this.ageLabel.appendChild(this.ageIcon);
			this.ageLabel.append(" Age : ");
			this.ageDiv.appendChild(this.ageLabel);
			this.age = document.createElement("div");
			this.age.setAttribute("class","profil-element");
			this.age.style.alignSelf = "center";
			this.ageDiv.appendChild(this.age);
			this.profileData.appendChild(this.ageDiv);

			// Reg
			this.regionDiv = document.createElement("div");
			this.regionLabel = document.createElement("h4");
			this.regionLabel.setAttribute("class","profil-label");
			this.regionIcon = this.mvc.app.getElementIcon("icon-Region", "auto");
			this.regionIcon.style.marginRight = "5px";
			this.regionLabel.appendChild(this.regionIcon);
			this.regionLabel.append(" Region : ");
			this.regionDiv.appendChild(this.regionLabel);
			this.region = document.createElement("div");
			this.region.setAttribute("class","profil-element");
			this.region.style.alignSelf = "center";
			this.regionDiv.appendChild(this.region);
			this.profileData.appendChild(this.regionDiv);

			// Country
			this.countryDiv = document.createElement("div");
			this.countryLabel = document.createElement("h4");
			this.countryLabel.setAttribute("class","profil-label");
			this.countryIcon = this.mvc.app.getElementIcon("icon-Country", "auto");
			this.countryIcon.style.marginRight = "5px";
			this.countryLabel.appendChild(this.countryIcon);
			this.countryLabel.append(" Country : ");
			this.countryDiv.appendChild(this.countryLabel);
			this.country = document.createElement("div");
			this.country.setAttribute("class","profil-element");
			this.country.style.alignSelf = "center";
			this.countryDiv.appendChild(this.country);
			this.profileData.appendChild(this.countryDiv);

			// Lang
			this.languagesDiv = document.createElement("div");
			this.languagesLabel = document.createElement("h4");
			this.languagesLabel.setAttribute("class","profil-label");
			this.languagesIcon = this.mvc.app.getElementIcon("icon-bubble", "auto");
			this.languagesIcon.style.marginRight = "5px";
			this.languagesLabel.appendChild(this.languagesIcon);
			this.languagesLabel.append(" Languages : ");
			this.languagesDiv.appendChild(this.languagesLabel);
			this.languages = document.createElement("div");
			this.languages.setAttribute("class","profil-element");
			this.languages.style.alignSelf = "center";
			this.languagesDiv.appendChild(this.languages);
			this.profileData.appendChild(this.languagesDiv);

			//games
			this.gamesDiv = document.createElement("div");
			this.gamesLabel = document.createElement("h4");
			this.gamesLabel.setAttribute("class","profil-label");
			this.gamesIcon = this.mvc.app.getElementIcon("icon-Games", "auto");
			this.gamesIcon.style.marginRight = "5px";
			this.gamesLabel.appendChild(this.gamesIcon);
			this.gamesLabel.append(" Games : ");
			this.gamesDiv.appendChild(this.gamesLabel);
			this.games = document.createElement("div");
			this.games.setAttribute("class","profil-element");
			this.games.style.alignSelf = "center";
			this.gamesDiv.appendChild(this.games);
			this.profileData.appendChild(this.gamesDiv);

			// vocals
			this.vocalsDiv = document.createElement("div");
			this.vocalsLabel = document.createElement("h4");
			this.vocalsLabel.setAttribute("class","profil-label");
			this.vocalsIcon = this.mvc.app.getElementIcon("icon-Vocal", "auto");
			this.vocalsIcon.style.marginRight = "5px";
			this.vocalsLabel.appendChild(this.vocalsIcon);
			this.vocalsLabel.append(" Vocals : ");
			this.vocalsDiv.appendChild(this.vocalsLabel);
			this.vocals = document.createElement("div");
			this.vocals.setAttribute("class","profil-element");
			this.vocals.style.alignSelf = "center";
			this.vocalsDiv.appendChild(this.vocals);
			this.profileData.appendChild(this.vocalsDiv);

			// old password
			this.oldPswDiv = document.createElement("div");
			this.oldPswLabel = document.createElement("h4");
			this.oldPswLabel.setAttribute("class","profil-label");
			this.oldPswIcon = this.mvc.app.getElementIcon("icon-Password", "auto");
			this.oldPswIcon.style.marginRight = "5px";
			this.oldPswLabel.appendChild(this.oldPswIcon);
			this.oldPswLabel.append(" Current Password :");
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
			this.newPswIcon = this.mvc.app.getElementIcon("icon-Password", "auto");
			this.newPswIcon.style.marginRight = "5px";
			this.newPswLabel.appendChild(this.newPswIcon);
			this.newPswLabel.append(" New Password :");
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
			this.confPswIcon = this.mvc.app.getElementIcon("icon-Password", "auto");
			this.confPswIcon.style.marginRight = "5px";
			this.confPswLabel.appendChild(this.confPswIcon);
			this.confPswLabel.append(" Confirm New Password :");
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
			this.changeBtn = document.createElement("span");
			this.changeBtn.setAttribute("class", "icon-checkmark-no-changes");
			this.changeBtn.style.fontSize = "45px";
			this.changeBtn.style.marginLeft="10px";
			//this.changeBtn.innerHTML = "Apply Changes";
			this.footer.appendChild(this.changeBtn);

			//button for search
			this.searchBtn = document.createElement("span");
			this.searchBtn.setAttribute("class", "icon-Search");
			this.searchBtn.style.fontSize = "45px";
			this.searchBtn.style.marginRight="10px";
			//this.searchBtn.innerHTML = "Search";
			this.footer.appendChild(this.searchBtn);

		this.mainDiv.appendChild(this.footer);

	}

	attach(parent){
		super.attach(parent);
		trace("init profile");
		this.mvc.controller.initProfile();
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
		this.logoutHandler = e => this.logoutClick(e);
		this.logoutButton.addEventListener("click", 	this.logoutHandler);

		this.searchHandler = e => this.searchClick(e);
		this.searchBtn.addEventListener("click", 	this.searchHandler);

		this.applyHandler = e => this.applyClick(e);
		this.changeBtn.addEventListener("click", 		this.applyHandler);

		this.menuHandler = e => this.menuClick(e);
		this.menuButton.addEventListener("click", 		this.menuHandler);
	}

	removeListeners() {
		trace("remove profile")
		this.logoutButton.removeEventListener("click", 	this.logoutHandler);
		this.searchBtn.removeEventListener("click", 	this.searchHandler);
		this.changeBtn.removeEventListener("click", 	this.applyHandler);
		this.menuButton.removeEventListener("click", 	this.menuHandler);

	}
	/* ------- Calling the Controller of this MVC ------------------------- */
	logoutClick(event){
		this.mvc.controller.logoutClicked();	// link to the disconect part of the controller

	}
	searchClick(event){
		this.mvc.controller.searchClicked();
	}
	applyClick(event) {
		console.log("apply");					// link to the apply part of the controller

	}
	menuClick(event) {
		this.mvc.controller.menuClicked();		// link to the menu part of the controller
	}
	/* -------------------------------------------------------------------- */

	updateProfile(data) {
		//console.log(data);
		this.mail.innerHTML = data.mail;
		this.profileName.innerHTML = data.username;
		this.mail.innerHTML = data.mail;
		this.bio.innerHTML = data.bio;
		this.gender.innerHTML = data.gender;
		if (data.year != -1){
			this.age.innerHTML = new Date().getFullYear() - data.year;
		}else{ this.age.innerHTML = "Undefined";}
		this.region.innerHTML = data.region;
		this.country.innerHTML = data.country;
		this.languages.innerHTML = data.languages.join(', ');

		this.games.innerHTML = "";
		data.games.forEach( game => this.addGameToDisplay(game));

		this.vocals.innerHTML = "";
		data.vocals.forEach((e, _, vocals) => {
			let div = document.createElement("div");
			div.style.display = "flex";
			div.style.flexDirection = "row";
			let icon = this.mvc.app.getElementIcon("icon-"+e, "auto");
			icon.style.marginLeft = "5px";
			icon.style.marginRight = "5px";
			div.appendChild(icon);
			if (e == vocals[vocals.length-1]) {
				div.append(e);
			}else div.append(e+", ");
			this.vocals.appendChild(div);
		});

	}

	addGameToDisplay(game){

		trace(game);

		// game div
		let gameDiv = document.createElement("div");
			gameDiv.setAttribute("class","game");

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
		this.games.appendChild(gameDiv);
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
		trace(await this.mvc.model.dummyRequest());
		//this.mvc.view.deactivate();
		//trace("search btn click", params);
		//this.mvc.view.destroy();						// destroy current view
		//this.mvc.app.searchMVC.view.attach(document.body);// attach view of search MVC
		//this.mvc.app.searchMVC.view.activate();			// activate user interface of search MVC
	}

	logoutClicked(params) {
		trace("logout btn click", params);
		//this.mvc.app.io.disconnect();
		this.mvc.app.io.emit('logout', this.mvc.app.authenticationMVC.model.sessionId);
		this.mvc.app.authenticationMVC.model.sessionId = undefined;
		//trace(this.mvc.app.authenticationMVC.model.sessionId);
		this.mvc.view.deactivate();
		//this.mvc.view.deleteProfile();
		document.cookie = "ssid=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		this.mvc.view.destroy(); 						 // destroy current view
		this.mvc.app.authenticationMVC.view.attach(document.body); // attach view of authenticate MVC
		this.mvc.app.authenticationMVC.view.activate(); 			 // activate user interface of authenticate MVC
	}

	menuClicked() {
		trace("menu btn click");
		this.mvc.view.deactivate();
		//this.mvc.view.deleteProfile();
		this.mvc.view.destroy(); 						 // destroy current view
		this.mvc.app.menuMVC.view.attach(document.body); // attach view of menu MVC
		this.mvc.app.menuMVC.view.activate(); 			 // activate user interface of menu MVC
	}

	async initProfile(){
		this.mvc.view.updateProfile(await this.mvc.model.getProfile());
	}

}
