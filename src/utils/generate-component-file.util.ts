export const generateComponentFile = (name: string, folderComponent: string) => {
  const fs = require('fs');
	const path = require('path');
  let formattedComponentFile = name;
  formattedComponentFile = formattedComponentFile.replace(/[^a-zA-Z0-9]/g, " ");
  formattedComponentFile = formattedComponentFile.replace(/\s/g, "-");
  formattedComponentFile = formattedComponentFile.toLowerCase();
  const pathComponent = path.join(folderComponent, formattedComponentFile + ".tsx");
  if(!fs.existsSync(pathComponent)){
    fs.writeFileSync(pathComponent, "");
  }
  return pathComponent;
};