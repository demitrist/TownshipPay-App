// Date helpers for the sales summary 
export const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

export const isSameDay = (a, b) => startOfDay(a).getTime() === startOfDay(b).getTime();

export const formatDay = (d) =>
  new Date(d).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });

export const formatTime = (d) =>
  new Date(d).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });