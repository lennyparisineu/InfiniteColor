const fs = require("fs");
const readline = require("readline");
let curLine = 0;
let linesPerModule = 3;
let dir = "../classes";

fs.unlinkSync(`${dir}/modules.js`);

let fileStream = fs.createWriteStream(`${dir}/modules.js`, { flags: "a" });

async function processLineByLine() {
  const fileStream = fs.createReadStream("modules.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let modules = [];
  let module = [];
  for await (const line of rl) {
    if (curLine > 0 && curLine % linesPerModule === 0) {
      createModule(modules, module);
      module = [];
    }

    module.push(line);
    ++curLine;
  }

  createModule(modules, module);
  createModulesArray(modules);
}

async function createModule(modules, module) {
  // create new module
  let out = ``;
  let module_name = `MODULE_${modules.length}`;
  modules.push(module_name);

  out += `
    const ${module_name} =  new Module([
  `;

  module.forEach((line, i) => (out += parseLine(line, i)));

  out = out.slice(0, out.length - 1);
  out += `]);`;

  fileStream.write(out + "\n");
}

function parseLine(line, i) {
  let out = ``;
  let curChar;
  const wallHeight = `BLOCK_SIZE * 5`;
  let xVal = (x) => `BLOCK_SIZE * ${x}`;
  let yVal = (isWall) =>
    `(canvas.clientHeight / 2) - (BLOCK_SIZE) + (${i} * 2 * BLOCK_SIZE) ${
      isWall ? `- ${wallHeight} + BLOCK_SIZE` : ""
    }`;
  for (let x = 0; x < line.length; ++x) {
    curChar = line[x];
    switch (curChar) {
      case "=":
        out += `new Block(${xVal(x)}, ${yVal(false)}),`;
        break;
      case "c":
        out += `new Block(${xVal(x)}, ${yVal(true)})
                    .setRandomColor()
                    .setDimensions(BLOCK_SIZE, ${wallHeight} ),`;
      default:
        break;
    }
  }
  return out;
}

function createModulesArray(modules) {
  let out = `let ALL_MODULES = [`;
  modules.forEach((module) => (out += module + ","));
  out = out.slice(0, out.length - 1);
  out += `];`;
  fileStream.write(out + "\n");
}

processLineByLine();
