class ResearchModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);
	}

}

class ResearchView extends View {

	constructor() {
		super();
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);

		this.stage.style.display = "flex";
    this.stage.style.alignItems = "center";
    this.stage.style.justifyContent = "center";
		this.stage.style.flexDirection = "column";

		//logo MateR
		this.header = document.createElement("h1");
		this.header.innerHTML = "MateR";
		this.header.style.position = "absolute";
		this.header.style.margin = "10px";
		this.header.style.top = "0px";
		this.header.style.fontSize = "60px";
		this.stage.appendChild(this.header);

		//button menu
		this.btnMenu = document.createElement("button");
		this.btnMenu.style.position = "absolute";
		this.btnMenu.style.top = "10px";
		this.btnMenu.style.left = "10px";
		this.btnMenu.style.height = "50px";
		this.btnMenu.style.width = "50px";
		this.stage.appendChild(this.btnMenu);

		//division principal
		this.mainDiv = document.createElement("div");
		this.mainDiv.style.display = "flex";
    this.mainDiv.style.alignItems = "center";
    this.mainDiv.style.justifyContent = "center";
		this.mainDiv.style.flexDirection = "column";

		this.gamePlatformChoice = document.createElement("select");
		this.gamePlatformChoice.style.margin = "10px";
		this.mainDiv.appendChild(this.gamePlatformChoice);

		this.playstyleChoice = document.createElement("select");
		this.playstyleChoice.style.margin = "10px";
		this.mainDiv.appendChild(this.playstyleChoice);

		this.stage.appendChild(this.mainDiv);
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

	}

	removeListeners() {

	}

	updateGamePlatformWithGames(data) {
        data.map(element => {
            let option = document.createElement("option");
            option.text = `${element.name} - ${element.platform}`;
            option.value = data.indexOf(element);
            this.gamePlatformChoice.appendChild(option);
        });
        combo.selectedIndex = -1;
    }

}

class ResearchController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}

}
