const moveItemInArray = (arr, oldIndex, newIndex) => {
  const newArr = [...arr];

  newArr.splice(newIndex, 0, newArr.splice(oldIndex, 1)[0]);

  return newArr;
};

export {moveItemInArray};
