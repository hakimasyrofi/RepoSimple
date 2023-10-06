export function getTimeDifference(apiDateTime: string): string {
  const apiDate = new Date(apiDateTime);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - apiDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const weeksDifference = Math.floor(daysDifference / 7);

  if (weeksDifference >= 3) {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const formattedDate = `${
      monthNames[apiDate.getMonth()]
    } ${apiDate.getDate()}`;
    return formattedDate;
  } else if (weeksDifference > 0) {
    return `${weeksDifference} ${weeksDifference === 1 ? 'week' : 'weeks'} ago`;
  } else if (daysDifference > 0) {
    return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutesDifference > 0) {
    return `${minutesDifference} ${
      minutesDifference === 1 ? 'minute' : 'minutes'
    } ago`;
  } else {
    return `${secondsDifference} ${
      secondsDifference === 1 ? 'second' : 'seconds'
    } ago`;
  }
}
