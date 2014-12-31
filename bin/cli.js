#!/usr/bin/env node

var cli = require('commander');

cli.version( process.version );
cli._name = 'frau';

cli.command( 'publish', 'publish a Free Range App' );

cli.parse( process.argv );

if(!cli.args.length) {
	cli.help();
}