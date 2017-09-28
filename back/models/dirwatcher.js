import fs from 'fs';
import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

export default class DirWatcher {
	constructor() {}

	static watch(path) {
		fs.watch(path, (event, file) => {
			if(event === `change`) {
				eventEmitter.emit(`dirwatcher:changed`, file);
			}
		})
	}
}