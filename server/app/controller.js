var needle = require('needle');
var consuela = require('consul-helper')();
const jobCreatorName = "job-creator"; //name of the service that creates job files

module.exports = function (app) {
	app.post('/v1/cores', function (req, res) {
		consuela.getServiceAddresses(jobCreatorName, function (results) {
			//if there is a service, call the first one available to start core/hmi
			//POST request to service with endpoint /cores, passing in what user sent
			if (results.length > 0) {
				console.log(results);
				needle.post(`${results[0]}/v1/cores`, req.body, function (err, res) {
					if (ress) {
						console.log(res.body);
					}
				});
			}
			else {
				console.log("No servers found");
			}
			res.sendStatus(200);
		});
	});

	//doesn't accurately model the final version of the portal
	//just take a post request and output the information from requesting
	//a core
	app.post('/v1/address', function (req, res) {
		console.log(req.body);
	});
}