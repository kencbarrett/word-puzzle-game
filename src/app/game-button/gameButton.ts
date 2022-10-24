export class GameButton {
  value: string;
  currentState: string;

  constructor(value: string) {
    this.value = value;
    this.currentState = "";
  }

  setCurrentState(currentState: string) {
    this.currentState = currentState;
  }

  reset() {
    this.currentState = "";
  }
}