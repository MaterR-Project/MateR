class RegistrationModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

		// load Regions
		let regionsResult = await Comm.get("getRegionsFromDatabase"); // call server method to get regions
		this.regions = regionsResult.response.return;

		// load Languages
		let languagesResult = await Comm.get("getLanguagesFromDatabase"); // call server method to get languages
		this.languages = languagesResult.response.return;

		// load Game Names
		let gameNamesReturn = await Comm.get("getGameNamesFromDatabase"); // call server method to get games names
		this.gameNames = gameNamesReturn.response.return;

		// load Playstyles
		let playstylesReturn = await Comm.get("getPlaystylesFromDatabase"); // call server method to get playstyles
		this.playstyles = playstylesReturn.response.return;

		// load Levels
		let levelsReturn = await Comm.get("getLevelsFromDatabase"); // call server method to get levels
		this.levels = levelsReturn.response.return;

		// load Vocals
		let vocalsReturn = await Comm.get("getVocalsFromDatabase"); // call server method to get vocals
		this.vocals = vocalsReturn.response.return;


	}

	loadRegions(){
		return this.regions;
	}

	loadLanguages(){
		trace(this.languges)
		return this.languages;
	}

	loadGameNames(){
		trace(this.gameNames)
		return this.gameNames;
	}

	loadPlaystyles(){
		trace(this.playstyles)
		return this.playstyles;
	}

	loadLevels(){
		trace(this.levels)
		return this.levels;
	}

	loadVocals(){
		trace(this.vocals)
		return this.vocals;
	}

	async loadCountries(pos){
		let arg = this.regions[pos].split(" ").join("/");
		let result = await Comm.get("getRegionCountriesFromRegionName/"+arg); // call server method to get country list
		return result.response.return;
	}

	async loadGamePlatforms(gameName){
		let arg = gameName.split(" ").join("/");
		let result = await Comm.get("getGamePlatformsFromGameName/"+arg); // call server method to get platform list
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
		this.materLogo.style.margin = "10px"
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
		this.mailLabel.innerHTML = "E-Mail* :";
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
		this.usernameLabel.innerHTML = "Username* :";
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
		this.passwordLabel.innerHTML = "Password* :";
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
		this.confirmPasswordLabel.innerHTML = "Confirm Password* :";
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
		this.undefinedGender.value = "-1";
		this.undefinedGender.appendChild (document.createTextNode("Gamer 8-)"));
		this.maleGender = document.createElement("option");
		this.maleGender.value = "0";
		this.maleGender.appendChild (document.createTextNode("Male"));
		this.femaleGender = document.createElement("option");
		this.femaleGender.value = "1";
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
		this.regionsLabel.innerHTML = "Region* :";
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
		this.countDiv.style.display = "none";
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
		this.langLabel.innerHTML = "Languages* :";
		this.comboLanguages = document.createElement("select");
		this.comboLanguages.setAttribute("multiple", "multiple");
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
		this.gamesLabel.style.display = "flex";
		//this.gamesLabel.style.justifyContent = "space-between";
		//this.gamesDiv.style.height = "15%";
		//this.gamesLabel.style.flexDirection = "row";
		this.gamesLabel.style.margin = "2%";
		this.gamesLabel.innerHTML = "Games* :";
		this.gamesAddField = document.createElement("div");
		this.gamesAddField.style.marginBottom = "2%";

		this.firstGameDiv = document.createElement("div");
		this.firstGameDiv.style.display = "flex";
		this.firstGameDiv.style.flexDirection = "column";
		this.firstGameDiv.style.marginBottom = "3px";

		this.firstGameName = document.createElement("span");
		this.firstGameName.innerHTML = "Name* :";
		this.firstGameName.style.fontSize = "small";
		this.firstComboGames = document.createElement("select");
		this.firstComboGames.setAttribute("name", "games");

		this.firstGamePlatform = document.createElement("span");
		this.firstGamePlatform.innerHTML = "Platform* :";
		this.firstGamePlatform.style.marginTop = "6px";
		this.firstGamePlatform.style.fontSize = "small";
		this.firstGamePlatform.style.display = "none";
		this.firstComboPlatforms = document.createElement("select");
		this.firstComboPlatforms.setAttribute("name", "platforms");
		this.firstComboPlatforms.style.display = "none";

		this.firstGamePlaystyles = document.createElement("span");
		this.firstGamePlaystyles.innerHTML = "Playstyles* :";
		this.firstGamePlaystyles.style.marginTop = "6px";
		this.firstGamePlaystyles.style.fontSize = "small";
		this.firstGamePlaystyles.style.display = "none";
		this.firstComboPlaystyles = document.createElement("select");
		this.firstComboPlaystyles.setAttribute("name", "playstyles");
		this.firstComboPlaystyles.setAttribute("multiple", "multiple");
		this.firstComboPlaystyles.style.display = "none";

		this.firstGameLevel = document.createElement("span");
		this.firstGameLevel.innerHTML = "My Level* :";
		this.firstGameLevel.style.marginTop = "6px";
		this.firstGameLevel.style.fontSize = "small";
		this.firstGameLevel.style.display = "none";
		this.firstComboLevels = document.createElement("select");
		this.firstComboLevels.setAttribute("name", "levels");
		this.firstComboLevels.style.display = "none";

		this.firstHr = document.createElement("hr");

		this.firstGameDiv.appendChild(this.firstGameName);
		this.firstGameDiv.appendChild(this.firstComboGames);
		this.firstGameDiv.appendChild(this.firstGamePlatform);
		this.firstGameDiv.appendChild(this.firstComboPlatforms);
		this.firstGameDiv.appendChild(this.firstGamePlaystyles);
		this.firstGameDiv.appendChild(this.firstComboPlaystyles);
		this.firstGameDiv.appendChild(this.firstGameLevel);
		this.firstGameDiv.appendChild(this.firstComboLevels);
		this.firstGameDiv.appendChild(this.firstHr);
		this.gamesAddField.appendChild(this.firstGameDiv);

		this.addGameButton = document.createElement("button");
		this.addGameButton.innerHTML = "New Game Entry";

		this.gamesDiv.appendChild(this.gamesLabel);
		this.gamesDiv.appendChild(this.gamesAddField);
		this.gamesDiv.appendChild(this.addGameButton);
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
		this.comboVocals.setAttribute("multiple", "multiple");
		this.vocalsDiv.appendChild(this.vocalsLabel);
		this.vocalsDiv.appendChild(this.comboVocals);
		this.profileData.appendChild(this.vocalsDiv);

  	this.mainDiv.appendChild(this.profileData);

		// create account button
		this.navButton = document.createElement("button");
		this.navButton.innerHTML = "Create Account";
		this.navButton.style.fontSize = "15px";
		this.navButton.style.marginTop = "15px"
		this.navButton.style.marginBottom = "15px"
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

		this.addGameButtonHandler = e => this.addGameButtonClick(e);
		this.addGameButton.addEventListener("click", this.addGameButtonHandler);

		this.gamesAddFieldHandle = e => {
			//trace(parent);
			trace(e,"\n\n BONJOUR !!!!!!!!!!!!!!!!!!");

			trace (e.target.value);
			//if (e.target.name == "games") this.gameComboChoice(e.path[1].childNodes, e.target.value);
			//if (e.target.name == "platforms") this.platformComboChoice(e.path[1].childNodes[2]);
			//if (e.target.name == "playstyles") this.playstyleComboChoice(e.path[1].childNodes[3]);
		}
		[...this.gamesAddField.childNodes].map((child, index) => {
			trace("le child :\n",child);
			//child.addEventListener("change", this.gamesAddFieldHandle);
			child.addEventListener("change", e => {
				trace(child.parentElement);
				trace(this.gamesAddField.childNodes[index]);
				//trace(child.parentNode.childNode[0])
				if (e.target.name == "games") this.gameComboChoice(this.gamesAddField.childNodes[index].childNodes, e.target.value);
			});
		});



		// Handle Country combo on region choice
		this.regionHandler = e => {
			trace(e);
			// Display combo country
			this.countDiv.style.display = "flex";
			this.regionsComboChoice(this.comboRegions.selectedIndex);
		};
		this.comboRegions.addEventListener("change", this.regionHandler);
	}

	removeListeners() {
		this.navButton.removeEventListener("click", this.navBtnHandler);

		this.addGameButton.removeEventListener("click", this.addGameButtonHandler);

		[...this.gamesAddField.childNodes].map(child => {
			trace("le suppr :\n",child);
			child.removeEventListener("change", this.gamesAddFieldHandle);
		});

		this.comboRegions.removeEventListener("change", this.regionHandler);
	}

	refreshListeners(){
		this.removeListeners();
		this.addListeners();
	}

	navBtnClick(event) {
		this.mvc.controller.navBtnWasClicked("go test parameters"); // dispatch
	}

	addGameButtonClick(event){
		this.mvc.controller.addGameButtonWasClicked();
	}

	gameComboChoice(gameAddFieldArray, gameName){
		this.mvc.controller.gameComboWasChoosed(gameAddFieldArray, gameName);
	}

	platformComboChoice(playstyleCombo){
		this.mvc.controller.platformComboWasChoosed(playstyleCombo);
	}

	playstyleComboChoice(levelCombo){
		this.mvc.controller.playstyleComboWasChoosed(levelCombo);
	}

	regionsComboChoice(pos){
		this.mvc.controller.regionsComboWasChoosed(pos);
	}

	updateComboWithList(combo, data) {
		// Remove all children of countries combobox
		trace("la combo !!!!!\n\n", combo);
		[...combo.childNodes].map(child => {combo.removeChild(child)});

		//
		if(combo == this.comboCountries){
			let optionEmpty = document.createElement("option");
			optionEmpty.value = -1;
			optionEmpty.text = "Undefined";
			combo.appendChild(optionEmpty);
		}
		data.map(element => {
			let option = document.createElement("option");
			option.text = element;
			option.value = element;// data.indexOf(element);
			combo.appendChild(option);
		});
		if(combo == this.comboCountries){
			combo.selectedIndex = 0;
		}
		else{
			combo.selectedIndex = -1;
		}
	}

	addNewGameField(data){
		let newGameDiv = document.createElement("div");
		newGameDiv.style.display = "flex";
		newGameDiv.style.flexDirection = "column";
		newGameDiv.style.marginBottom = "3px";

		let newGameName = document.createElement("span");
		newGameName.innerHTML = "Name :";
		newGameName.style.fontSize = "small";
		let newComboGames = document.createElement("select");
		newComboGames.setAttribute("name", "games");

		let newGamePlatform = document.createElement("span");
		newGamePlatform.innerHTML = "Platform :";
		newGamePlatform.style.marginTop = "6px";
		newGamePlatform.style.fontSize = "small";
		newGamePlatform.style.display = "none";
		let newComboPlatforms = document.createElement("select");
		newComboPlatforms.setAttribute("name", "platforms");
		newComboPlatforms.style.display = "none";

		let newGamePlaystyles = document.createElement("span");
		newGamePlaystyles.innerHTML = "Playstyles :";
		newGamePlaystyles.style.marginTop = "6px";
		newGamePlaystyles.style.fontSize = "small";
		newGamePlaystyles.style.display = "none";
		let newComboPlaystyles = document.createElement("select");
		newComboPlaystyles.setAttribute("name", "playstyles");
		newComboPlaystyles.setAttribute("multiple", "multiple");
		newComboPlaystyles.style.display = "none";

		let newGameLevel = document.createElement("span");
		newGameLevel.innerHTML = "My Level :";
		newGameLevel.style.marginTop = "6px";
		newGameLevel.style.fontSize = "small";
		newGameLevel.style.display = "none";
		let newComboLevels = document.createElement("select");
		newComboLevels.setAttribute("name", "levels");
		newComboLevels.style.display = "none";

		let newHr = document.createElement("hr");

		this.updateComboWithList(newComboGames, data);

		newGameDiv.appendChild(newGameName);
		newGameDiv.appendChild(newComboGames);
		newGameDiv.appendChild(newGamePlatform);
		newGameDiv.appendChild(newComboPlatforms);
		newGameDiv.appendChild(newGamePlaystyles);
		newGameDiv.appendChild(newComboPlaystyles);
		newGameDiv.appendChild(newGameLevel);
		newGameDiv.appendChild(newComboLevels);
		newGameDiv.appendChild(newHr);
		this.gamesAddField.appendChild(newGameDiv);

		// refresh Listeners
		this.refreshListeners();
	}

	displayAllCombosOfGameField(gameAddFieldArray){
		gameAddFieldArray.forEach(combo => {combo.style.display = "";})
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
		this.mvc.view.updateComboWithList(this.mvc.view.comboLanguages, this.mvc.model.loadLanguages());
		this.mvc.view.updateComboWithList(this.mvc.view.firstComboGames, this.mvc.model.loadGameNames());
		this.mvc.view.updateComboWithList(this.mvc.view.comboVocals, this.mvc.model.loadVocals());

	}

	async regionsComboWasChoosed(pos){
		this.mvc.view.updateComboWithList(this.mvc.view.comboCountries, await this.mvc.model.loadCountries(pos));
	}

	addGameButtonWasClicked(){
		this.mvc.view.addNewGameField(this.mvc.model.loadGameNames());
	}

	async gameComboWasChoosed(gameAddFieldArray, gameName){
		trace(gameAddFieldArray,"unfeddfjhdfhdjh")
		this.mvc.view.updateComboWithList(gameAddFieldArray[3], await this.mvc.model.loadGamePlatforms(gameName));
		this.mvc.view.updateComboWithList(gameAddFieldArray[5], this.mvc.model.loadPlaystyles());
		this.mvc.view.updateComboWithList(gameAddFieldArray[7], this.mvc.model.loadLevels());
		this.mvc.view.displayAllCombosOfGameField(gameAddFieldArray);
		//platformsCombo.style.display = "";
	}

	platformComboWasChoosed(playstyleCombo){
		this.mvc.view.updateComboWithList(playstyleCombo, this.mvc.model.loadPlaystyles());
		playstyleCombo.style.display = "";
	}

	playstyleComboWasChoosed(levelCombo){
		this.mvc.view.updateComboWithList(levelCombo, this.mvc.model.loadLevels());
		levelCombo.style.display = "";
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