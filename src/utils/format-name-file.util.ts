import { ReplaceEnum } from "../enums";
import { FormatNameProps } from "../interfaces";

export const formatNameFile = ({chosenNameFormat, nameComponent}: FormatNameProps) => {
  let formattedComponentFile = nameComponent;
  switch (chosenNameFormat) {
    case 'pascalCase':
      formattedComponentFile = nameComponent.trim()
      .replace(ReplaceEnum.nonAlphanumeric, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("")
      .trim();
      break;
    default:
      formattedComponentFile = nameComponent.trim()
      .replace(ReplaceEnum.nonAlphanumeric, " ")
      .split(" ")
      .join("-")
      break;
  }

  return formattedComponentFile;
}
