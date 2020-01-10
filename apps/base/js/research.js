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

		// MateR Title
		this.materLogo = document.createElement("h1");
		this.materLogo.innerHTML = "MateR";
		this.materLogo.style.margin = "10px";
		this.materLogo.style.fontSize = "60px";
		this.mainDiv.appendChild(this.materLogo);

		// form
		this.form = document.createElement("form");
		this.form.style.overflow = "auto";
		this.form.style.display = "flex";
		this.form.style.alignItems = "center";
		//this.form.style.justifyContent = "center";
		this.form.style.flexDirection = "column";
		this.form.style.marginBottom = "15px";
		//this.form.style.top = "50px";
		this.form.style.width = "100%"
		//this.form = document.createElement("div");
		this.form.style.fontSize = "20px";
		this.mainDiv.appendChild(this.form);

		// Search Form Fields

		//games section
		this.gamesDiv = document.createElement("div");
		this.gamesDiv.style.display = "flex";
		//this.gamesDiv.style.height = "15%";
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
		this.customSearchField.style.display = "none";
		this.customSearchField.style.flexDirection = "column";
		this.customSearchField.style.alignItems = "center";
		this.customSearchField.style.marginBottom = "5px";
		this.form.appendChild(this.customSearchField);

		this.gameLevel = document.createElement("span");
		this.gameLevel.style.width = "100%";
		this.gameLevel.innerHTML = "Levels :";
		this.gameLevel.style.marginTop = "6px";
		//this.gameLevel.style.fontSize = "small";
		//this.gameLevel.style.display = "none";
		this.customSearchField.appendChild(this.gameLevel);

		this.comboLevels = document.createElement("select");
		this.comboLevels.setAttribute("multiple", "multiple");
		this.comboLevels.setAttribute("name", "levels");
		//this.comboLevels.style.display = "none";
		this.customSearchField.appendChild(this.comboLevels);

		this.labelLevelPrio = document.createElement("span");
		this.labelLevelPrio.style.marginTop = "6px";
		this.labelLevelPrio.style.width = "100%";
		this.labelLevelPrio.innerHTML = "Priority :";
		this.labelLevelPrio.style.fontSize = "small";
		this.customSearchField.appendChild(this.labelLevelPrio);
		this.comboLevelsPrio = document.createElement("select");
		this.comboPrioList.push(this.comboLevelsPrio);
		this.comboLevelsPrio.setAttribute("name", "levelsPrio");
		this.customSearchField.appendChild(this.comboLevelsPrio);

		this.playstylesLabel = document.createElement("span");
		this.playstylesLabel.style.width = "100%";
		this.playstylesLabel.innerHTML = "Playstyles :";
		this.playstylesLabel.style.marginTop = "6px";
		this.customSearchField.appendChild(this.playstylesLabel);
		//this.playstylesLabel.style.display = "none";
		this.comboPlaystyles = document.createElement("select");
		this.comboPlaystyles.setAttribute("name", "playstyles");
		this.comboPlaystyles.setAttribute("multiple", "multiple");
		this.customSearchField.appendChild(this.comboPlaystyles);

		this.labelPlaystylesPrio = document.createElement("span");
		this.labelPlaystylesPrio.style.marginTop = "6px";
		this.labelPlaystylesPrio.style.width = "100%";
		this.labelPlaystylesPrio.innerHTML = "Priority :";
		this.labelPlaystylesPrio.style.fontSize = "small";
		this.customSearchField.appendChild(this.labelPlaystylesPrio);
		this.comboPlaystylesPrio = document.createElement("select");
		this.comboPrioList.push(this.comboPlaystylesPrio);
		this.comboPlaystylesPrio.setAttribute("name", "playstylesPrio");
		this.customSearchField.appendChild(this.comboPlaystylesPrio);

		// Regions section
		this.regionsLabel = this.mvc.app.getElementIcon("icon-Region", "auto");
		this.regionsLabel.style.width = "100%";
		this.regionsLabel.style.marginTop = "6px";
		this.regionsLabel.style.marginBottom = "6px";
		this.regionsLabel.innerHTML = " Region :";
		this.customSearchField.appendChild(this.regionsLabel);

		this.comboRegions = document.createElement("select");
		this.comboRegions.setAttribute("name", "region");
		this.comboRegions.setAttribute("id", "regions");
		this.customSearchField.appendChild(this.comboRegions);

		this.labelRegionsPrio = document.createElement("span");
		this.labelRegionsPrio.style.marginTop = "6px";
		this.labelRegionsPrio.style.width = "100%";
		this.labelRegionsPrio.innerHTML = "Priority :";
		this.labelRegionsPrio.style.fontSize = "small";
		this.customSearchField.appendChild(this.labelRegionsPrio);
		this.comboRegionsPrio = document.createElement("select");
		this.comboPrioList.push(this.comboRegionsPrio);
		this.comboRegionsPrio.setAttribute("name", "regionsPrio");
		this.customSearchField.appendChild(this.comboRegionsPrio);

		// Country section
		this.countriesLabel = this.mvc.app.getElementIcon("icon-Country", "auto");
		this.countriesLabel.style.width = "100%";
		this.countriesLabel.style.marginTop = "6px";
		this.countriesLabel.style.marginBottom = "6px";
		this.countriesLabel.innerHTML = " Countries :";
		this.customSearchField.appendChild(this.countriesLabel);

		this.comboCountries = document.createElement("select");
		this.comboCountries.setAttribute("multiple", "multiple");
		this.comboCountries.setAttribute("name", "countries");
		this.customSearchField.appendChild(this.comboCountries);

		this.labelCountriesPrio = document.createElement("span");
		this.labelCountriesPrio.style.marginTop = "6px";
		this.labelCountriesPrio.style.width = "100%";
		this.labelCountriesPrio.innerHTML = "Priority :";
		this.labelCountriesPrio.style.fontSize = "small";
		this.customSearchField.appendChild(this.labelCountriesPrio);
		this.comboCountriesPrio = document.createElement("select");
		this.comboPrioList.push(this.comboCountriesPrio);
		this.comboCountriesPrio.setAttribute("name", "countriesPrio");
		this.customSearchField.appendChild(this.comboCountriesPrio);

		this.langLabel = this.mvc.app.getElementIcon("icon-bubble", "auto");
		this.langLabel.style.width = "100%";
		this.langLabel.style.marginTop = "6px";
		this.langLabel.style.marginBottom = "6px";
		this.langLabel.innerHTML = " Languages :";
		this.customSearchField.appendChild(this.langLabel);

		this.comboLanguages = document.createElement("select");
		this.comboLanguages.setAttribute("name", "languages");
		this.comboLanguages.setAttribute("multiple", "multiple");
		this.customSearchField.appendChild(this.comboLanguages);

		this.labelLanguagesPrio = document.createElement("span");
		this.labelLanguagesPrio.style.marginTop = "6px";
		this.labelLanguagesPrio.style.width = "100%";
		this.labelLanguagesPrio.innerHTML = "Priority :";
		this.labelLanguagesPrio.style.fontSize = "small";
		this.customSearchField.appendChild(this.labelLanguagesPrio);
		this.comboLanguagesPrio = document.createElement("select");
		this.comboPrioList.push(this.comboLanguagesPrio);
		this.comboLanguagesPrio.setAttribute("name", "languagesPrio");
		this.customSearchField.appendChild(this.comboLanguagesPrio);

		this.vocalsLabel = this.mvc.app.getElementIcon("icon-Vocal", "auto");
		this.vocalsLabel.style.width = "100%";
		this.vocalsLabel.style.marginTop = "6px";
		this.vocalsLabel.style.marginBottom = "6px";
		this.vocalsLabel.innerHTML = " Vocals :";
		this.customSearchField.appendChild(this.vocalsLabel);

		this.comboVocals = document.createElement("select");
		this.comboVocals.setAttribute("name", "vocals");
		this.comboVocals.setAttribute("multiple", "multiple");
		this.customSearchField.appendChild(this.comboVocals);

		this.labelVocalsPrio = document.createElement("span");
		this.labelVocalsPrio.style.marginTop = "6px";
		this.labelVocalsPrio.style.width = "100%";
		this.labelVocalsPrio.innerHTML = "Priority :";
		this.labelVocalsPrio.style.fontSize = "small";
		this.customSearchField.appendChild(this.labelVocalsPrio);
		this.comboVocalsPrio = document.createElement("select");
		this.comboPrioList.push(this.comboVocalsPrio);
		this.comboVocalsPrio.setAttribute("name", "vocalsPrio");
		this.customSearchField.appendChild(this.comboVocalsPrio);

		this.ageLabel = this.mvc.app.getElementIcon("icon-Year", "auto");
		this.ageLabel.style.width = "100%";
		this.ageLabel.style.marginTop = "6px";
		this.ageLabel.style.marginBottom = "6px";
		this.ageLabel.innerHTML = " Age Ranges :";
		this.customSearchField.appendChild(this.ageLabel);

		this.comboAge = document.createElement("select");
		this.comboAge.setAttribute("name", "age");
		this.comboAge.setAttribute("multiple", "multiple");
		this.customSearchField.appendChild(this.comboAge);

		this.labelAgePrio = document.createElement("span");
		this.labelAgePrio.style.marginTop = "6px";
		this.labelAgePrio.style.width = "100%";
		this.labelAgePrio.innerHTML = "Priority :";
		this.labelAgePrio.style.fontSize = "small";
		this.customSearchField.appendChild(this.labelAgePrio);
		this.comboAgePrio = document.createElement("select");
		this.comboPrioList.push(this.comboAgePrio);
		this.comboAgePrio.setAttribute("name", "agePrio");
		this.customSearchField.appendChild(this.comboAgePrio);


		// --------------------	Footer	-------------------------------

		this.footer = document.createElement("div");
		this.footer.setAttribute("class", "footer");
		this.footer.style.justifyContent = "space-between";

		let tmpSpan = document.createElement("span");
		this.footer.appendChild(tmpSpan);

		//button for search
		this.searchBtn = document.createElement("button");
		this.searchBtn.setAttribute("type", "submit");
		this.searchBtn.setAttribute("class", "icon-Search");
		//this.searchBtn.style.alignSelf = "flex-end";
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
		this.prioList = ["Very Low", "Low", "Hight", "Very Hight"];
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
			this.updateComboWithList(e, this.prioList);
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

		this.prioSelectorHandler = (e) => {
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
			elem.removeEventListener("change", this.prioSelectorHandler());
		});

		this.comboRegions.removeEventListener("change", this.getRegionSelector);

		this.customSearchButton.removeEventListener("click", this.displayCustomFields);

		this.searchBtn.removeEventListener("click", 	this.searchHandler);
	}

	searchButtonClick(){
		const FD = new FormData(this.form);
		this.mvc.controller.searchButtonWasClicked(FD);
	}

	menuClick() {
		this.mvc.controller.menuClicked();		// link to the menu part of the controller
	}

	customSearchButtonClick(){
		this.gamesDiv.removeChild(this.customSearchButton);
		this.customSearchField.style.display = "flex";
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
		this.mvc.controller.searchClicked();
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

}

class SearchController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}

	async searchButtonWasClicked(FD){
		let result = await fetch('research/', {
		  method: 'POST',
		  body: FD
		});
		result["response"] = await result["json"]();

		if(result.response.return == 500){
			trace("error: "+result.response.message);
			//this.mvc.view.fillErrorDisplay(result.response.message);
		}
		else {
			trace(result.response);
			//this.mvc.view.fillErrorDisplay(result.response.message);
			// Go to result
			trace("go to result");
			/*
			this.mvc.view.deactivate();
			this.mvc.view.destroy();
			this.mvc.app.resultMVC.view.updateWrongPsw(result.response.message);
			this.mvc.app.resultMVC.view.attach(document.body); // attach view
			this.mvc.app.resultMVC.view.activate(); // activate result interface
			*/
		}
	}

	menuClicked() {
		trace("menu btn click");
		this.mvc.view.deactivate();
		//this.mvc.view.deleteProfile();
		this.mvc.view.destroy(); 						 // destroy current view
		this.mvc.app.menuMVC.view.attach(document.body); // attach view of menu MVC
		this.mvc.app.menuMVC.view.activate(); 			 // activate user interface of menu MVC
	}

	searchClicked(){
		trace("search btn click");
		//this.mvc.view.deactivate();
		//this.mvc.view.destroy();						// destroy current view
		//this.mvc.app.searchMVC.view.attach(document.body);// attach view of search MVC
		//this.mvc.app.searchMVC.view.activate();			// activate user interface of search MVC
	}

}
