exports.addProps = (arr, key, value) => {
  arr.forEach((el, idx) => {
    arr[idx] = arr[idx].toJSON();
    arr[idx][key] = value;
  });
};
