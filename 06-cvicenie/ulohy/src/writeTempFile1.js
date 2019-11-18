module.exports = writeTempFile;

const fs = require("fs");
const os = require("os");
const path = require("path");
const assert=require("assert");

function writeTempFile(fileName, ...args) {

const cb = args.pop();



const tempDir = path.join(os.tmpdir(), `${process.pid}-`);
  fs.mkdtemp(tempDir, (err, folder) => {
    if (err) return cb(err);
    const tempFile = path.resolve(folder, fileName);
    //const tempFile= folder + "/" + fileName;
    try{
    fs.writeFile(tempFile, ...args, (err) => {
      if (err) return cb(err);
      cb(null, tempFile);
    })
  }catch(err){
    cb(err);
  }
});


}

// just hints:
// const cb = args.pop();
// const tempDir = path.join(os.tmpdir(), `${process.pid}-`);
// fs.mkdtemp(tempDir, (err, folder) => {
// fs.writeFile(tempFile, ...args, (err) => {


    // chyba vyskladanie tempDir,

      /// ODZNOVA
/*
      const cb = args.pop();
    const tempDir = path.join(os.tmpdir(), `${process.pid}-`);
    fs.mkdtemp(tempDir, (err, tempDir) => {

    })











  cb(null, fileName);*/
  // cn(err); V zlom scneari to vracia, to by sme uz mali mat
