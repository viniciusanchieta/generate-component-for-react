import * as vscode from 'vscode';
import { FormatTypesExampleEnum } from './enums';
import { FormatNameProps, createFilesProps } from './interfaces';
import { formateNameFile, formatNameComponent, generateFiles, generateFolder, writeFile } from './utils';
export function activate(context: vscode.ExtensionContext) {

	function folderSelected(){
		const getFolder = vscode.workspace.workspaceFolders;
		if(getFolder){
			const lastFolder = getFolder[getFolder.length - 1];
			return lastFolder.uri.fsPath;
		}
		return false;
	}

	let disposable = vscode.commands.registerCommand('generate-component-and-style.gc', async () => {

		async function getNameComponent(){
			const name = await vscode.window.showInputBox({
				placeHolder: "Ex.: button group",
				prompt: "Enter the name of the component",
				value: "",
				validateInput: (value: string) => {
					if(value.length === 0){
						return "Component name is required";
					}
					return null;
				}
			});
			return name ? name : false;
		}

		async function getSelectedPath(){

			const folder = await vscode.window.showQuickPick([
				{
					label: "Choose folder",
					description: "",
					detail: "",
					picked: true
				}
			], {
				placeHolder: "Choose folder"
			}) as vscode.QuickPickItem;
			if(folder.label === "Default folder"){
				return folderSelected() + "/src/components/";
			}
			const folderPath = await vscode.window.showOpenDialog({
				canSelectFiles: false,
				canSelectFolders: true,
				canSelectMany: false,
				openLabel: "Select folder"
			});
			return folderPath ? folderPath[0].fsPath : false;

		}

		async function chooseLibrary(){
			const library = await vscode.window.showQuickPick([
				{
					label: "Material UI",
					description: "",
					detail: "",
					picked: true,
					value: "material-ui"
				},
				{
					label: "Styled Components",
					description: "",
					detail: "",
					picked: false,
					value: "styled-components"
				},
				{
					label: "Create style without library",
					description: "",
					detail: "",
					picked: false,
					value: "no-library"
				},
				{
					label: "Don't create style",
					description: "",
					detail: "",
					picked: false,
					value: "no-style"
				}

			], {
				placeHolder: "Choose library"
			}) as any;
			return library ? library.value : false;
		}

		async function chooseFormatNameFiles(){
			const format = await vscode.window.showQuickPick([
				{
					label: "Kebab Case",
					description: FormatTypesExampleEnum.kebabCase,
					detail: "",
					picked: false,
					value: "kebabCase"
				},
				{
					label: "PascalCase",
					description: FormatTypesExampleEnum.PascalCase,
					detail: "",
					picked: false,
					value: "pascalCase"
				}

			], {
				placeHolder: "Choose file name format"
			}) as any;
			return format ? format.value : false;
		}

		async function createFiles({nameComponent, pathSelected, chooseLibrary, chooseFormatNameFiles} : createFilesProps){
			const formatName = formateNameFile({ chosenNameFormat: chooseFormatNameFiles, nameComponent } as FormatNameProps);
			const pathComponent = generateFolder({ pathSelected, nameComponent: formatName });

			const formatNameFunctionComponent = formatNameComponent({nameComponent} as FormatNameProps);

			const files = generateFiles({
				nameComponent: formatName, 
				pathComponent: pathComponent,
				generateStyle: chooseLibrary !== "no-style"
			});
			switch(chooseLibrary){
				case "material-ui":
					writeFile({
						pathFile: files.styleGenerated,
						contentFile: "import { makeStyles } from '@mui/styles';\n\nexport default makeStyles({\n	container: {}\n});\n"
					});
					writeFile({
						pathFile: files.componentGenerated,
						contentFile: "import makeStyles from './" + formatName + "-styles'; \n\nfunction " + formatNameFunctionComponent.nameFunctionComponent + "() {\n	const classes = makeStyles();\n	return (\n		<h1 className={classes.container}>Hello World</h1>\n	);\n}\n\nexport default " + formatNameFunctionComponent.nameFunctionComponent + ";"
					});
					break;
				case "styled-components":
					writeFile({
						pathFile: files.styleGenerated,
						contentFile: "import styled from 'styled-components';\n\nexport const Container = styled.div``;\n"
					});
					writeFile({
						pathFile: files.componentGenerated,
						contentFile: "import { Container } from './" + formatName + "-styles'; \n\nfunction " + formatNameFunctionComponent.nameFunctionComponent + "() {\n	return (\n		<Container>Hello World</Container>\n	);\n}\n\nexport default " + formatNameFunctionComponent.nameFunctionComponent + ";"
					});
					break;
				case "no-library":
					writeFile({
						pathFile: files.styleGenerated,
						contentFile: "export const container = {};\n"
					});
					writeFile({
						pathFile: files.componentGenerated,
						contentFile: "import { container } from './" + formatName + "-styles'; \n\nfunction " + formatNameFunctionComponent.nameFunctionComponent + "() {\n	return (\n		<div className={container}>Hello World</div>\n	);\n}\n\nexport default " + formatNameFunctionComponent.nameFunctionComponent + ";"
					});
					break;
				case "no-style":
					writeFile({
						pathFile: files.componentGenerated,
						contentFile: "function " + formatNameFunctionComponent.nameFunctionComponent + "() {\n	return (\n		<h1>Hello World</h1>\n	);\n}\n\nexport default " + formatNameFunctionComponent.nameFunctionComponent + ";"
					});
					break;
			}

			writeFile({
				pathFile: files.testGenerated,
				contentFile: "import { render } from '@testing-library/react';\nimport " + formatNameFunctionComponent.nameFunctionComponent + " from './" + formatName + "';\n\nconst makeSut = () => render(<" + formatNameFunctionComponent.nameFunctionComponent + " />);\n\ndescribe('" + formatNameFunctionComponent.nameFunctionComponent + "', () => {\n	test('should render', () => {\n		makeSut();\n	});\n});\n"
			});
			
			writeFile({
				pathFile: files.exportComponentGenerated,
				contentFile: "export { default as " + formatNameFunctionComponent.nameComponentExport + " } from './" + formatName + "';"
			});

			vscode.window.showInformationMessage(`Component ${nameComponent} created successfully 🎉`);
		}

		if(!getNameComponent() || !getSelectedPath() || !chooseLibrary()){
			vscode.window.showInformationMessage("Something went wrong 😢");
			return;
		}
		const nameComponent = await getNameComponent();
		const pathSelected = await getSelectedPath();
		const library = await chooseLibrary();

		const formatNameFiles = await chooseFormatNameFiles();
		createFiles({
			nameComponent,
			pathSelected,
			chooseLibrary: library,
			chooseFormatNameFiles: formatNameFiles
		});
		
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
