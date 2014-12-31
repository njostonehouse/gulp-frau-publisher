#!/usr/bin/env node

var cli = require('commander');
var gulp = require('gulp');
var publisher = require('../src/publisher.js');

cli._name = "frau publish";

cli.option( 
		"--sim", 
		"Simulate publication"
	);

cli.option(
		"-t --type <type>",
		"Specify the publication type (app|lib)"
	);

cli.option(
		"-i --id <id>",
		"Set the ID"
	);

cli.option(
		"-k --key <key>",
		"Set the credentials key"
	);

cli.option(
		"-s --secret <secret>",
		"Set the credentials secret"
	);

cli.option(
		"-v --version <semver>",
		"Set the semver version number"
	);

cli.option(
		"-d --dev <tag>",
		"Set the development tag"
	);

cli.parse( process.argv );

if( cli.type != "app" && cli.type != "lib" ) {
	console.log("Error: --type unspecified.");
	process.exit(1);
}

var pub;
try {
	pub = publisher[cli.type]({
		id: cli.id,
		creds: { key: cli.key, secret: cli.secret },
		devTag: cli.dev,
		version: cli.version
	});
} catch (err) {
	console.log("Error: " + err.message);
	process.exit(1);
}

if( pub ) {
	console.log(pub.getLocation());
}

console.log( "Publication of " + cli.type + (cli.sim ? " simulated." : " completed."));

process.exit(0);