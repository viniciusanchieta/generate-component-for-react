type WriteFilePros = {
  pathFile: string;
  contentFile: string;
}

export const writeFile = ({pathFile, contentFile}: WriteFilePros) => {
  const fs = require('fs');
  if(!fs.existsSync(pathFile)){
    fs.writeFileSync(pathFile, contentFile);
  }
}