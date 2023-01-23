import { FormatNameProps } from "../interfaces";
import replaces from "./replaces";

export const formatNameComponent = ({
  nameComponent,
}: FormatNameProps) => {
  
 const nameComponentInFunction = nameComponent
 .replace(replaces.specialCharacters, " ")
 .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
 .join("");

  return {
    nameFunctionComponent: nameComponentInFunction + 'Component',
    nameComponentExport: nameComponentInFunction + 'Tag',
    nameComponent: nameComponentInFunction,
  }
}