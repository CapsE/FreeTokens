const Jimp = require('jimp');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});

// get all image files in the current directory
const imageFiles = fs.readdirSync(__dirname + '/tokens').filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));
const thumbnailFiles = fs.readdirSync(__dirname + '/thumbnails').filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));

let count = 0;
let doneCount = 0;
let skip = 0;

// create a new image for each image file
imageFiles.forEach((file) => {
    const thumbnailFile = file.split('.')[0] + '.jpg';
    if(thumbnailFiles.indexOf(thumbnailFile) !== -1) {
        skip++;
        return;
    }
    count++;

    Jimp.read('./tokens/' + file).then((image) => {
        image.resize(128, 128);

        image.write('./thumbnails/' + thumbnailFile, (err) => {
            if (err) throw err;
            doneCount++;
            console.log('done ' + doneCount + ' of ' + count);
        });
    });

});

setInterval(() => {
    if(doneCount >= count) {
        console.log(`done ${doneCount} of ${count} (skipped ${skip})`);
        process.exit(0);
    }
}, 200);
