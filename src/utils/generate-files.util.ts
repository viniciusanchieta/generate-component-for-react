import { ReplaceEnum } from '../enums';


interface GenerateFilesPros{
  pathComponent: string;
  nameComponent: string;
  generateStyle: boolean;
  generateInterface: boolean;
}

export const generateFiles = ({pathComponent, nameComponent, generateStyle, generateInterface}: GenerateFilesPros) => {
  const fs = require('fs');
	const path = require('path');

  const generateFileComponent = path.join(pathComponent, nameComponent + '.tsx');
  const generateFileTest = path.join(pathComponent, nameComponent + '.spec.tsx');
  const generateFileStyle = generateStyle && path.join(pathComponent, nameComponent + '-styles.ts');
  const generateFileExportComponent = path.join(pathComponent, 'index.ts');
  const generateFileInterface = generateInterface && path.join(pathComponent, 'interfaces', nameComponent + '-props.interface.ts');
  const generateFileExportInterface = generateInterface && path.join(pathComponent, 'interfaces', 'index.ts');

  return {
    componentGenerated: generateFileComponent,
    testGenerated: generateFileTest,
    styleGenerated: generateFileStyle,
    exportComponentGenerated: generateFileExportComponent,
    interfaceGenerated: generateFileInterface,
    exportInterfaceGenerated: generateFileExportInterface
  }

};