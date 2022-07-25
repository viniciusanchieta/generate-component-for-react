import { ReplaceEnum } from "../enums";
import { FormatNameProps } from "../interfaces";

export const formatNameComponent = ({
  nameComponent,
}: FormatNameProps) => {
  
 const nameComponentInFunction = nameComponent.replace(ReplaceEnum.nonAlphanumeric, " ")
 .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
 .join("");

  return {
    nameFunctionComponent: nameComponentInFunction + 'Component',
    nameComponentExport: nameComponentInFunction + 'Tag',
  }
}