const ModuleBase = load("com/base"); // import ModuleBase class

const fs = 			require("fs");			// file system

class Base extends ModuleBase {

	constructor(app, settings) {
		super(app, new Map([["name", "baseapp"], ["io", true]]));

		//Load database
		this.games = JSON.parse(fs.readFileSync('database/games.json', 'utf8'));
		this.languages = JSON.parse(fs.readFileSync('database/languages.json', 'utf8'));
		this.levels = JSON.parse(fs.readFileSync('database/levels.json', 'utf8'));
		this.locals = JSON.parse(fs.readFileSync('database/locals.json', 'utf8'));
		this.playstyles = JSON.parse(fs.readFileSync('database/playstyles.json', 'utf8'));
		this.users = JSON.parse(fs.readFileSync('database/users.json', 'utf8'));
		this.vocals = JSON.parse(fs.readFileSync('database/vocals.json', 'utf8'));
		this.sessionIds = new Map();

		//debug
		this.sessionIds.set("123",0);

		//trace(this.users,this.languages,this.levels,this.locals,this.playstyles,this.vocals);

		// Create game names list
		this.gamesName = new Array();
		this.games.map(game => {this.gamesName.push(game.name)});
		trace(this.gamesName,"\n\n");

		// Create region names list
		this.regions = new Array();
		this.locals.map(local => {this.regions.push(local.name)});
		trace(this.regions,"\n\n");

		// Tests
		this.gamesName.map(name => {trace(name,"\n")});
		trace(this.games[0],"\n",this.games[0].crossplay);
		trace(this.users.length,"\n",this.users[0]);
		trace(this.languages,"\n",this.languages.length);
	}

	/**
	 * @method getIdFromSessionId : id of connect session
	 * @param {*} sessionId
	 */
	getIdFromSessionId(sessionId) {
		return this.sessionIds.get(sessionId);
	}

	/**
	 * @method getGameNamesFromDatabase : list of game names
	 * @param {*} req
	 * @param {*} res
	 */
	getGameNamesFromDatabase(req, res) {
		// list of game names from games database
		let data =  this.gamesName;
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getGamePlatformsFromGameName : list of platform
	 * @param {*} req
	 * @param {*} res
	 * @param  {...*} param : game name
	 */
	getGamePlatformsFromGameName(req, res, ...param) {
		let gameName = [...param].join(" ");
		let platforms = 404; //error case
		this.games.map(game => {if (game.name == gameName) platforms = game.platforms;});
		let data = platforms; // list of platform for a game
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getGameCrossplayFromGameName : id of crossplay
	 * @param {*} req
	 * @param {*} res
	 * @param  {...*} param : game name
	 */
	getGameCrossplayFromGameName(req, res, ...param) {
		let gameName = [...param].join(" ");
		let crossplay = 404; //error case
		this.games.map(game => {if (game.name == gameName) crossplay = game.crossplay;});
		let data = crossplay; // list of platforms for a game
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getLanguagesFromDatabase : list of language
	 * @param {*} req
	 * @param {*} res
	 */
	getLanguagesFromDatabase(req, res) {
		// list of language from languages database
		let data =  this.languages;
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getLevelsFromDatabase : list of level
	 * @param {*} req
	 * @param {*} res
	 */
	getLevelsFromDatabase(req, res) {
		// list of level from levels database
		let data =  this.levels;
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getRegionsFromDatabase : list of region
	 * @param {*} req
	 * @param {*} res
	 */
	getRegionsFromDatabase(req, res) {
		// list of region from locals database
		let data =  this.regions;
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getRegionCountriesFromRegionName : list of country
	 * @param {*} req
	 * @param {*} res
	 * @param  {...*} param : region name
	 */
	getRegionCountriesFromRegionName(req, res, ...param) {
		let regionName = [...param].join(" ");
		let countries = 404; // error case
		this.locals.map(local => {if (local.name == regionName) countries = local.countries;});
		let data = countries; // list of country for a region
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getPlaystylesFromDatabase : list of playstyle
	 * @param {*} req
	 * @param {*} res
	 */
	getPlaystylesFromDatabase(req, res) {
		// list of playstyle from playstyles database
		let data =  this.playstyles;
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getProfileFromSessionId : object profile
	 * @param {*} req
	 * @param {*} res
	 * @param  {...*} param : ssId name
	 */
	getProfileFromSessionId(req, res, ...param) {
		trace(param)
		let ssId = [...param].join(" ");
		let id = this.getIdFromSessionId(ssId); // profile id of session id
		let profile = 404; // error case
		profile = this.users[id];
		let data = profile; // object profile of user id
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getVocalsFromDatabase : list of vocal
	 * @param {*} req
	 * @param {*} res
	 */
	getVocalsFromDatabase(req, res) {
		// list of vocal from vocals database
		let data =  this.vocals;
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method hello : world
	 * @param {*} req
	 * @param {*} res
	 * @param  {...*} params : some arguments
	 */
	hello(req, res, ... params) {
		let answer = ["hello", ...params, "!"].join(" "); // say hello
		trace(answer); // say it
		this.sendJSON(req, res, 200, {message: answer}); // answer JSON
	}

	/**
	 * @method data : random data response
	 * @param {*} req
	 * @param {*} res
	 */
	data(req, res) {
		let data = [ // some random data
			{id: 0, name: "data0", value: Math.random()},
			{id: 1, name: "data1", value: Math.random()},
			{id: 2, name: "data2", value: Math.random()}
		];
		this.sendJSON(req, res, 200, data); // answer JSON
	}

	/**
	 * @method _onIOConnect : new IO client connected
	 * @param {*} socket
	 */
	_onIOConnect(socket) {
		super._onIOConnect(socket); // do not remove super call
		socket.on("dummy", packet => this._onDummyData(socket, packet)); // listen to "dummy" messages
	}

	_onDummyData(socket, packet) { // dummy message received
		trace(socket.id, "dummy", packet); // say it
		socket.emit("dummy", {message: "dummy indeed", value: Math.random()}); // answer dummy random message
	}

}

module.exports = Base; // export app class
