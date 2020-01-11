class SearchModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);
		let agesResult = await Comm.get("getAgesFromDatabase"); // call server method to get regions
		this.ages = agesResult.response.return;
	}

}

class SearchView extends View {

	constructor() {
		super();
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);

		this.comboPrioList = [];

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
		this.mainDiv.style.height = "100%";
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

		// MateR Title
		this.materLogo = document.createElement("h1");
		this.materLogo.innerHTML = "MateR";
		this.materLogo.style.margin = "10px";
		this.materLogo.style.fontSize = "60px";
		this.mainDiv.appendChild(this.materLogo);

		// form
		this.form = document.createElement("form");
		//this.form.style.overflow = "auto";
		this.form.style.display = "flex";
		this.form.style.alignItems = "center";
		//this.form.style.justifyContent = "stretch";
		this.form.style.alignContent = "stretch";
		//this.form.style.justifyContent = "center";
		this.form.style.flexDirection = "column";
		this.form.style.marginBottom = "15px";
		//this.form.style.top = "50px";
		this.form.style.width = "100%";
		this.form.style.height = "100%";
		//this.form = document.createElement("div");
		this.form.style.fontSize = "20px";
		this.mainDiv.appendChild(this.form);

		// Search Form Fields

		//games section
		this.gamesDiv = document.createElement("div");
		this.gamesDiv.style.display = "flex";
		//this.gamesDiv.style.height = "15%";
		//this.gamesDiv.style.height = "25%";
		this.gamesDiv.style.flexDirection = "column";
		this.gamesDiv.style.alignItems = "center";
		this.gamesDiv.style.marginBottom = "10px";
		this.form.appendChild(this.gamesDiv);

		this.gamesLabel = this.mvc.app.getElementIcon("icon-Games", "auto");
		this.gamesLabel.style.width = "100%";
		this.gamesLabel.style.display = "flex";
		this.gamesLabel.style.margin = "10px";
		this.gamesLabel.innerHTML = " ° Game :";
		this.gamesDiv.appendChild(this.gamesLabel);

		this.gameNames = document.createElement("span");
		this.gameNames.style.width = "100%";
		this.gameNames.innerHTML = "Name* :";
		this.gameNames.style.fontSize = "small";
		this.gamesDiv.appendChild(this.gameNames);

		this.comboName = document.createElement("select");
		this.comboName.setAttribute("name", "game");
		this.comboName.setAttribute("required", "");
		this.gamesDiv.appendChild(this.comboName);

		this.gamePlatform = document.createElement("span");
		this.gamePlatform.style.marginTop = "6px";
		this.gamePlatform.style.width = "100%";
		this.gamePlatform.innerHTML = "Platform* :";
		this.gamePlatform.style.fontSize = "small";
		this.gamesDiv.appendChild(this.gamePlatform);

		this.comboPlatform = document.createElement("select");
		this.comboPlatform.setAttribute("name", "platform");
		this.comboPlatform.setAttribute("required", "");
		this.gamesDiv.appendChild(this.comboPlatform);

		this.customSearchButton = document.createElement("button");
		this.customSearchButton.style.marginTop = "20px";
		this.customSearchButton.style.marginBottom = "10px";
		this.customSearchButton.setAttribute("type", "button");
		this.customSearchButton.innerHTML = "Custom Search Fields";
		this.gamesDiv.appendChild(this.customSearchButton);

		// Custom Search Fields
		this.customSearchField = document.createElement("div");
		this.customSearchField.style.overflow = "auto";
		this.customSearchField.style.height = "35%";
		this.customSearchField.style.width = "50%";
		this.customSearchField.style.visibility = "hidden";
		this.customSearchField.style.display = "flex";
		this.customSearchField.style.flexDirection = "column";
		this.customSearchField.style.alignItems = "center";
		this.customSearchField.style.marginBottom = "5px";
		this.form.appendChild(this.customSearchField);

		this.gameLevel = document.createElement("div");
		this.gameLevel.style.width = "100%";
		this.gameLevel.innerHTML = "Levels :";
		this.gameLevel.style.display = "flex";
		this.gameLevel.style.flexDirection = "column";
		this.gameLevel.style.marginTop = "6px";
		//this.gameLevel.style.fontSize = "small";
		//this.gameLevel.style.display = "none";
		this.customSearchField.appendChild(this.gameLevel);

		this.comboLevels = document.createElement("select");
		//this.comboLevels.size = "19";
		this.comboLevels.setAttribute("multiple", "multiple");
		this.comboLevels.setAttribute("name", "levels");
		//this.comboLevels.style.display = "none";
		this.gameLevel.appendChild(this.comboLevels);

		this.labelLevelPrio = document.createElement("span");
		this.labelLevelPrio.style.marginTop = "6px";
		this.labelLevelPrio.style.width = "100%";
		this.labelLevelPrio.innerHTML = "Priority :";
		this.labelLevelPrio.style.fontSize = "small";
		this.gameLevel.appendChild(this.labelLevelPrio);
		this.comboLevelsPrio = document.createElement("select");
		this.comboPrioList.push(this.comboLevelsPrio);
		this.comboLevelsPrio.setAttribute("name", "levelsPrio");
		this.gameLevel.appendChild(this.comboLevelsPrio);

		this.playstylesLabel = document.createElement("div");
		this.playstylesLabel.style.width = "100%";
		this.playstylesLabel.innerHTML = "Playstyles :";
		this.playstylesLabel.style.display = "flex";
		this.playstylesLabel.style.flexDirection = "column";
		this.playstylesLabel.style.marginTop = "10px";
		this.customSearchField.appendChild(this.playstylesLabel);
		//this.playstylesLabel.style.display = "none";
		this.comboPlaystyles = document.createElement("select");
		this.comboPlaystyles.setAttribute("name", "playstyles");
		this.comboPlaystyles.setAttribute("multiple", "multiple");
		this.playstylesLabel.appendChild(this.comboPlaystyles);

		this.labelPlaystylesPrio = document.createElement("span");
		this.labelPlaystylesPrio.style.marginTop = "6px";
		this.labelPlaystylesPrio.style.width = "100%";
		this.labelPlaystylesPrio.innerHTML = "Priority :";
		this.labelPlaystylesPrio.style.fontSize = "small";
		this.playstylesLabel.appendChild(this.labelPlaystylesPrio);
		this.comboPlaystylesPrio = document.createElement("select");
		this.comboPrioList.push(this.comboPlaystylesPrio);
		this.comboPlaystylesPrio.setAttribute("name", "playstylesPrio");
		this.playstylesLabel.appendChild(this.comboPlaystylesPrio);

		// Regions section
		this.regionsLabel = document.createElement("div");
		let icon = this.mvc.app.getElementIcon("icon-Region", "auto");
		this.regionsLabel.appendChild(icon);
		this.regionsLabel.style.width = "100%";
		this.regionsLabel.style.display = "flex";
		this.regionsLabel.style.flexDirection = "column";
		this.regionsLabel.style.marginTop = "15px";
		this.regionsLabel.style.marginBottom = "6px";
		icon.innerHTML = " Region :";
		this.customSearchField.appendChild(this.regionsLabel);

		this.comboRegions = document.createElement("select");
		this.comboRegions.style.marginTop = "6px";
		this.comboRegions.setAttribute("name", "regions");
		this.comboRegions.setAttribute("id", "regions");
		this.regionsLabel.appendChild(this.comboRegions);

		this.labelRegionsPrio = document.createElement("span");
		this.labelRegionsPrio.style.marginTop = "6px";
		this.labelRegionsPrio.style.width = "100%";
		this.labelRegionsPrio.innerHTML = "Priority :";
		this.labelRegionsPrio.style.fontSize = "small";
		this.regionsLabel.appendChild(this.labelRegionsPrio);
		this.comboRegionsPrio = document.createElement("select");
		this.comboPrioList.push(this.comboRegionsPrio);
		this.comboRegionsPrio.setAttribute("name", "regionsPrio");
		this.regionsLabel.appendChild(this.comboRegionsPrio);

		// Country section
		this.countriesLabel = document.createElement("div");
		icon = this.mvc.app.getElementIcon("icon-Country", "auto");
		this.countriesLabel.appendChild(icon);
		this.countriesLabel.style.width = "100%";
		this.countriesLabel.style.display = "flex";
		this.countriesLabel.style.flexDirection = "column";
		this.countriesLabel.style.marginTop = "15px";
		this.countriesLabel.style.marginBottom = "6px";
		icon.innerHTML = " Country :";
		this.customSearchField.appendChild(this.countriesLabel);

		this.comboCountries = document.createElement("select");
		this.comboCountries.style.marginTop = "6px";
		this.comboCountries.setAttribute("multiple", "multiple");
		this.comboCountries.setAttribute("name", "countries");
		this.countriesLabel.appendChild(this.comboCountries);

		this.labelCountriesPrio = document.createElement("span");
		this.labelCountriesPrio.style.marginTop = "6px";
		this.labelCountriesPrio.style.width = "100%";
		this.labelCountriesPrio.innerHTML = "Priority :";
		this.labelCountriesPrio.style.fontSize = "small";
		this.countriesLabel.appendChild(this.labelCountriesPrio);
		this.comboCountriesPrio = document.createElement("select");
		this.comboPrioList.push(this.comboCountriesPrio);
		this.comboCountriesPrio.setAttribute("name", "countriesPrio");
		this.countriesLabel.appendChild(this.comboCountriesPrio);

		this.langLabel = document.createElement("div");
		icon = this.mvc.app.getElementIcon("icon-bubble", "auto");
		this.langLabel.appendChild(icon);
		this.langLabel.style.width = "100%";
		this.langLabel.style.display = "flex";
		this.langLabel.style.flexDirection = "column";
		this.langLabel.style.marginTop = "15px";
		this.langLabel.style.marginBottom = "6px";
		icon.innerHTML = " Languages :";
		this.customSearchField.appendChild(this.langLabel);

		this.comboLanguages = document.createElement("select");
		this.comboLanguages.style.marginTop = "6px";
		this.comboLanguages.setAttribute("name", "languages");
		this.comboLanguages.setAttribute("multiple", "multiple");
		this.langLabel.appendChild(this.comboLanguages);

		this.labelLanguagesPrio = document.createElement("span");
		this.labelLanguagesPrio.style.marginTop = "6px";
		this.labelLanguagesPrio.style.width = "100%";
		this.labelLanguagesPrio.innerHTML = "Priority :";
		this.labelLanguagesPrio.style.fontSize = "small";
		this.langLabel.appendChild(this.labelLanguagesPrio);
		this.comboLanguagesPrio = document.createElement("select");
		this.comboPrioList.push(this.comboLanguagesPrio);
		this.comboLanguagesPrio.setAttribute("name", "languagesPrio");
		this.langLabel.appendChild(this.comboLanguagesPrio);

		this.vocalsLabel = document.createElement("div");
		icon = this.mvc.app.getElementIcon("icon-Vocal", "auto");
		this.vocalsLabel.appendChild(icon);
		this.vocalsLabel.style.width = "100%";
		this.vocalsLabel.style.display = "flex";
		this.vocalsLabel.style.flexDirection = "column";
		this.vocalsLabel.style.marginTop = "15px";
		this.vocalsLabel.style.marginBottom = "6px";
		icon.innerHTML = " Vocals :";
		this.customSearchField.appendChild(this.vocalsLabel);

		this.comboVocals = document.createElement("select");
		this.comboVocals.style.marginTop = "6px";
		this.comboVocals.setAttribute("name", "vocals");
		this.comboVocals.setAttribute("multiple", "multiple");
		this.vocalsLabel.appendChild(this.comboVocals);

		this.labelVocalsPrio = document.createElement("span");
		this.labelVocalsPrio.style.marginTop = "6px";
		this.labelVocalsPrio.style.width = "100%";
		this.labelVocalsPrio.innerHTML = "Priority :";
		this.labelVocalsPrio.style.fontSize = "small";
		this.vocalsLabel.appendChild(this.labelVocalsPrio);
		this.comboVocalsPrio = document.createElement("select");
		this.comboPrioList.push(this.comboVocalsPrio);
		this.comboVocalsPrio.setAttribute("name", "vocalsPrio");
		this.vocalsLabel.appendChild(this.comboVocalsPrio);

		this.genderLabel = document.createElement("div");
		icon = this.mvc.app.getElementIcon("icon-Gender", "auto");
		this.genderLabel.appendChild(icon);
		this.genderLabel.style.width = "100%";
		this.genderLabel.style.display = "flex";
		this.genderLabel.style.flexDirection = "column";
		this.genderLabel.style.marginTop = "15px";
		this.genderLabel.style.marginBottom = "6px";
		icon.innerHTML = " Gender :";
		this.customSearchField.appendChild(this.genderLabel);

		this.comboGender = document.createElement("select");
		this.comboGender.style.marginTop = "6px";
		this.comboGender.setAttribute("name", "gender");
		this.undefinedGender = document.createElement("option");
		this.undefinedGender.value = "Gamer";
		this.undefinedGender.appendChild (document.createTextNode("Gamer 8-)"));
		this.maleGender = document.createElement("option");
		this.maleGender.value = "Male";
		this.maleGender.appendChild (document.createTextNode("Male"));
		this.femaleGender = document.createElement("option");
		this.femaleGender.value = "Female";
		this.femaleGender.appendChild (document.createTextNode("Female"));
		this.comboGender.appendChild(this.undefinedGender);
		this.comboGender.appendChild(this.maleGender);
		this.comboGender.appendChild(this.femaleGender);
		this.comboGender.selectedIndex = -1;
		this.genderLabel.appendChild(this.comboGender);

		this.labelGenderPrio = document.createElement("span");
		this.labelGenderPrio.style.marginTop = "6px";
		this.labelGenderPrio.style.width = "100%";
		this.labelGenderPrio.innerHTML = "Priority :";
		this.labelGenderPrio.style.fontSize = "small";
		this.genderLabel.appendChild(this.labelGenderPrio);
		this.comboGenderPrio = document.createElement("select");
		this.comboPrioList.push(this.comboGenderPrio);
		this.comboGenderPrio.setAttribute("name", "genderPrio");
		this.genderLabel.appendChild(this.comboGenderPrio);

		this.ageLabel = document.createElement("div");
		icon = this.mvc.app.getElementIcon("icon-Year", "auto");
		this.ageLabel.appendChild(icon);
		this.ageLabel.style.width = "100%";
		this.ageLabel.style.display = "flex";
		this.ageLabel.style.flexDirection = "column";
		this.ageLabel.style.marginTop = "15px";
		this.ageLabel.style.marginBottom = "6px";
		icon.innerHTML = " Age Ranges :";
		this.customSearchField.appendChild(this.ageLabel);

		this.comboAge = document.createElement("select");
		this.comboAge.style.marginTop = "6px";
		this.comboAge.setAttribute("name", "age");
		this.comboAge.setAttribute("multiple", "multiple");
		this.ageLabel.appendChild(this.comboAge);

		this.labelAgePrio = document.createElement("span");
		this.labelAgePrio.style.marginTop = "6px";
		this.labelAgePrio.style.width = "100%";
		this.labelAgePrio.innerHTML = "Priority :";
		this.labelAgePrio.style.fontSize = "small";
		this.ageLabel.appendChild(this.labelAgePrio);
		this.comboAgePrio = document.createElement("select");
		this.comboPrioList.push(this.comboAgePrio);
		this.comboAgePrio.setAttribute("name", "agePrio");
		this.ageLabel.appendChild(this.comboAgePrio);


		// --------------------	Footer	-------------------------------

		this.footer = document.createElement("div");
		this.footer.style.height = "57px";
		//this.footer.style.alignSelf = "flex-end";
		this.footer.setAttribute("class", "footer");
		this.footer.style.justifyContent = "space-between";

		let tmpSpan = document.createElement("span");
		this.footer.appendChild(tmpSpan);

		//button for search
		this.searchBtn = document.createElement("button");
		this.searchBtn.setAttribute("type", "submit");
		this.searchBtn.setAttribute("class", "icon-Search");
		//this.searchBtn.style.alignSelf = "flex-end";
		this.searchBtn.style.backgroundColor = "#080808";
		this.searchBtn.style.color = "#999999";
		this.searchBtn.style.border = 0;
		this.searchBtn.style.fontSize = "45px";
		this.searchBtn.style.marginRight="10px";
		//this.searchBtn.innerHTML = "Search";
		this.footer.appendChild(this.searchBtn);

		this.form.appendChild(this.footer);

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

	// attach
	attach(parent){
		super.attach(parent);
		this.prioList = ["Very Low", "Low", "High", "Very High"];
		this.particularPrio = ["Custom"];
		//this.updategamePlatformWithGames(this.mvc.app.profileMVC.model.games);
		this.gamesPlaformsList = this.getGamesPlaformsList(this.mvc.app.profileMVC.model.games);
		this.updateComboWithList(this.comboName, this.gamesPlaformsList[0]);

		this.updateComboWithList(this.comboLevels, this.mvc.app.registrationMVC.model.levels);
		this.updateComboWithList(this.comboPlaystyles, this.mvc.app.registrationMVC.model.playstyles);
		this.updateComboWithList(this.comboRegions, this.mvc.app.registrationMVC.model.regions);
		this.updateComboWithList(this.comboLanguages, this.mvc.app.registrationMVC.model.languages);
		this.updateComboWithList(this.comboVocals, this.mvc.app.registrationMVC.model.vocals);
		this.updateComboWithList(this.comboAge, this.mvc.model.ages);
		this.comboPrioList.forEach(e => {
			if (e == this.comboPlaystylesPrio || e == this.comboGenderPrio){
				this.updateComboWithList(e, this.particularPrio);
			}else{
				this.updateComboWithList(e, this.prioList);
			}
		});

	}

	addListeners() {

		this.searchButtonHandler = e => {
			// prevent form action
			e.preventDefault();
			// I dit it My Way
	    this.searchButtonClick();
		}
		this.form.addEventListener("submit", this.searchButtonHandler);

		this.menuHandler = e => this.menuClick();
		this.menuButton.addEventListener("click", this.menuHandler);

		this.getGameSelectorHandler = e => this.displayPlatformsForGame();
		this.comboName.addEventListener("change", this.getGameSelectorHandler);

		this.displayCustomFields = e => this.customSearchButtonClick();
		this.customSearchButton.addEventListener("click", this.displayCustomFields);

		this.prioSelectorHandler = e => {
			trace(e)
			trace(e.target.previousSibling.previousSibling)
			this.prioRequiredHandler(e.target.selectedIndex, e.target.previousSibling.previousSibling)
		};
		this.comboPrioList.forEach((elem, index) => {
			//this.indexPrio = index;
			elem.addEventListener("change", this.prioSelectorHandler);
		});

		this.getRegionSelector = e => this.displayCountriesForRegions();
		this.comboRegions.addEventListener("change", this.getRegionSelector);

		this.searchHandler = e => this.searchClick();
		this.searchBtn.addEventListener("click", 	this.searchHandler);
	}

	removeListeners() {
		this.form.removeEventListener("submit", this.searchButtonHandler);

		this.menuButton.removeEventListener("click", 	this.menuHandler);

		this.comboName.removeEventListener("change", this.getGameSelectorHandler);

		this.comboPrioList.forEach(elem => {
			elem.removeEventListener("change", this.prioSelectorHandler);
		});

		this.comboRegions.removeEventListener("change", this.getRegionSelector);

		this.customSearchButton.removeEventListener("click", this.displayCustomFields);

		this.searchBtn.removeEventListener("click", 	this.searchHandler);
	}

	searchButtonClick(){
		const FD = new FormData(this.form);
		FD.append("originId", this.mvc.app.profileMVC.model.id)
		this.mvc.controller.searchButtonWasClicked(FD);
	}

	menuClick() {
		this.mvc.controller.menuClicked();		// link to the menu part of the controller
	}

	customSearchButtonClick(){
		//this.gamesDiv.removeChild(this.customSearchButton);
		if (this.customSearchField.style.visibility == "hidden"){
			this.customSearchField.style.visibility = "";
			//this.customSearchField.style.display = "flex";
		}
		else{
			this.customSearchField.style.visibility = "hidden";
			//this.customSearchField.style.display = "flex";
		}

	}

	prioRequiredHandler(index, elem){
		trace("selectedIndex : ", elem.selectedIndex)
		if(index != 0){
			elem.setAttribute("required", "");
			trace("add : ")//,this.comboPrioList, this.comboLevels, index)
		}else{
			elem.removeAttribute("required", "");
			trace("remove : ")//, this.comboPrioList, index)
		}
	}

	searchClick(){
		this.mvc.controller.searchButtonWasClicked();
	}

	getGamesPlaformsList(data) {
		let names = [];
		let platforms = [];
    data.map(element => {
        if (names.indexOf(element.name) != -1){
					platforms[names.indexOf(element.name)].push(element.platform);
				}else{
					names.push(element.name);
					platforms.push([element.platform]);
				}
    });
		return [names, platforms];
  }

	displayPlatformsForGame(){
		this.updateComboWithList(this.comboPlatform, this.gamesPlaformsList[1][this.comboName.selectedIndex]);
	}

	async displayCountriesForRegions(){
		trace("truc");
		//trace(arg);
		let arg = this.comboRegions.options[this.comboRegions.selectedIndex].value.split(" ").join("/");
		trace(arg);
		let result = await Comm.get("getRegionCountriesFromRegionName/"+arg); // call server method to get country list
		this.updateComboWithList(this.comboCountries, result.response.return);
	}

	updateComboWithList(combo, data) {
		// Remove all children of countries combobox
		[...combo.childNodes].map(child => {combo.removeChild(child)});

		let isPrio = false;
		if (this.comboPrioList.indexOf(combo) != -1) isPrio = true;
		let optionEmpty = document.createElement("option");
		if (isPrio){
			optionEmpty.value = "-1";
			optionEmpty.text = "Default";
		}
		if (this.comboPrioList.indexOf(combo) != -1){
			combo.appendChild(optionEmpty);
		}

		if (data != 404){
			data.map((element, index) => {
				let option = document.createElement("option");
				if (combo == this.comboAge){
					let nextAge = (data[index+1]-1);
					if (isNaN(nextAge)) nextAge = "+∞";
					option.text = element + " - " + nextAge;
					option.value = element;
				}else {
					if (isPrio){
						option.text = element;
						option.value = index+1;
					}else{
						option.text = element;
						option.value = element;// data.indexOf(element);
					}
				}
				combo.appendChild(option);
			});
		}
		if(this.comboPrioList.indexOf(combo) != -1){
			combo.selectedIndex = 0;
		}
		else{
			combo.selectedIndex = -1;
		}
	}

	quitViewUpdate(){
		this.updateComboWithList(this.comboPlatform, []);
		this.customSearchField.style.visibility = "hidden";
	}

}

class SearchController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}

	menuClicked() {
		trace("menu btn click");
		this.mvc.view.quitViewUpdate();
		this.mvc.view.deactivate();
		//this.mvc.view.deleteProfile();
		this.mvc.view.destroy(); 						 // destroy current view
		this.mvc.app.menuMVC.view.attach(document.body); // attach view of menu MVC
		this.mvc.app.menuMVC.view.activate(); 			 // activate user interface of menu MVC
	}

	async searchButtonWasClicked(FD){
		let result = await fetch('getMatchingProfiles/', {
		  method: 'POST',
		  body: FD
		});
		result["response"] = await result["json"]();

		if(result.response.return == 500){
			trace("error: "+result.response.message);
		}
		else {
			this.searchResults = result.response.return;
			//this.mvc.view.fillErrorDisplay(result.response.message);
			// Go to result
			trace("go to result");
			
			this.mvc.view.deactivate();
			this.mvc.view.destroy();
			//this.mvc.app.resultMVC.view.updateWrongPsw(result.response.message);
			this.mvc.app.resultMVC.view.attach(document.body); // attach view
			this.mvc.app.resultMVC.view.activate(); // activate result interface
			
		}
	}
}
