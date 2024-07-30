export const toISODate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export const toISODateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString();
};

export const formatDateTime = (datetime) => {
  if (!datetime) return '';

  const date = new Date(datetime);
  const [year, month, day, hours, minutes] = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0')
  ];

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};


export const toShortDateFormat = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const toShortDateTimeFormat = (dateString) => {
  return new Date(dateString).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const to12HourFormat = (timeString) => {
  let [hour, minute, second] = timeString.split(':').map(Number);

  const period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;

  return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
}; 