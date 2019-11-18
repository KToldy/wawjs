const fs = require("fs").promises;
const path = require("path")

module.exports = lsRescursive

async function lsRescursive(dirName) {


let result = dirsOnly(await ls(dirName))
result = result.map(({name}) =>
                  path.resolve(dirName, name))
result = result.map(ls)
result = await Promise.all(result)
result = [].concat(...result)
return filesOnly(result).map(({name}) => name)

}

async function ls(dirName) {
  return fs.readdir(dirName, {
    withFileTypes: true
  });
}

function dirsOnly(files) {
  return files.filter((f) => f.isDirectory());
}

function filesOnly(files) {
  return files.filter((f) => f.isFile());
}
