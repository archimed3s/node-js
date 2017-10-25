const path = require('path');
const fs = require('fs');
const yargs = require('yargs');
const request = require('request');
const csv2 = require('csv2');
const through2 = require('through2');
const CombinedStream = require('combined-stream');

function inputOutput(filePath = path.join('backend', 'data', 'MOCK_DATA.csv')) {
  console.log('inputOutput');

  fs.createReadStream(filePath)
    .pipe(process.stdout);
}

function transform() {
  console.log('transform');

  process.stdin
    .pipe(through2(function (buffer, encoding, next) {
      this.push(buffer.toString().toUpperCase());
      next();
    }, function (done) {
      done();
    }))
    .pipe(process.stdout);
}

function transformFile(filePath = path.join('backend', 'data', 'MOCK_DATA.csv')) {
  console.log('transformFile');

  fs.createReadStream(filePath)
    .pipe(csv2())
    .pipe(through2({objectMode: true}, function (chunk, enc, next) {
      const [id, name, brand, company, price, isbn] = chunk;

      this.push(JSON.stringify({id, name, brand, company, price, isbn}) + ', \n');
      next();
    }))
    .pipe(process.stdout);
}

function transformFileToJSON(filePath = path.join('backend', 'data', 'MOCK_DATA.csv')) {
  console.log('fileToJSON');
  let data = [];
  const writeStream = fs.createWriteStream(path.join('backend', 'data', 'MOCK_DATA.json'));

  fs.createReadStream(filePath)
    .pipe(csv2())
    .pipe(through2({objectMode: true}, function (chunk, enc, next) {
      const [id, name, brand, company, price, isbn] = chunk;

      this.push({id, name, brand, company, price, isbn});
      next();
    }))
    .on('data', function (chunk) {
      data.push(chunk);
    })
    .on('end', function () {
      writeStream.write(JSON.stringify(data));
      writeStream.end();
      data = [];
    });
}


function httpClient() {
  console.log('client');
}

function httpServer() {
  console.log('server');
}

function bundleCss(filesPath = pathpath.join('frontend', 'assets', 'css')) {
  const combinedStream = CombinedStream.create();

  fs.readdir(filesPath, (err, files) => {
    files.forEach(file => {
      combinedStream.append(fs.createReadStream(path.join('frontend', 'assets', 'css', file)))
    });

    combinedStream
      .append(request('https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css'))
      .pipe(fs.createWriteStream(path.join('frontend', 'assets', 'css', 'bundle.css')));
  })
}

function printHelpMessage() {
  console.log('message');
}

let argv = yargs
  .alias('a', 'action')
  .alias('h', 'help')
  .alias('p', 'path')
  .option('help')
  .help('help')
  .argv;

function main() {
  let {action, file, path, help} = argv;
  console.log('action: ', action, 'file: ', file, 'help', help);

  if (!!help) {
    return;
  }

  if (!action) {
    console.log('not correct params');
    return;
  }

  switch (action) {
    case 'io':
      inputOutput(file);
      return;
    case 'transform':
      transform();
      return;
    case 'transform-file':
      transformFile(file);
      return;
    case 'transform-file-to-json':
      transformFileToJSON(file);
      return;
    case 'bundle-css':
      bundleCss(path);
      return;
    default:
      return;
  }
}

main();