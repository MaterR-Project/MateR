const ModuleBase = load("com/base"); // import ModuleBase class

const fs = 			require("fs");			// file system
const Busboy = require("busboy");

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
		this.sessions = new Map();
		//trace(this.users,this.languages,this.levels,this.locals,this.playstyles,this.vocals);

		// Create game names list
		this.gamesName = new Array();
		this.games.map(game => {this.gamesName.push(game.name)});
		//trace(this.gamesName,"\n\n");

		// Create region names list
		this.regions = new Array();
		this.locals.map(local => {this.regions.push(local.name)});
		//trace(this.regions,"\n\n");

		// Tests
		//this.gamesName.map(name => {trace(name,"\n")});
		//trace(this.games[0],"\n",this.games[0].crossplay);
		//trace(this.users.length,"\n",this.users[2]);
		//trace(this.languages,"\n",this.languages.length);
	}

	/**
	 * @method getIdFromSessionId : id of connect session
	 * @param {*} sessionId
	 */
	 getIdFromSessionId(sessionId) {
 		let id = this.sessionIds.get(sessionId);
 		if (id === undefined) {
 			id = -1;
 		}
 		return id;
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
		if (id != -1) {
			profile = this.users[id];
			profile.password = "Nice Try ;)"
		}
		let data = profile; // object profile of user id
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}
	/**
	 * @method getNameFrom$Id : object profile
	 * @param {*} req
	 * @param {*} res
	 * @param  {...*} param : id
	 */
	getNameFromId(req, res, ...param){
		let id = [...param].join(" ");
		let name = 404; // error
		if(id != -1) name = this.users[id].username;
		let data = name;
		this.sendJSON(req, res, 200, {return : data}); //send JSON
	}
	/**
	 * @method getProfileFromId : object profile
	 * @param {*} req
	 * @param {*} res
	 * @param  {...*} param : Id name
	 */

	getProfileFromId(req, res, ...param) {
		trace(param)
		let id = [...param].join(" ");
		let profile = 404; // error case
		if (id != -1) {
			profile = this.users[id];
			profile.password = "Nice Try ;)"
		}
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
	 * @method sendLatestConv : sends the name of the latest conversation file between id1 & id2
	 * @param {*} id1 : id of first user
	 * @param {*} id2 : id of second user
	 */
	sendLatestConv(id1, id2){
		var fs = require("fs");
		var regex = new RegExp(id1 + "_" +id2);
		var dir = fs.readdirSync("database/tchats");
		var list = [];
		// match directory content for tag1_tag2
		dir.forEach( i => {
			if(regex.test(i)) // push it !
				list.push(i);
		})
		// make sure the list is sorted by creation date
		list.sort(function(a, b){
			return fs.statSync("database/tchats/" + a).mtime.getTime() - fs.statSync("database/tchats/" + b).mtime.getTime();
		})
		//get the newest one
		var mostRecent = list[list.length - 1];
		return mostRecent;
	}
	/**
	 * @method sendMessage : makes sure users can discuss and handles message sending
	 * @param {*} req
	 * @param {*} res
	 */
	async sendMessage(req, res){
		let result = await this._getMessageFromRequest(req); 
		trace(result)
		let content = result[0];
		let source = result[1];
		let destination = result[2];
		let canSend;
		this.users[source[1]].tchats.map(e =>{
			if(e == destination[1])
				canSend = 1;
		})
		trace(canSend);
		if(canSend == 1){
			let data = "ok";
			//send to other user TODO
			let sock = this.sessions[source[1]]; // get the socket of the destination
			let tosend = JSON.stringify({message : content[1], src : source[1], dest : destination[1]});
			if(sock)
				sock.emit('message', tosend);
			this.sendJSON(req, res, 200, {return : data});
		}else{
			let data = "failed to send";
			this.sendJSON(req, res, 200, {return : data});
		}
	}
	/**
	 * @method getConvFrom : object profile
	 * @param {*} req
	 * @param {*} res
	 * @param  {...*} param : Ids of the conv to get
	 */
	getConvFromId(req, res, ...param){
		let conv = 404;
		if(param[0] != -1 && param[1] != -1) conv = this.sendLatestConv(param[0], param[1]);
		conv = JSON.parse(fs.readFileSync('database/tchats/' + conv, 'utf8'));
		let data = conv;
		this.sendJSON(req, res, 200, {return: data});
	}

	/**
	 * @method login : connect a user
	 * @param {*} req
	 * @param {*} res
	 * @param {*} username
	 * @param {*} password
	 */
	login(req, res, username, password){
		trace(username, password);
		let profil = this.users.find(profil => profil.username == username);
		trace("profil", profil);
		trace('map', this.sessionIds);
		trace('users', this.users);
		if (profil != undefined) {
			let sessionId = this._createSessionId();
			this.sessionIds.set(sessionId, profil.id);
			trace(sessionId);
			this.sendJSON(req, res, 200, {return: sessionId});
		}else{
			this.sendJSON(req, res, 401, {return: "Wrong Login or Password"});
		}
	}
	/**
	 * @method sendLatestConv : sends the name of the latest conversation file between id1 & id2
	 * @param {*} id1 : id of first user
	 * @param {*} id2 : id of second user
	 */
	sendLatestConv(id1, id2){
		var fs = require("fs");
		var regex = new RegExp(id1 + "_" +id2);
		var dir = fs.readdirSync("database/tchats");
		var list = [];
		// match directory content for tag1_tag2
		dir.forEach( i => {
			if(regex.test(i)) // push it !
				list.push(i);
		})
		// make sure the list is sorted by creation date
		list.sort(function(a, b){
			return fs.statSync("database/tchats/" + a).mtime.getTime() - fs.statSync("database/tchats/" + b).mtime.getTime();
		})
		//get the newest one
		var mostRecent = list[list.length - 1];
		return mostRecent;
	}
	/**
	 * @method getShortConvFromID : sends a mini conv with the specified
	 * @param {*} id : id of user you want the conv with
	 */
	getShortConvFromId(req, res, id){
		let convLstId = this.users[id].tchats;
		let convLstFile = [];
		let convLstLast = [];
		let data = [];
		convLstId.map(e =>{
			if(id < e){
				convLstFile.push(this.sendLatestConv(id, e));
			} else{
				convLstFile.push(this.sendLatestConv(e, id));
			}
		})
		convLstFile.map(f =>{
			let fullconv = JSON.parse(fs.readFileSync("database/tchats/" + f, "utf8"));
			convLstLast.push(fullconv[fullconv.length - 1]);
		})
		convLstLast.forEach((elem, index) =>{
			let theId = parseInt(convLstId[index]);
			data.push({id : theId, message : elem});
		})
		this.sendJSON(req, res, 200, {return : data});
	}
	/**
	* @method getNameFromid :
	* @param {*} req
	* @param {*} res
	* @param  {...*} param : id
	*/
   getNameFromId(req, res, ...param){
	   let id = [...param].join(" ");
	   let name = 404; // error
	   trace(id);
	   if(id != -1) name = this.users[id].username;
	   let data = name;
	   this.sendJSON(req, res, 200, {return : data}); //send JSON
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
	 * @method getVocalsFromDatabase : busboy func to get message target id and source id from req
	 * @param {*} req
	 */
	async _getMessageFromRequest(req){
		let busboy = new Busboy({headers : req.headers});
		let result, prom = new Promise(resolve => result = resolve);
		let message = new Array();
		busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated){
			message.push([fieldname, val]);
		});
		busboy.on('finish', function(){
			result(message);
		});
		req.pipe(busboy);
		return prom;
	}

	/**
	 * @method register : handle creation account
	 * @param {*} req
	 * @param {*} res
	 */
	async register(req, res) {

		let data = await this._getDataFromRequest(req);

		//trace(data);
		let newProfile = {};
		let errorMessage = "";
		let games = [];
		let currentGame = {};

		if (data.length < 11) error = 1;

		data.forEach(elem => {

			if(elem[0] == "username"){
				if (this._isUsernameTaken(elem[1])) {
					errorMessage = "Username Already Taken";
				}
				else{
					newProfile[elem[0]] = elem[1];
				}
			}
			else if(elem[0] == "languages"){
				if(newProfile.hasOwnProperty("languages")){
					newProfile.languages.push(elem[1]);
				}
				else{
					newProfile[elem[0]] = [elem[1]];
				}
			}
			else if (elem[0] == "game"){
				if(newProfile.hasOwnProperty("games")){
					let notAdd = true;
					newProfile.games.forEach(e => {
						if (e.name == currentGame.name && e.platform == currentGame.platform){
							notAdd = false;
						}
					})
					if (notAdd) newProfile.games.push(currentGame);
				}
				else{
					newProfile.games = [];
				}
				currentGame = {name: elem[1]};

			}
			else if (elem[0] == "platform" || elem[0] == "level"){
				currentGame[elem[0]] = elem[1];
			}
			else if (elem[0] == "playstyles") {
				if(currentGame.hasOwnProperty("playstyles")){
					currentGame.playstyles.push(elem[1]);
				}
				else{
					currentGame[elem[0]] = [elem[1]];
				}
			}
			else if(elem[0] == "vocals"){
				if(newProfile.hasOwnProperty("vocals")){
					newProfile.vocals.push(elem[1]);
				}
				else{
					newProfile[elem[0]] = [elem[1]];
				}
			}
			else{
				newProfile[elem[0]] = elem[1];
			}
		});

		let notAdd = true;
		newProfile.games.forEach(e => {
			if (e.name == currentGame.name && e.platform == currentGame.platform){
				notAdd = false;
			}
		})
		if (notAdd) newProfile.games.push(currentGame);


		if(errorMessage != ""){
			this.sendJSON(req, res, 200, {return: 500, message: errorMessage});
		}
		else{
			this.sendJSON(req, res, 200, {return: 200, message: "New Account Created"});
			newProfile.id = this.users.length;
			newProfile.tchats = [];
			trace(newProfile);
			this.users.push(newProfile);
			//TODO UPDATE JSON
			fs.writeFile("database/users.json", JSON.stringify(this.users), function(err){
				if(err) trace("couldnt write file");
				trace( "write complete");
			});

		}
	}

	/**
	 * @method _getDataFromRequest : get the post data from request
	 * @param {*} req
	 */
	async _getDataFromRequest(req){
    	let busboy = new Busboy({ headers: req.headers });
		let result, prom = new Promise(resolve => result = resolve);
		let form = new Array();
	    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
			form.push([fieldname, val]);
    	});
    	busboy.on('finish', function() {
			result(form);
      		trace('Done parsing form!');
    	});
    	req.pipe(busboy);
		return prom;
	}

	/**
	 * @method _isUsernameTaken : say if given username is taken
	 * @param {*} username
	 */
	_isUsernameTaken(username){
		let taken = false;
		this.users.map(profil => {
			if (profil.username == username) taken = true;
		});
		return taken;
	}

	/**
	 * @method createSessionId : create a session id
	 */
	_createSessionId() {
		let sessionId = "" + Math.random();
		while (this.sessionIds.get(sessionId) != undefined) {
			sessionId = "" + Math.random();
		}
		return sessionId;
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
