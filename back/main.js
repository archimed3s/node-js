import config from './config/config.json';
import User from './models/user.module';
import Product from './models/product.module';
import path from 'path';
import DirWatcher from './models/dirwatcher';
import Importer from './models/importer';
import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

let user = new User();
let product = new Product();

console.log(config);

let csvDataPath = path.join(__dirname, `data`);

DirWatcher.watch(csvDataPath, 1000);

eventEmitter.on(`dirwatcher:changed`, (event) => {
	let data = Importer.importSync(path.join(csvDataPath, event));

	console.log(`dirwatcher:changed`);
	console.log(`Importer.importSync data: `, data);
});

eventEmitter.on(`dirwatcher:changed`, (event) => {
	Importer.import(path.join(csvDataPath, event))
		.then(data => {
				console.log(`dirwatcher:changed async`);
				console.log(`Importer.import data: `, data);
			},
			error => {
				console.log(error);
			});
});