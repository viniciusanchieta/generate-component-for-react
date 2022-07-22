export const formatFunctionComponentName = (name: string, prefix: string) => {
  let formattedName = name;
  formattedName = formattedName.replace(/[^a-zA-Z0-9]/g, " ");
  formattedName = formattedName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(""); 
  
  return formattedName + prefix;
};