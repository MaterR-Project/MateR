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

		//trace(this.users,this.languages,this.levels,this.locals,this.playstyles,this.vocals);
		this.gamesNameSet = new Set();
		this.games.map(game => {this.gamesNameSet.add(game.name)});
		trace(this.gamesNameSet,"\n\n");
		this.gamesNameSet.forEach(name => {trace(name,"\n")});
		trace(this.games[0],"\n",this.games[0].crossplay);
		trace(this.users.length,"\n",this.users[0]);
		trace(this.languages,"\n",this.languages.length);
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
	 * @method data2 : random data response v2
	 * @param {*} req
	 * @param {*} res
	 */
	data2(req, res) {
		let data = [ // some random data
			{id: 0, name: "machin", value: Math.random()},
			{id: 1, name: "bidule", value: Math.random()},
			{id: 2, name: "truc", value: Math.random()}
		];
		this.sendJSON(req, res, 200, data); // answer JSON
	}

	/**
	 * @method data2 : random data response v2
	 * @param {*} req
	 * @param {*} res
	 */
	login(req, res, pseudo, password) {
		if (pseudo === "toto" && password === "1234") {
			this.sendJSON(req, res, 200, {message: 458});
		} else {
			this.sendJSON(req, res, 401, {message: "wrong identifiant or password"});
		}
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
