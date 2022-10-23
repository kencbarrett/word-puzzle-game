export enum ComplexityLevel {
  Easy,
  Medium,
  Hard
}

export namespace ComplexityLevel {
  export function keys() {
    return Object.keys(ComplexityLevel).filter(k => isNaN(Number(k)) && k != "keys");
  }
}