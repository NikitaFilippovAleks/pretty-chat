const getTime = (dateData: string): string => {
  const date = new Date(dateData);

  const time = `${date.getHours()}:${date.getMinutes()}`;

  return time;
};

export default getTime;
