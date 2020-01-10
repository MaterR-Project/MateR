class SearchModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);
	}

}

class SearchView extends View {

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

		this.gamePlatformChoice = document.createElement("select");
		this.gamePlatformChoice.setAttribute("name", "platform");
		this.mainDiv.appendChild(this.gamePlatformChoice);

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
		this.updateGamePlatformWithGames(this.mvc.app.profileMVC.model.games);
	}

	addListeners() {
		//this.getGameSelectorHandler = e => this.selectChose(e);
		//this.btn.addEventListener("change", this.getGameSelectorHandler);
	}

	removeListeners() {

	}

	getGameSelectorHandler(event){

	}

	updateGamePlatformWithGames(data) {
        data.map(element => {
            let option = document.createElement("option");
            option.text = `${element.name} - ${element.platform}`;
            option.value = data.indexOf(element);
            this.gamePlatformChoice.appendChild(option);
        });
        this.gamePlatformChoice.selectedIndex = -1;
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
		this.mvc.view.deactivate();
		//this.mvc.view.deleteProfile();
		this.mvc.view.destroy(); 						 // destroy current view
		this.mvc.app.menuMVC.view.attach(document.body); // attach view of menu MVC
		this.mvc.app.menuMVC.view.activate(); 			 // activate user interface of menu MVC
	}

}
