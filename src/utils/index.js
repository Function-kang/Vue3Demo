export const toTree = (data) => {
  const tree = [];
  const otherObj = {};

  data.forEach((item) => {
    item.children = [];
    otherObj[item.id] = item;
  });

  data.forEach((item) => {
    if (item.pid) {
      otherObj[item.pid].children.push(item);
    } else {
      tree.push(item);
    }
  });
  return tree;
};
