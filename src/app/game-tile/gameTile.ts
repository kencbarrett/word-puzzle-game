export class GameTile {
  value: string;
  dataState: string;
  dataAnimation: string;

  constructor() {
    this.value = "A";
    this.dataState = "empty";
    this.dataAnimation = "idle";
  }
}