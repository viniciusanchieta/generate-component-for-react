interface GenerateFolderPros{
  pathSelected: string | false;
  nameComponent: string | false;
}

export const generateFolder = ({pathSelected, nameComponent}: GenerateFolderPros) => {
  const fs = require('fs');
	const path = require('path');

  const pathComponent = path.join(pathSelected, nameComponent);
  if(!fs.existsSync(pathComponent)){
    fs.mkdirSync(pathComponent);
  }
  return pathComponent;
};