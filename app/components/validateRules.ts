export const isRequired = (value: string) => (value ? undefined : '不能为空');
export const isMaxLength = (max: number) => (value: string) =>
  value && value.length > max ? `不能超过${max}` : undefined;
export const isMaxLength15 = isMaxLength(15);
export const isMinLength = (min: number) => (value: string) =>
  value && value.length < min ? `最小长度位${min}` : undefined;
export const isMinLength8 = isMinLength(8);

export const isMinLength6 = isMinLength(6);
export const isEmail = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? '请输入有效的电子邮件'
    : undefined;
export const isAlphaNumeric = (value: string) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? '请输入字符或者数字' : undefined;

  export  const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

  export const mustBeNumber = value => (isNaN(value) ? '请输入数字' : undefined)
