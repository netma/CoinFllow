export class TimeComponent {
  constructor() {
    this.displayTime();
  }

  displayTime() {
    let timeElement = document.querySelector('#time');
    if (!timeElement) {
      return;
    }
    let currentDate = new Date();
    let currentTime = currentDate.toLocaleTimeString().split(':');
    timeElement.innerHTML = currentTime[0] + ':' + currentTime[1];
    setTimeout(()=>this.displayTime(), 1000);
  }
}
