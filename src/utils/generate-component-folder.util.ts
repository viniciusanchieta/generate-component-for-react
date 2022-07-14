export const generateComponentFolder = (pathSelected: string, name: string) => {
  const fs = require('fs');
	const path = require('path');
  let formattedNameFolder = name;
  formattedNameFolder = formattedNameFolder.replace(/[^a-zA-Z0-9]/g, " ");
  formattedNameFolder = formattedNameFolder.replace(/\s/g, "-");
  formattedNameFolder = formattedNameFolder.toLowerCase();
  const pathComponent = path.join(pathSelected, formattedNameFolder);
  if(!fs.existsSync(pathComponent)){
    fs.mkdirSync(pathComponent);
  }
  return pathComponent;
};