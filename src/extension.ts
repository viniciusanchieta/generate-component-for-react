import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {

	function folderSelected(){
		const getFolder = vscode.workspace.workspaceFolders;
		if(getFolder){
			const lastFolder = getFolder[getFolder.length - 1];
			return lastFolder.uri.fsPath;
		}
		return "";
	}

	let disposable = vscode.commands.registerCommand('generate-component-and-style.gc', async () => {

		async function getNameComponent(){
			const name = await vscode.window.showInputBox({
				placeHolder: "Component name",
				value: "",
				validateInput: (value: string) => {
					if(value.length === 0){
						return "Component name is required";
					}
					return null;
				}
			});
			return name ? name : "";
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
			return folderPath ? folderPath[0].fsPath : "";

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
			return library ? library.value : "";
		}

		async function createComponent(nameComponent: string, pathSelected: string, library: string){
			const fs = require('fs');
			const path = require('path');

			const nameComponentLowerCase = nameComponent.toLowerCase();

			const createFolder = path.join(pathSelected, nameComponentLowerCase);
			fs.mkdirSync(createFolder);
			const componentFile = path.join(createFolder, nameComponentLowerCase + '.tsx');
			
			const indexFile = path.join(createFolder, 'index.ts');

			const nameFunctionComponent = nameComponent.charAt(0).toUpperCase() + nameComponent.slice(1) + "Component";

			switch(library){
				case "material-ui":
					const styleFileMui = path.join(createFolder, nameComponentLowerCase + '-style.ts');
					const styleFileContentMui = "import { makeStyles } from '@mui/styles';\n\nexport default makeStyles({\n	container: {}\n});\n";
					fs.writeFileSync(styleFileMui, styleFileContentMui);
					const componentFileContentMui = "import makeStyles from './" + nameComponentLowerCase + "-style';\n\nfunction " + nameFunctionComponent + "() {\n	const classes = makeStyles();\n	return (\n		<h1 className={classes.container}>Hello World</h1>\n	);\n}\n\nexport default " + nameFunctionComponent + ";";
					fs.writeFileSync(componentFile, componentFileContentMui);
					break;
				case "styled-components":
					const styleFileSc = path.join(createFolder, nameComponentLowerCase + '-style.ts');
					const styleFileContentSc = "import styled from 'styled-components';\n\nexport const Container = styled.div``;\n";
					fs.writeFileSync(styleFileSc, styleFileContentSc);
					const componentFileContentSc = "import { Container } from './" + nameComponentLowerCase + "-style';\n\nfunction " + nameFunctionComponent + "() {\n	return (\n		<Container>Hello World</Container>\n	);\n}\n\nexport default " + nameFunctionComponent + ";";
					fs.writeFileSync(componentFile, componentFileContentSc);
					break;
				case "no-library":
					const styleFileNoLibrary = path.join(createFolder, nameComponentLowerCase + '-style.ts');
					const styleFileContentNoLibrary = "export const container = {};\n";
					fs.writeFileSync(styleFileNoLibrary, styleFileContentNoLibrary);
					const componentFileContentNoLibrary = "import { container } from './" + nameComponentLowerCase + "-style';\n\nfunction " + nameFunctionComponent + "() {\n	return (\n		<h1 className={container}>Hello World</h1>\n	);\n}\n\nexport default " + nameFunctionComponent + ";";
					fs.writeFileSync(componentFile, componentFileContentNoLibrary);
					break;
				case "no-style":
					const componentFileContentNoStyle = "function " + nameFunctionComponent + "() {\n	return (\n		<h1>Hello World</h1>\n	);\n}\n\nexport default " + nameFunctionComponent + ";";
					fs.writeFileSync(componentFile, componentFileContentNoStyle);
					break;
			}

			const indexFileContent = `export { default as ${nameComponentLowerCase.charAt(0).toUpperCase() + nameComponentLowerCase.slice(1) + "Tag"} } from './${nameComponentLowerCase}';`;
			fs.appendFileSync(indexFile, indexFileContent);

			const testFileContent = `import { render } from '@testing-library/react';\nimport ${nameFunctionComponent} from './${nameComponentLowerCase}';\n\nconst makeSut = () => render(<${nameFunctionComponent} />);\n\ndescribe('${nameFunctionComponent}', () => {\n	test('should render', () => {\n		makeSut();\n	});\n});\n`;
			const testFile = path.join(createFolder, nameComponentLowerCase + '.spec.tsx');
			fs.writeFileSync(testFile, testFileContent);

			vscode.window.showInformationMessage(`Component ${nameComponent} created successfully`);
			
		}

		const nameComponent = await getNameComponent();
		const pathSelected = await getSelectedPath();
		const library = await chooseLibrary();
		createComponent(nameComponent, pathSelected, library);
		
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
