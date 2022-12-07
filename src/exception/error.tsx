class ParameterValidateError extends Error {
  errorKey: string;

  constructor(message, errorKey) {
    super(message);
    this.name = 'ParameterValidateError';
    this.errorKey = errorKey;
  }
}

export { ParameterValidateError };
