export default class Workout {
  constructor() {
    this.name = "";
    this.file_name = "";
    this.duration = "";
    this.level = "Beginner";
    this.category = "";
    this.url = "";
    this.instructor = "";
    this.thumbnail = "";
    this.provider_id = 0;
    this.description = "";
  }
}

export const timeOut = (timeout, player) => {
  setTimeout(() => {
    timeout.savingPrevPlayer(player);
  }, 5000);
};
