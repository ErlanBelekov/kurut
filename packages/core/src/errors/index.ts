export class KurutError extends Error {
  public isKurutError: boolean;

  constructor(errorMessage: string) {
    super(errorMessage);
    this.isKurutError = true;
  }
}

export class NoRowsError extends KurutError {
  constructor() {
    super('Query returned no rows');
  }
}
