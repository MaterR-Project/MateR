class RegistrationModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

		// load Regions
		let result = await Comm.get("getRegionsFromDatabase"); // call server hello method with argument "everyone"
		this.regions = result.response.return;



	}

	loadRegions(){
		trace(this.regions)
		return this.regions;
	}

	async loadCountries(pos){
		trace(pos)
		trace(this.regions[pos]);
		let arg = this.regions[pos].split(" ").join("/");
		let result = await Comm.get("getRegionCountriesFromRegionName/"+arg); // call server hello method with argument "everyone"
		return result.response.return;
	}

}

class RegistrationView extends View {

	constructor() {
		super();
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);


		//
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
		this.mainDiv.style.width = "100%";
		this.mainDiv.style.height = "100%";
		this.mainDiv.style.flexDirection = "column";
		this.stage.appendChild(this.mainDiv);

		// MateR Title
		this.materLogo = document.createElement("h1");
		this.materLogo.innerHTML = "MateR";
		this.materLogo.style.marginTop = "3%"
		this.materLogo.style.fontSize = "60px";
		this.mainDiv.appendChild(this.materLogo);

		// get screen height and width
		let sizeWidth = window.screen.width;

		this.profileData = document.createElement("div");
		this.profileData.style.fontSize = "20px";
		this.profileData.style.overflow = "auto";
		//this.profileData.style.marginBottom = "15%";
		//this.profileData.style.height = "75%";
		// set the scroll box height depending on device resolution
		//this.profileData.style.width = "70%";
		if (sizeWidth > 1200) {
			  this.profileData.style.width = "80%";
			  this.profileData.style.height = "100%";
			  this.mainDiv.style.height = "100%";
		}
		else if (sizeWidth > 992) {
			this.profileData.style.width = "55%";
		}
		else if (sizeWidth > 768){
			this.profileData.style.width = "60%";
		}
		// fill profile data with fields :

		// ask mail
		this.mailDiv =document.createElement("div");
		this.mailDiv.style.display = "flex";
		this.mailDiv.style.flexDirection = "column";
		this.mailDiv.style.alignItems = "center";
		this.mailDiv.style.marginBottom = "3%";
		this.mailLabel = document.createElement("span");
		this.mailLabel.style.margin = "2%";
		this.mailLabel.innerHTML = "Mail :";
		this.mailInput = document.createElement("input");
		this.mailDiv.appendChild(this.mailLabel);
		this.mailDiv.appendChild(this.mailInput);
		this.profileData.appendChild(this.mailDiv);

		// ask username
		this.usernameDiv =document.createElement("div");
		this.usernameDiv.style.display = "flex";
		this.usernameDiv.style.flexDirection = "column";
		//this.usernameDiv.style.height = "35%";
		this.usernameDiv.style.alignItems = "center";
		this.usernameDiv.style.marginBottom = "3%";
		//this.usernameDiv.style.justifyContent ="space-between";
		this.usernameLabel = document.createElement("span");
		this.usernameLabel.style.margin = "2%";
		this.usernameLabel.innerHTML = "Username :";
		this.usernameInput = document.createElement("input");
		this.usernameDiv.appendChild(this.usernameLabel);
		this.usernameDiv.appendChild(this.usernameInput);
		this.profileData.appendChild(this.usernameDiv);
		// new password
		this.passwordDiv =document.createElement("div");
		this.passwordDiv.style.display = "flex";
		//this.passwordDiv.style.height = "35%";
		this.passwordDiv.style.flexDirection = "column";
		this.passwordDiv.style.alignItems = "center";
		this.passwordDiv.style.marginBottom = "3%";
		//this.passwordDiv.style.justifyContent ="space-between";
		this.passwordLabel = document.createElement("span");
		this.passwordLabel.style.margin = "2%";
		this.passwordLabel.innerHTML = "Password :";
		this.passwordInput = document.createElement("input");
		this.passwordInput.type ="password";
		this.passwordDiv.appendChild(this.passwordLabel);
		this.passwordDiv.appendChild(this.passwordInput);
		this.profileData.appendChild(this.passwordDiv);
		// new password confirmation
		this.confirmPasswordDiv =document.createElement("div");
		this.confirmPasswordDiv.style.display = "flex";
		//this.confirmPasswordDiv.style.height = "35%";
		this.confirmPasswordDiv.style.flexDirection = "column";
		this.confirmPasswordDiv.style.alignItems = "center";
		this.confirmPasswordDiv.style.marginBottom = "3%";
		//this.confirmPasswordDiv.style.justifyContent ="space-between";
		this.confirmPasswordLabel = document.createElement("span");
		this.confirmPasswordLabel.style.margin = "2%";
		this.confirmPasswordLabel.innerHTML = "Confirm password :";
		this.confirmPasswordInput = document.createElement("input");
		this.confirmPasswordInput.type ="password";
		this.confirmPasswordDiv.appendChild(this.confirmPasswordLabel);
		this.confirmPasswordDiv.appendChild(this.confirmPasswordInput);
		this.profileData.appendChild(this.confirmPasswordDiv);

		// bio section
		this.bioDiv = document.createElement("div");
		this.bioDiv.style.display = "flex";
		//this.bioDiv.style.height = "15%";
		this.bioDiv.style.flexDirection = "column";
		this.bioDiv.style.alignItems = "center";
		this.bioDiv.style.marginBottom = "3%";
		//this.bioDiv.style.justifyContent = "space-between";
		this.bioLabel = document.createElement("span");
		this.bioLabel.style.margin = "2%";
		this.bioLabel.innerHTML ="Bio :";
		this.bioDiv.appendChild(this.bioLabel);
		this.bioInput = document.createElement("textarea");
		this.bioInput.style.width = "70%";
		this.bioInput.setAttribute("rows","4");
		this.bioInput.setAttribute("cols","50");
		this.bioInput.setAttribute("maxlength","140");
		this.bioDiv.appendChild(this.bioInput);
		this.profileData.appendChild(this.bioDiv);

		// Gender section
		this.genderDiv = document.createElement("div");
		this.genderDiv.style.display = "flex";
		//this.genderDiv.style.height = "15%";
		this.genderDiv.style.flexDirection = "column";
		this.genderDiv.style.alignItems = "center";
		this.genderDiv.style.marginBottom = "3%";
		//this.genderDiv.style.justifyContent = "space-between";
		this.genderLabel = document.createElement("span");
		this.genderLabel.innerHTML = "Gender :";
		this.genderLabel.style.margin = "2%";
		this.comboGender = document.createElement("select");
		// add undefined male and female options
		this.undefinedGender = document.createElement("option");
		this.undefinedGender.value = "0";
		this.undefinedGender.appendChild (document.createTextNode("Gamer 8-)"));
		this.maleGender = document.createElement("option");
		this.maleGender.value = "1";
		this.maleGender.appendChild (document.createTextNode("Male"));
		this.femaleGender = document.createElement("option");
		this.femaleGender.value = "2";
		this.femaleGender.appendChild (document.createTextNode("Female"));
		this.comboGender.appendChild(this.undefinedGender);
		this.comboGender.appendChild(this.maleGender);
		this.comboGender.appendChild(this.femaleGender);
		this.genderDiv.appendChild(this.genderLabel);
		this.genderDiv.appendChild(this.comboGender);
		this.profileData.appendChild(this.genderDiv);

		// Year section (brith year)
		this.yearDiv = document.createElement("div");
		this.yearDiv.style.display = "flex";
		//this.yearDiv.style.height = "15%";
		this.yearDiv.style.flexDirection = "column";
		this.yearDiv.style.alignItems = "center";
		this.yearDiv.style.marginBottom = "3%";
		//this.yearDiv.style.justifyContent = "space-between";
		this.yearLabel = document.createElement("span");
		this.yearLabel.innerHTML = "Birth Year :";
		this.yearLabel.style.margin = "2%";
		this.comboYear = document.createElement("select");
		// add an entry for earch 120 year before now
		var currentYear = new Date().getFullYear()
		var option = "";
		for (var i = currentYear-120 ; i <= currentYear; i++) {
			var option = document.createElement("option");
			option.text = i;
			option.value = i;
			if (i == currentYear) option.setAttribute("selected", "");
			this.comboYear.appendChild(option);
		}
		this.yearDiv.appendChild(this.yearLabel);
		this.yearDiv.appendChild(this.comboYear);
		this.profileData.appendChild(this.yearDiv);

		// Regions section
		this.regionsDiv = document.createElement("div");
		this.regionsDiv.style.display = "flex";
		//this.regionsDiv.style.height = "15%";
		this.regionsDiv.style.flexDirection = "column";
		this.regionsDiv.style.alignItems = "center";
		this.regionsDiv.style.marginBottom = "3%";
		//this.regDiv.style.justifyContent = "space-between";
		this.regionsLabel = document.createElement("span");
		this.regionsLabel.style.margin = "2%";
		this.regionsLabel.innerHTML = "Region :";
		this.comboRegions = document.createElement("select");
		this.comboRegions.setAttribute("id", "regions");
		this.regionsDiv.appendChild(this.regionsLabel);
		this.regionsDiv.appendChild(this.comboRegions);
		this.profileData.appendChild(this.regionsDiv);

/*
		this.comboRegions.onchange = function(){
		  this.countDiv.style.display = (this.selectedIndex == 0) ? "block" : "none";
		}

*/

		// Country section
		this.countDiv = document.createElement("div");
		//this.countDiv.style.visibility = "hidden";
		this.countDiv.style.display = "flex";
		this.countDiv.setAttribute("id", "countries");
		//this.countDiv.style.height = "15%";
		this.countDiv.style.flexDirection = "column";
		this.countDiv.style.alignItems = "center";
		this.countDiv.style.marginBottom = "3%";
		//this.countDiv.style.justifyContent = "space-between";
		this.countryLabel = document.createElement("span");
		this.countryLabel.style.margin = "2%";
		this.countryLabel.innerHTML = "Country :";
		this.comboCountries = document.createElement("select");
		this.countDiv.appendChild(this.countryLabel);
		this.countDiv.appendChild(this.comboCountries);
		this.profileData.appendChild(this.countDiv);

		// Lang section
		this.langDiv = document.createElement("div");
		this.langDiv.style.display = "flex";
		//this.langDiv.style.height = "15%";
		this.langDiv.style.flexDirection = "column";
		this.langDiv.style.alignItems = "center";
		this.langDiv.style.marginBottom = "3%";
		//this.langDiv.style.justifyContent = "space-between";
		this.langLabel = document.createElement("span");
		this.langLabel.style.margin = "2%";
		this.langLabel.innerHTML = "Languages :";
		this.comboLanguages = document.createElement("select");
		this.langDiv.appendChild(this.langLabel);
		this.langDiv.appendChild(this.comboLanguages);
		this.profileData.appendChild(this.langDiv);

		//games section
		this.gamesDiv = document.createElement("div");
		this.gamesDiv.style.display = "flex";
		//this.gamesDiv.style.height = "15%";
		this.gamesDiv.style.flexDirection = "column";
		this.gamesDiv.style.alignItems = "center";
		this.gamesDiv.style.marginBottom = "3%";
		//this.gamesDiv.style.justifyContent = "space-between";
		this.gamesLabel = document.createElement("span");
		this.gamesLabel.style.margin = "2%";
		this.gamesLabel.innerHTML = "Games :";
		this.comboGames = document.createElement("select");
		this.comboGames.setAttribute("multiple", "multiple");

		var currentYear = new Date().getFullYear()
		var option = "";
		for (var i = 1 ; i < 6; i++) {
			var option = document.createElement("option");
			option.text = i;
			trace(i);
			option.value = i;
			//if (i == currentYear) option.setAttribute("selected", "");
			this.comboGames.appendChild(option);
		}
		this.gamesDiv.appendChild(this.gamesLabel);
		this.gamesDiv.appendChild(this.comboGames);
		this.profileData.appendChild(this.gamesDiv);

		// vocals section
		this.vocalsDiv = document.createElement("div");
		this.vocalsDiv.style.display = "flex";
		//this.vocalsDiv.style.height = "15%";
		this.vocalsDiv.style.flexDirection = "column";
		this.vocalsDiv.style.alignItems = "center";
		this.vocalsDiv.style.marginBottom = "3%";
		//this.vocalsDiv.style.justifyContent = "space-between";
		this.vocalsLabel = document.createElement("span");
		this.vocalsLabel.style.margin = "2%";
		this.vocalsLabel.innerHTML = "Vocals :";
		this.comboVocals = document.createElement("select");
		this.vocalsDiv.appendChild(this.vocalsLabel);
		this.vocalsDiv.appendChild(this.comboVocals);
		this.profileData.appendChild(this.vocalsDiv);

  	this.mainDiv.appendChild(this.profileData);

		// Account data fields
		this.text = document.createElement("p");
		this.text.innerHTML = "Lorem ipsum dolor sit amet,\n consectetur adipisci Sed"
		+" varius,\n enim congue sollicitudin aliquet, tellus mi volutpat justo, eu"
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh."
		+" condimentum nunc erat a lorem. Fusce posuere diam quis sapien sodales, in"
		+"dapibus \nlectus blandit. In rhoncus faucro t est, inteales mollis nibh.";
		this.text.style.overflow = "auto";
		//this.mainDiv.appendChild(this.text);

		// create account button
		this.navButton = document.createElement("button");
		this.navButton.innerHTML = "Create Account";
		this.navButton.style.fontSize = "15px";
		this.navButton.style.marginTop = "10%"
		this.navButton.style.marginBottom = "10%"
		this.mainDiv.appendChild(this.navButton);
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
		this.navBtnHandler = e => this.navBtnClick(e);
		this.navButton.addEventListener("click", this.navBtnHandler);

		this.regionHandler = e => {
			[...this.comboCountries.childNodes].map(child => {this.comboCountries.removeChild(child)});
			//while (this.comboCountries.firstChild) {
		  //  this.comboCountries.removeChild(this.comboCountries.firstChild);
		  //}
			this.regionsComboChoice(this.comboRegions.selectedIndex)
		};
		this.comboRegions.addEventListener("change", this.regionHandler);

		//document.getElementById("regions").onchange = function(){
		//  document.getElementById("countries").style.visibility = (this.comboRegions.selectedIndex == 1) ? "visible" : "hidden";
		//}
	}

	removeListeners() {
		this.navButton.removeEventListener("click", this.navBtnHandler);
	}

	navBtnClick(event) {
		this.mvc.controller.navBtnWasClicked("go test parameters"); // dispatch
	}

	regionsComboChoice(pos){
		this.mvc.controller.regionsComboWasChoosed(pos);
	}

	updateComboWithList(combo, data) {
		data.map(element => {
			let option = document.createElement("option");
			option.text = element;
			option.value = data.indexOf(element);
			combo.appendChild(option);
		});
		combo.selectedIndex = -1;
	}

}

class RegistrationControler extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

		// initialize selects with database values
		this.mvc.view.updateComboWithList(this.mvc.view.comboRegions, this.mvc.model.loadRegions());
		//this.mvc.view.updateComboWithList(this.mvc.view.comboCountries, this.mvc.model.loadCountries());
		//this.mvc.view.updateLanguagesCombo(this.mvc.model.loadLanguages());
		//this.mvc.view.updateGamesCombo(this.mvc.model.loadGames());
		//this.mvc.view.updateVocalsCombo(this.mvc.model.loadVocals());

	}

	async regionsComboWasChoosed(pos){
		this.mvc.view.updateComboWithList(this.mvc.view.comboCountries, await this.mvc.model.loadCountries(pos));
	}

	async navBtnWasClicked(params) {
		let test = await Comm.get("getProfileFromSessionId/1234");
		trace(test);
		trace("go test btn click", params);
		this.mvc.view.destroy();
		this.mvc.app.mvcTest.view.attach(document.body); // attach view
		this.mvc.app.mvcTest.view.activate(); // activate user interface
		this.mvc.app.mvc = this.mvc.app.mvcTest;
	}

}