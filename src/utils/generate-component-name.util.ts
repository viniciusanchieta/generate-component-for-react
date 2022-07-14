export const generateComponentName = (name: string) => {
  let formattedComponentName = name;
  formattedComponentName = formattedComponentName.replace(/[^a-zA-Z0-9]/g, " ");
  formattedComponentName = formattedComponentName.replace(/\s/g, "-");
  formattedComponentName = formattedComponentName.toLowerCase();
  return formattedComponentName;
};