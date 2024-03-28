export const convertTimeFormatMDY = (raw) => {
  if (!raw) return "";
  const date = new Date(raw);
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const convertTimeFormatHMDY = (raw) => {
  if (!raw) return "";
  const date = new Date(raw);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${formattedHours}:${minutes}${ampm}, ${month}/${day}/${year}`;
};
