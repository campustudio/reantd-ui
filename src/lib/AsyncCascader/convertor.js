const formatKeys = (arr) => {
  let newArr = [];

  if (arr instanceof Array) {
    newArr = arr.map((ele, idx) => {
      return {
        value: ele.value || idx + '',
        label: ele.label || idx + '',
        isLeaf: false,
      };
    });
  }

  return newArr;
};

const formatLeafKeys = (arr) => {
  let newArr = [];

  if (arr instanceof Array) {
    newArr = arr.map((ele, idx) => {
      return {
        value: ele.value || idx + '',
        label: ele.label || idx + '',
        isLeaf: true,
      };
    });
  }

  return newArr;
};

export default {
  formatKeys,
  formatLeafKeys,
};
