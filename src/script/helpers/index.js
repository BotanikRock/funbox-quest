const moveItemInArray = (arr, oldIndex, newIndex, origArr) => {
  return arr.reduce((cur, acc, index) => {
    let item;

    if (index < oldIndex && newIndex < index) {
      item = cur;
    }

    if (oldIndex >= index && index < newIndex) {
      item = origArr[index + 1];
    }

    if (index === newIndex) {
      item = origArr[oldIndex];
    }

    return [...acc, item];
  }, []);
};

export {moveItemInArray};
