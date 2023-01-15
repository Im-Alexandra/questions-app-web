export const useStyles = () => {
  const pickCardColor = (tags) => {
    if (tags.includes("romantic")) {
      return "#e26c54";
    } else if (tags.includes("famFriendly")) {
      return "#2f5e63";
    } else if (tags.includes("justMet")) {
      return "#46bdc6";
    } else if (tags.includes("fun")) {
      return "#cabe55";
    } else {
      return "#46bdc6";
    }
  };

  return { pickCardColor };
};
