import { ReplaceEnum } from '../enums';


interface GenerateFilesPros{
  pathComponent: string;
  nameComponent: string;
  generateStyle: boolean;
}

export const generateFiles = ({pathComponent, nameComponent, generateStyle}: GenerateFilesPros) => {
  const fs = require('fs');
	const path = require('path');

  const generateFileComponent = path.join(pathComponent, nameComponent + '.tsx');
  const generateFileTest = path.join(pathComponent, nameComponent + '.spec.tsx');
  const generateFileStyle = generateStyle && path.join(pathComponent, nameComponent + '-styles.ts');
  const generateFileExportComponent = path.join(pathComponent, 'index.ts');

  return {
    componentGenerated: generateFileComponent,
    testGenerated: generateFileTest,
    styleGenerated: generateFileStyle,
    exportComponentGenerated: generateFileExportComponent
  }

};