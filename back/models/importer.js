import fs from 'fs';
import csv from 'csvtojson';
import EventEmitter from 'events';

export default class Importer {
	constructor() {}

	static import(path) {
		return new Promise((resolve, reject) => {
			csv({noheader: false})
				.fromFile(path)
				.on(`end_parsed`, (data) => {
					return resolve(data);
				})
				.on(`error`, (error) => {
					return reject(error);
				})
		})
	}

	static importSync(path) {
		let file = fs.readFileSync(path);
		let [headers, ...lines] = file.toString().split(` `);

		headers = headers.split(`,`);

		return lines.map((line) => {
			return line.split(`,`).reduce((acc, field, i) => {
				return {...acc, [headers[i]]: field}
			})
		})
			.slice(0, -1);
	}
}