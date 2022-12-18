interface GenerateFolderPros{
  pathSelected: string | false;
  nameComponent: string | false;
  isInterface: boolean;
}

export const generateFolder = ({pathSelected, nameComponent, isInterface}: GenerateFolderPros) => {
  const fs = require('fs');
	const path = require('path');

  const pathComponent = path.join(pathSelected, nameComponent);
  if(!fs.existsSync(pathComponent)){
    fs.mkdirSync(pathComponent);
    
    if(isInterface){
      const pathInterface = path.join(pathComponent, 'interfaces');
      fs.mkdirSync(pathInterface);
    }
  }
  return pathComponent;
};