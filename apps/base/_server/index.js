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
		this.ages = JSON.parse(fs.readFileSync('database/ages.json', 'utf-8'));
		this.sessions = new Map();

		// Create game names list
		this.gamesName = new Array();
		this.games.map(game => {this.gamesName.push(game.name)});

		// Create region names list
		this.regions = new Array();
		this.locals.map(local => {this.regions.push(local.name)});

		// Debug Tests
		//this.gamesName.map(name => {trace(name,"\n")});
		//trace(this.games[0],"\n",this.games[0].crossplay);
		//trace(this.users.length,"\n",this.users[2]);
		//trace(this.languages,"\n",this.languages.length);
	}

	addConvToUsers(req, res, ...param){
		let ssid = param[0];
		let dest = param[1]
		let src = this._getIdFromSessionId(ssid);
		if(src != -1){
			this.users[dest].tchats.push(parseInt(src));
			this.users[src].tchats.push(parseInt(dest));
			fs.writeFile("database/users.json", JSON.stringify(this.users), "utf-8", (err) => {								// re write the fil
				if(err) trace("could not rewrite the file");
			});
			this.sendJSON(req, res, 200, {return : "ok"});
		}

	}

	createConvForUsers(req, res, ...param){
		let id1 = param[0];
		let id2 = param[1];
		let time = new Date();
		let month = time.getMonth() + 1;
		if (month < 10) month = "0"+month;
		let date = time.getDate()
		if (date < 10) date = "0"+date;
		let year = time.getFullYear();
		let timestamp = "_" + date.toString() + month.toString() + year.toString();
		let path;
		trace("createConvForUsers : true == ", (parseInt(id1) > parseInt(id2)), id1, id2);
		if(parseInt(id1) > parseInt(id2)){
			path = "database/tchats/" + id2 + "_" + id1 + timestamp + ".json"
		} else {
			path = "database/tchats/" + id1 + "_" + id2 + timestamp + ".json"
		}
		if(fs.existsSync(path) != 1){
			fs.writeFileSync(path, "[]");
			fs.chmodSync(path, 0o666, (error) =>{
				console.log("changed file permissions")
			})
		}
		this.sendJSON(req, res, 200, {return : "ok"})
	}
	/**
	 * @method getAgesFromDatabase : array of age
	 * @param {*} req
	 * @param {*} res
	 */
	getAgesFromDatabase(req, res) {
		// list of game names from games database
		let data =  this.ages;
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getGameNamesFromDatabase : array of game names
	 * @param {*} req
	 * @param {*} res
	 */
	getGameNamesFromDatabase(req, res) {
		// list of game names from games database
		let data =  this.gamesName;
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getGamePlatformsFromGameName : array of platform
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
	 * @method getGameCrossplayFromGameName : boolean of crossplay
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
	 * @method getLanguagesFromDatabase : array of language
	 * @param {*} req
	 * @param {*} res
	 */
	getLanguagesFromDatabase(req, res) {
		// list of language from languages database
		let data =  this.languages;
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getLevelsFromDatabase : array of level
	 * @param {*} req
	 * @param {*} res
	 */
	getLevelsFromDatabase(req, res) {
		// list of level from levels database
		let data =  this.levels;
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getRegionsFromDatabase : array of region
	 * @param {*} req
	 * @param {*} res
	 */
	getRegionsFromDatabase(req, res) {
		// list of region from locals database
		let data =  this.regions;
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}

	/**
	 * @method getRegionCountriesFromRegionName : array of country
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
	 * @method getPlaystylesFromDatabase : array of playstyle
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
		let ssId = [...param].join(" ");
		let id = this._getIdFromSessionId(ssId); 		// profile id of session id
		let profile = 404; 								// error case
		if (id != undefined) {
			profile = this._returnCopyOfObject(this.users[id]);
			delete profile["password"];
		}
		let data = profile; 							// object profile of user id
		this.sendJSON(req, res, 200, {return: data}); 	// answer JSON
	}

	/**
	 * @method getNameFrom$Id : string username
	 * @param {*} req
	 * @param {*} res
	 * @param  {...*} param : id
	 */
	getNameFromId(req, res, ...param){
		let id = [...param].join(" ");
		let name = 404; 								// error
		if(id != -1) name = this.users[id].username;
		let data = name;
		this.sendJSON(req, res, 200, {return : data});  //send JSON
	}

	/**
	 * @method getVocalsFromDatabase : array of vocal
	 * @param {*} req
	 * @param {*} res
	 */
	getVocalsFromDatabase(req, res) {
		// list of vocal from vocals database
		let data =  this.vocals;
		this.sendJSON(req, res, 200, {return: data});   // answer JSON
	}

	/**
	 * @method sendMessage : Object of tchats - makes sure users can discuss
	 * @param {*} req
	 * @param {*} res
	 */
	async sendMessage(req, res){
		let result = await this._getDataFromFormDataPost(req);
		let content = result[0];						// extract message from data
		let source = result[1];							// extract sender id from data
		let destination = result[2];					// extract destination id from data
		let canSend;
		this.users[source[1]].tchats.map(e =>{		    // make sure the source can talk with dest
			if(e == destination[1])
				canSend = 1;
		});
		if(canSend == 1){
			let sock = undefined;
			for (let session of this.sessions.values()){
				if (session[0] == destination[1]) {
					sock = session[1];
					break;
				}
			}
			let state = "not seen";
			let tosend = JSON.stringify({message : content[1], src : source[1], dest : destination[1]}); // generate object to be sent to both users
			if(sock != undefined){
				trace("emit message");
				sock.emit('msg', tosend);						// emit it on the destination socket
			}
			this.sendJSON(req, res, 200, {return : state}); 		// and send message confirmation to the sender

			let file;
			if(parseInt(source[1]) < parseInt(destination[1])){ // get the conversation file of the users using format lowesTag_higherTag
				file = this._sendLatestConv(source[1], destination[1]);
			} else {
				file = this._sendLatestConv(destination[1], source[1]);
			}
			file = "database/tchats/" + file;					// get path to this file
			fs.readFile(file, "utf-8", (err, data) => {		// read it
				if(err) trace("error reading file, ", file, " : ", err);
				trace(data);
				var convText = JSON.parse(data);
				let temp = new Date();
				let minutes = temp.getMinutes();
				let hours = temp.getHours();
				if (minutes < 10) minutes = "0"+minutes;
				if (hours < 10) hours = "0"+hours;
				let time = hours + ":" + minutes;
				let date = temp.getDate() + "-" + (temp.getMonth() + 1) + "-" + temp.getFullYear();
				convText.push({Id : source[1], Message : content[1], State : state, Time : time, Date : date})	// add the message to it along with timestamp
				fs.writeFile(file, JSON.stringify(convText), "utf-8", (err) => {								// re write the fil
					if(err) trace("could not rewrite the file");
				});
			})
		}else{
			this.sendJSON(req, res, 200, {return : "failed to send"});	// return an error to the sender
		}

	}

	/**
	 * @method getConvFromId : object tchats
	 * @param {*} req
	 * @param {*} res
	 * @param  {...*} param : Ids of the conv to get
	 */
	getConvFromId(req, res, ...param){
		let conv = 404;
		if(param[0] != -1 && param[1] != -1) {
			if (param[0] < param[1]){
				conv = this._sendLatestConv(param[0], param[1]);
			}else{
				conv = this._sendLatestConv(param[1], param[0]);
			}
		}
		let convJson = JSON.parse(fs.readFileSync('database/tchats/' + conv, 'utf8'));
		convJson.forEach(e => {
			if (e.Id == param[1]) e.State = "seen";
		});
		fs.writeFile('database/tchats/' + conv, JSON.stringify(convJson), "utf-8", (err) => {								// re write the fil
			if(err) trace("could not rewrite the file");
		});
		let data = convJson;
		this.sendJSON(req, res, 200, {return: data});	// send the conversation file to the user
	}

	/**
	 * @method login : string of session id - connect a user
	 * @param {*} req
	 * @param {*} res
	 * @param {string} username
	 * @param {string} password
	 */
	login(req, res, username, password){
		trace(username, password);
		let profile = this.users.find(profile => profile.username == username && profile.password == password);	// get corresponding profile based on password and username
		if (profile != undefined) {
			let sessionId = this._createSessionId();			// generate a SSID and assign it to the user
			this.sessions.set(sessionId, [profile.id, undefined]);
			this.sendJSON(req, res, 200, {return: sessionId});	// return the SSID to the user or an error
		}else{
			this.sendJSON(req, res, 401, {return: "Wrong Login or Password"});
		}
	}

	/**
	 * @method getShortConvFromID : object short message - sends a mini conv with the specified user
	 * @param {*} req
	 * @param {*} res
	 * @param {string} id : id of user you want the conv with
	 */
	getShortConvFromId(req, res, id){
		let convLstId = this.users[id].tchats;			// get this list of ID the user has conversations with
		let convLstFile = [];
		let convLstLast = [];
		let data = [];
		convLstId.map(e =>{								// get a ist of the latest conversation files for each of these users
			if(id < e){
				convLstFile.push(this._sendLatestConv(id, e));
			} else{
				convLstFile.push(this._sendLatestConv(e, id));
			}
		})
		convLstFile.map(f =>{							// parse each of the files obtained and get the last message object
			let fullconv = JSON.parse(fs.readFileSync("database/tchats/" + f, "utf8"));
			convLstLast.push(fullconv[fullconv.length - 1]);
		})
		convLstLast.forEach((elem, index) =>{
			let theId = parseInt(convLstId[index]);
			data.push({id : theId, message : elem});	// format return as an {id, message} object for display
		})
		this.sendJSON(req, res, 200, {return : data});	// send to user
	}

	/**
   * @method getNameFromId : string username
	 * @param {*} req
	 * @param {*} res
 	 * @param  {...*} param : id
	 */
  	getNameFromId(req, res, ...param){					// get name field from user ID
	  let id = [...param].join(" ");
	  let name = 404; // error
	  if(id != -1) name = this.users[id].username;
	  let data = name;
	  this.sendJSON(req, res, 200, {return : data}); //send JSON
  	}

	/**
	 * @method register : handle creation account
	 * @param {*} req
	 * @param {*} res
	 */
	async register(req, res) {

		let data = await this._getDataFromFormDataPost(req);

		//trace(data);
		let newProfile = {};
		newProfile.vocals = [];
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
			else if(elem[0] == "year"){
				newProfile[elem[0]] = parseInt(elem[1]);
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
			trace("created user : ", newProfile);
			this.users.push(newProfile);
			//TODO UPDATE JSON In NEW FILE
			fs.writeFile("database/users.json", JSON.stringify(this.users), function(err){
				if(err) trace("couldnt write file");
				trace( "SUCCESS - write ew user on user file");
			});

		}
	}

	/**
	 * @method search : handle search
	 * @param {*} req
	 * @param {*} res
	 */
	async _research(req, res) {
		let data = await this._getDataFromFormDataPost(req);
		let researchObject = {};
		data.forEach(elem => {
			let addValue = (prop, value) => {
				if(researchObject.hasOwnProperty(prop)){
					researchObject[prop][0].push(value);
				}
				else{
					researchObject[prop] = [[value]];
				}
			}
			let addPrio = (prio, value) =>{
				let prop = prio.substring(0, prio.length-4);
				if(researchObject.hasOwnProperty(prop)){
					researchObject[prop].push(value);
				}
				else{
					researchObject[prop] = [[], value];
				}
			}
			if (elem[0] == "game"){
				researchObject.game = [elem[1], "suppr"]
			}
			else if (elem[0] == "platform"){
				researchObject.platform = [elem[1], "suppr"]
			}
			else if (elem[0] == "originId"){
				researchObject.originId = [elem[1], "suppr"]
			}
			else if (elem[0].includes("Prio")){
				addPrio(elem[0], elem[1]);
			}
			else {
				addValue(elem[0], elem[1]);
			}
		});
		return researchObject;
	}
	/**
	 * @method getMatchingProfiles : array of compatible users
	 * @param {*} req
	 * @param {*} res
	 */
	async getMatchingProfiles(req, res){				// get a list of matching users to a specific search
		trace("---- BEGIN : match people ----")
		let data = await this._research(req);		// collect data from post request
		data = Object.values(data);
		data.unshift(data.pop());

		let matchingArray = [];
		this.users.map(u =>{							// for each existing user, generate a matching score
			if(this.users[data[0][0]].tchats.includes(u.id)){
				//trace("disqualified - allready in conv - ", u.id)
				return false;
			}
			let maxTotal = 0;
			let userWeight = 0;
			if (u.id == data[0][0] || this.users[data[0][0]].tchats.indexOf(u.id) != -1 ){					// if the candidate is the requesting user, dont match him
				//trace("disqualified - self or already tchating - ", u.id);
				return false;
			}
			// platform
			if(this._getPlatformWeight(u, data[1][0], data[2][0]) == 0){	// if candidate plays the same game but not on the same platform dont match him
				//trace("disqualified - platform - ", u.id);
				return false;
			}
			// play style
			if (data[4][0].length != 0){
				if(this._getStyleWeight(u, data[1][0], [data[4][0]]) == 0){
					//trace("disqualified - playstyle - ", u.id);
					return false; //skip the user if playstyles dont match
				}
			} else if (data[4][0].length == 0){						// user doesnt care
				let playstyleArray = [];
				this.users[data[0][0]].games.map(g =>{
					if(g.name == data[1][0] && g.platform == data[2][0])
						playstyleArray.push(g.playstyles);
				})
				if(this._getStyleWeight(u, data[1][0], playstyleArray) == 0){
					//trace("disqualified - playstyle - ", u.id);
					return false; //skip the user if playstyles dont match
				}
			}
			// game level
			if(data[3][1] == "-1"){		// use user profile
				let levelArray = [];
				this.users[data[0][0]].games.map(g =>{
					if(g.name == data[1][0]){
						if(! levelArray.includes(g.level))
							levelArray.push(g.level);
					}
				})
				userWeight += parseInt(2 * this._getLevelWeight(u, data[1][0], levelArray))
				maxTotal += 10;
			} else {					// use given profile
				userWeight += parseInt(data[3][1] * (2 * this._getLevelWeight(u, data[1][0], data[3][0]))); // 2* to set the importance of the level and multiply by priority
				maxTotal += parseInt(data[3][1]) * 10;
			}
			// country
			if(data[6][1] == "-1"){
				if(this.users[data[0][0]].country != undefined){	// if user's country field was filled
					userWeight += parseInt(6 * this._getCountryWeight(u, this.users[data[0][0]].country));
					maxTotal += 6;
				}
			} else {
				userWeight += parseInt(data[6][1] * 6 * this._getCountryWeight(u, data[6][0]));
				maxTotal += parseInt(data[6][1]) * 6;
			}
			//region
			if(data[5][1] == "-1"){
				userWeight += parseInt(4 * this._getRegionWeight(u, this.users[data[0][0]].region));
				maxTotal += 4;
			} else {
				userWeight += parseInt(data[5][1] * 4 * this._getRegionWeight(u, data[5][0]));
				maxTotal += parseInt(data[5][1]) * 4;
			}
			//languages
			let tmp;
			if(data[7][1] == "-1"){
				let langArray = this.users[data[0][0]].languages;
				tmp = parseInt(this._getLanguagesWeight(u, langArray));	// use user's languages by default
			} else{
				tmp = parseInt(this._getLanguagesWeight(u, data[7][0]));
			}
			if(tmp == - 1){
				//trace("disqualified - language - ", u.id)
				return false;
			} else{
				if(data[7][1] == "-1"){
					userWeight += parseInt(tmp * 0.75);
					maxTotal += 3;
				} else{
					userWeight += parseInt(data[7][1] * tmp * 0.75)
					maxTotal += parseInt(data[7][1]) * 3;
				}
			}
			// ages
			if(data[10][1] == "-1"){
				let date = new Date();
				let year = date.getFullYear();
				let targetAgeRange = this._getAgeRange(year - this.users[data[0][0]].year);
				userWeight += 0.8 * parseInt(this._getAgeWeight(u, targetAgeRange, year));
				maxTotal += 4;
			}else {
				let date = new Date();
				let year = date.getFullYear();
				userWeight += 0.8 * parseInt(data[10][1]* this._getAgeWeight(u, data[10][0], year));
				maxTotal += parseInt(data[10][1]) * 4;
			}

			// gender
			if(data[9][1] != "-1"){
				if(u.gender != data[9][0] && u.gender != "Gamer"){
					//trace("disqualified - gender - ", u.id);
					return false;
				}
			}
			// vocals
			if(data[8][1] == "-1"){
				userWeight += 0.75 * parseInt(this._getVocalsWeight(u, this.users[data[0][0]].vocals));
				maxTotal += 3;
			} else{
				userWeight += 0.75 * parseInt(data[8][1] * this._getVocalsWeight(u, data[8][0]));
				maxTotal += parseInt(data[8][1] * 3);
			}

			trace("max score is : ",maxTotal);							// maximum of points avalaible with provided importances
			let compatibility = (userWeight * 100) / maxTotal;
			trace(compatibility, "%");									// percentage compatibility with the request
			matchingArray.push({score : Math.round(compatibility), user : u.id});	// create objetcs with score and id
			matchingArray.sort((a, b) => (a.score > b.score) ? -1 : 1);	// sort the array of matching users biggest value first
		})
		trace("---- END : matching done ----");
		trace(matchingArray);
		this.sendJSON(req, res, 200, {return : matchingArray}); 		// send array to user
	}

	/**
	 * @method _getProfileFromId : object profile
	 * @param {*} req
	 * @param {*} res
	 * @param  {...*} param : Id name
	 */
	getProfileFromId(req, res, ...param) {
		let id = [...param].join(" ");
		let profile = 404;
		if (id != -1) {
			profile = this._returnCopyOfObject(this.users[id]);
			delete profile["password"];
		}
		let data = profile; 							// object profile of user id
		this.sendJSON(req, res, 200, {return: data});	// answer JSON
	}

	/**
	 * @method _getDataFromDataPost : get post data from request
	 * @param {*} req
	 */
	async _getDataFromFormDataPost(req){
		let busboy = new Busboy({headers : req.headers});
		let result, prom = new Promise(resolve => result = resolve);
		let form = new Array();
		busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated){
			form.push([fieldname, val]);
		});
		busboy.on('finish', function(){
			result(form);
		});
		req.pipe(busboy);
		return prom;
	}

	/**
	 * @method _getLevelWeight : weight of the candidate's level at a given game relative to the required one
	 * @param {*} candidate : user object we are calcultaing the weight of
	 * @param {*} targetGame : required game
	 * @param {*} targetLevel : required level
	 */
	_getLevelWeight(candidate, targetGame, targetLevel){
		let weight = -1;
		candidate.games.map(g =>{		// for each games of the candidate
			if(g.name == targetGame){	// if user plays the desired game
				let delta = this.levels.indexOf(g.level) - this.levels.indexOf(targetLevel[0]);
				delta = Math.abs(delta);// difference of level
				if (delta == 0){		// same levels
					weight = 5;
				}else if(delta == 1){	// almost same level
					weight = 2;
				}else if (delta == 2){	// not really same level
					weight = 1;
				}else if (delta == 3){	// not same level at all
					weight = 0;
				}
			}
		})
		return parseInt(weight);
	}

	/**
	 * @method _getPlatformWeight : weight of the user from the platform he plays the game on
	 * @param {*} candidate : user object we are calcultaing the weight of
	 * @param {*} targetGame : required game
	 * @param {*} targetLevel : required platform
	 */
	_getPlatformWeight(candidate, targetGame, targetPlatform){
		let weight = 0;
		candidate.games.map(g =>{						// for earch game the candidate plays
			if(g.name == targetGame){					// if user plays the desired game
				if(g.platform == targetPlatform){		// and on the correct platform
					weight = 1;							// user has a mathing platform
				}
				this.games.map(a =>{
					if(a.name == targetGame){
						if(a.crossplay == true){
							weight = 1;
						}
					}
				})
			}
		})
		return parseInt(weight);						// 1 if plays game and same platform, 0 otherwise
	}

	/**
	 * @method _getStyleWeight : weight of the candidate's playstyle on a given game relative to the required one
	 * @param {*} candidate : user object we are calcultaing the weight of
	 * @param {*} targetGame : required game
	 * @param {*} targetStyle : required playstyle
	 */
	_getStyleWeight(candidate, targetGame, targetstyle){
		let weight = 0;
		candidate.games.map(g =>{						// for each game the candidate plays
			if(g.name == targetGame){					// if user plays the desired game
				g.playstyles.map(p =>{					// for each of candidate's playstyles on this game
					var a = 0
					while(a < targetstyle.length){
						if(p == targetstyle[0][a]){				// if same as required playstyle
							weight = 1;						// user has a mathing playstyle
						}
						a++;
					}
				})
			}
		})
		return parseInt(weight);						// 1 if plays game and same playstyle, 0 otherwise
	}

	/**
	 * @method _getCountryWeight : weight of the candidate's country relative to the required one
	 * @param {*} candidate : user object we are calcultaing the weight of
	 * @param {*} targetCountry : required country
	 */
	_getCountryWeight(candidate, targetCountry){
		let weight = 0;
		if(candidate.country == targetCountry)			// if the country of the candidate is the same as required one
			weight = 1;
		return parseInt(weight);

	}

	/**
	 * @method _getRegionWeight : weight of the candidate's region relative to the required one
	 * @param {*} candidate : user object we are calcultaing the weight of
	 * @param {*} targetRegion : required region
	 */
	_getRegionWeight(candidate, targetRegion){
		let weight = 0;
		if(candidate.region == targetRegion)			// if the candidate's region is the same as the required one
			weight = 1;
		return parseInt(weight);
	}

	/**
	 * @method _getlanguagesWeight : weight of the candidate's spoken languages relative to the required ones
	 * @param {*} candidate : user object we are calcultaing the weight of
	 * @param {*} targetLanguage : list of languages wanted
	 */
	_getLanguagesWeight(candidate, targetLanguage){
		let count = 0;
		candidate.languages.map(l =>{							// count the amount of languages the candidate has in commun with the request
			if(targetLanguage.includes(l))
			count ++;
		})
		let percentage = (count * 100) / targetLanguage.length;	// extract the percentage this value represents
		let weight = 0;
		if(percentage == 100){			// all in commun !
			weight = 4;
		} else if (percentage > 66){	// 66 % or more
			weight = 3;
		} else if (percentage > 33){	// 33% or more
			weight = 2;
		} else if (percentage > 0){		// less than 33%
			weight = 1;
		} else{							// no language, skip user
			weight = -1;
		}
		return parseInt(weight);
	}

	/**
	 * @method _getAgeWeight : weight of the candidate's Age relative to the required one
	 * @param {*} candidate : user object we are calcultaing the weight of
	 * @param {*} targetAge : required Age
	 * @param {*} year : current year
	 */
	_getAgeWeight(candidate, ageRange, year){
		if(candidate.year == -1)						// if the user didnt give any birth year, set the weight to 0
			return 0;
		let candidateAge =  year - candidate.year;			  // extract the age of the candidate using his birth year and curent year
		let candidateRange = this._getAgeRange(candidateAge); // get the candicate's age area
		let delta = candidateRange - ageRange;			  // get delta of this
		let ret;
		if(delta == 0)
			ret = 5;
		if(delta == 1)
			ret = 4;
		if(delta == -1)
			ret = 3;
		if(delta == 2)
			ret = 3;
		if(delta == -2)
			ret = 2;
		if(delta == 3)
			ret = 2
		if(delta >= 4)
			ret = 1
		if(delta <= -3)
			ret = 1
		if(candidate.id == 8264)
			trace(candidateAge, candidateRange)
		return ret
	}

	/**
	 * @method _getAgeRange : index of the age area the candidate fits in (see database/ages.json)
	 * @param {*} age : age of the candidate
	 */
	_getAgeRange(age){
		let candidateRange;
		for(var i = 0; i < this.ages.length; i++){
			if(this.ages[i] > age){
				candidateRange =  this.ages.indexOf(this.ages[i]) - 1; // grab the age area the candidate fits in
				break;
			}
			if(this.ages[this.ages.length-1] <= age){
				candidateRange = this.ages.length - 1;
			}
		}
		return candidateRange;
	}

	/**
	 * @method _getVocalsWeight : weight of the candidate's used vocals relative to the required ones
	 * @param {*} candidate : user object we are calcultaing the weight of
	 * @param {*} vocals : list of vocal plateforms wanted
	 */
	_getVocalsWeight(candidate, vocals){
		let count = 0;
		candidate.vocals.map(v =>{						// for each vocal platform the candidate uses
			if(vocals.includes(v)){						// if its one of the required ones
				count++;
			}
		})
		let percentage = (count * 100) / vocals.length; // extract percentage of vocals in commun
		let weight = 0;
		if(percentage == 100){
			weight = 4;									// all the same vocals
		} else if (percentage > 66){					// 66% - 99% percent of list in commun
			weight = 3;
		}else if (percentage > 33){						// 33% - 65% percent of list in commun
			weight = 2;
		}else if (percentage > 0){						// 1% - 32% percent of list in commun
			weight = 1;
		} else{											// nothing in commun
			weight = 0;
		}
		return parseInt(weight);
	}

	/**
	 * @method _getIdFromSessionId : string id of connect session
	 * @param {string} sessionId
	 */
	_getIdFromSessionId(sessionId) {
 		let session = this.sessions.get(sessionId);
 		if (session === undefined) {
 			return
 		}
 		return session[0];
 	}

	/**
	 * @method _getDataFromsearch : get data from posted object
	 * @param {*} req
	 */
	async _getDataFromSearch(req){
    	let busboy = new Busboy({ headers: req.headers });
		let result, prom = new Promise(resolve => result = resolve);
		let form = new Array();
	    busboy.on('field', function(fieldname, val) {
			// val is a string of the values and the weight, split the ","" to get an array
			let valcpy = val.split(",");
			// get the weight and save it by grabbing last element
			var customWeight = valcpy.slice(valcpy.length - 1, valcpy.length);
			// remove last element from values
			valcpy.pop();
			// send all formated data
			form.push([fieldname, valcpy, customWeight]);
    	});
    	busboy.on('finish', function() {
			result(form);
      		trace('Done parsing data!');
    	});
    	req.pipe(busboy);
		return prom;
	}

	/**
	 * @method _isUsernameTaken : boolean that says if given username is taken
	 * @param {string} username
	 */
	_isUsernameTaken(username){
		let taken = false;
		this.users.map(profile => {						// for each user in database, check if providded name exists
			if (profile.username == username) taken = true;
		});
		return taken;
	}

	/**
	 * @method createSessionId : string a new session id
	 */
	_createSessionId() {
		let sessionId = "" + Math.random();
		while (this.sessions.has(sessionId)) {			// generate unique SSID
			sessionId = "" + Math.random();
		}
		return sessionId;
	}

	/**
	 * @method _returnCopyOfObject : return a copy of the given object
	 * @param {Object} object
	 */
	_returnCopyOfObject(object) {
		return JSON.parse(JSON.stringify(object));
	}

	/**
	 * @method _sendLatestConv : string name of the latest conversation file between id1 & id2
	 * @param {string} id1 : id of first user
	 * @param {string} id2 : id of second user
	 */
	_sendLatestConv(id1, id2){
		trace("sendLatestConv : ", id1, id2);
		if(parseInt(id1) < parseInt(id2)) var regex = new RegExp(""+id1 + "_" +id2);			// create regexp with the two ID (sorted with format smallestID_biggestId)
		if(parseInt(id2) < parseInt(id1)) var regex = new RegExp(""+id2 + "_" +id1);			// create regexp with the two ID (sorted with format smallestID_biggestId)
		var dir = fs.readdirSync("database/tchats");	// parse the chat directory
		var list = [];
		dir.forEach( i => {								// for each file in directory
			if(regex.test(i)) 							// if file matches the regexp
				list.push(i);							// push it in list of conv files for the users
		});
		list.sort(function(a, b){						// sort it by date of creation to get the newest versin of the conv history
			return fs.statSync("database/tchats/" + a).mtime.getTime() - fs.statSync("database/tchats/" + b).mtime.getTime();
		})
		var mostRecent = list[list.length - 1];			// return last element of the list AKA the newest one
		return mostRecent;
	}

}

module.exports = Base; // export app class


// Iamgron was here