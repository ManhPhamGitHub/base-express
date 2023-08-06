const configs = require('../configs');
const fs = require("fs");
const sharp = require("sharp");

async function saveImage(image, makeThumbnail= true, prefix = "/") {
    const date = new Date();
    let dir = `${configs.store.IMAGE_FOLDER}/`;
    let dirThumbnail = `${configs.store.IMAGE_FOLDER}/`;
    if (prefix === 'avatars') {
        dir = `${configs.store.IMAGE_FOLDER}/${prefix}`;
    }
    if (prefix === 'docs') {
        dir = `${configs.store.IMAGE_FOLDER}/${prefix}`;
    }
    await mkdirs(dir);
    let fileName = `image-${date.getTime()}-${Math.floor(Math.random() * date.getTime())}`;
    return new Promise((resolve, reject) => {
        const imageTypeIndex = image.indexOf(";base64,");
        let imageExt = '.png';
        let base64Data = image;
        if (imageTypeIndex > 0) {
            const imageType = image.substring(0, imageTypeIndex);
            if (imageType.includes('jpeg')) {
                imageExt = '.jpg';
            }
            base64Data = image.substring(imageTypeIndex + 8);
        }

        // let base64Data = image.replace(/^data:image\/\.+;base64,/, "");
        // console.log(base64Data)
        const path = `${dir}/${fileName}${imageExt}`;
        fs.writeFile(path, base64Data, 'base64', async function (err) {
            if (err) {
                return reject(err);
            }
            if (!makeThumbnail) {
                return resolve({path});
            }
            try {
                const thumbnailPath = `${dirThumbnail}/${fileName}-thumbnail${imageExt}`;
                await resizeImage(path, thumbnailPath);
                return resolve({path, thumbnailPath});
            } catch (error) {
            }
            return resolve({path});
        });
    })
}

async function resizeImage(filePath, thumbnailPath) {
    sharp(filePath)
        .resize(142, null)
        .toBuffer()
        .then((data) => {
            fs.writeFileSync(thumbnailPath, data);
        })
        .catch((error) => {
            console.log("statusRoute |  Error In Uploading Status Image" + error);
            throw error;
        });
}

async function mkdirs(path) {
    let dirs = path.split("/");
    let currentPath = dirs[0];
    for (let i = 1; i < dirs.length; i++) {
        if (!fs.existsSync(currentPath) && currentPath.trim()) {
            fs.mkdirSync(currentPath);
        }
        currentPath += "/" + dirs[i];
    }
    if (!fs.existsSync(currentPath) && currentPath.trim()) {
        fs.mkdirSync(currentPath);
    }
}

module.exports = {
    saveImage,
    mkdirs,
}
