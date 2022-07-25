export enum ReplaceEnum {
  nonAlphanumeric = '/[^a-zA-Z0-9]/g',
  space = '/\s/g',
  dash = '/-/g',
  lowercase = '/[A-Z]/g',
  uppercase = '/[a-z]/g',
}