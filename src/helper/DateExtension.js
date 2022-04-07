export default class DateExtension {
  static setMinNSecToZero(date) {
    date.setMinutes(0);
    date.setSeconds(0);
  }

  static toPreviousHour(date) {
    const newDate = new Date(date);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    return newDate;
  }

  static toNextHour(date) {
    const newDate = new Date(date);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setHours(newDate.getHours() + 1);
    return newDate;
  }
}
