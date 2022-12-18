# Generate component for React

[![Marketplace Version](https://vsmarketplacebadge.apphb.com/version/viniciusanchieta.generate-component-for-react.svg?color=blueviolet)](https://marketplace.visualstudio.com/items?itemName=viniciusanchieta.generate-component-for-react) 
[![Installs](https://vsmarketplacebadge.apphb.com/installs/viniciusanchieta.generate-component-for-react.svg?color=blueviolet)](https://marketplace.visualstudio.com/items?itemName=viniciusanchieta.generate-component-for-react) 
[![Rating](https://vsmarketplacebadge.apphb.com/rating/viniciusanchieta.generate-component-for-react.svg?color=blueviolet)](https://marketplace.visualstudio.com/items?itemName=viniciusanchieta.generate-component-for-react)

This extension generates a component and style for the given component name.

## About

This extension the component with the given name, generates a test file with the [testing-library react](https://testing-library.com/react) library and the style that we can choose from 3 possibilities:
- [Material-UI](https://material-ui.com/)
- [Styled-Components](https://styled-components.com/)
- Style without library
- Without style

## Usage

### Step 1:
- After the extension is installed, press the `Ctrl+Shift+P` or `Cmd+Shift+P` key combination to open the command palette.
- Type `generate component` and press `Enter` to generate a component.

<p align="left">
  <img src="./src/img/step-one.gif" width="500" />
</p>

### Step 2:
- Type the component name and press `Enter`.

<p align="left">
  <img src="./src/img/step-two.gif" width="500" />
</p>

### Step 3:
- Choose the folder where you want to generate the component or choose path default (`src/components`).
- `Warning: Option Default folder is not available. Will soon be available!`.

<p align="left">
  <img src="./src/img/step-three.png" width="500" />
</p>

### Step 4:

- Choose the style library you want to use.
- Choose between `Material-UI` or `Styled-Components` or `Style without library` or `Without style`.


<p align="left">
  <img src="./src/img/step-four.png" width="500" />
</p>

### Step 5:
- Choose if you want to generate interface for the component.
- Choose between `Yes` or `No`.


<p align="left">
  <img src="./src/img/step-five.png" width="500" />
</p>

### Step 6:
- Choose file name format.
- Available formats: KebabCase and PascalCase.
- Example with KebabCase:
  - `button-submit-styles.ts`
  - `button-submit.spec.tsx`
  - `button-submit.tsx`
  - `index.ts`
- Example with PascalCase:
  - `ButtonSubmit-styles.ts`
  - `ButtonSubmit.spec.tsx`
  - `ButtonSubmit.tsx`
  - `index.ts`


<p align="left">
  <img src="./src/img/step-six.png" width="500" />
</p>

### Result:
- Ps. All the files that are generated, contain the start code in each one.

<p align="left">
  <img src="./src/img/result.png" width="200" />
</p>

### About the files
- `button-styles.ts`: Style file for the component.
- `button.spec.tsx`: Test file for the component with the [testing-library react](https://testing-library.com/react).
- `button.tsx`: Component file for the component.
- `index.ts`: Index file for export the component.

## Requirements

If you want to use the style library `Material-UI`, you need to install the `@material-ui/core` package.
```bash
npm install @material-ui/core
```
If you want to use the style library `Styled-Components`, you need to install the `styled-components` package.
```bash
npm install styled-components
```
If you want to use the test library `testing-library react`, you need to install the `@testing-library/react` package.
```bash
npm install @testing-library/react
```

## Contributors

[![](https://contrib.rocks/image?repo=viniciusanchieta/generate-component-for-react)](https://github.com/viniciusanchieta/generate-component-for-react/graphs/contributors)

## License

This project is under the MIT license. See the [LICENSE](LICENSE.md) file for more details.



