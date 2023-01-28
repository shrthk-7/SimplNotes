const handleEdit = (e, value) => {
  if (e.key === "Backspace") value = value.slice(0, -1);
  if (e.key.length === 1) value += e.key;
  return value;
};

export default handleEdit;
