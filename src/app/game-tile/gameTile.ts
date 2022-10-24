export class GameTile {
  value: string;
  dataState: string;
  dataAnimation: string;

  constructor() {
    this.value = "";
    this.dataState = "empty";
    this.dataAnimation = "idle";
  }

  setValue(newValue: string) {
    if (newValue.length == 0) {
      this.value = newValue;
      this.dataState = "empty";
      this.dataAnimation = "idle";
    }
    else {
      this.value = newValue;
      this.dataState = "tbd";
    }
  }

  setGameTileState(dataState: string, dataAnimation: string) {
    this.dataState = dataState;
    this.dataAnimation = dataAnimation;
  }

  reset() {
    this.value = "";
    this.dataState = "empty";
    this.dataAnimation = "idle";
  }
}