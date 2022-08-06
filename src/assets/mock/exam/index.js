import Mock, { Random } from "mockjs";

const list = [];
for (let i = 0; i < 10; i++) {
  let obj = {
    id: i + 1,
    nm: Random.string("upper", 4),
    subject: Random.string(50),
    type: Random.integer(1, 4),
    /**
     * @type 1-单选题
     *       2-多选题
     *       3-判断题
     *       4-问答题
     * */
    answer: [],
  };
  if (obj.type === 1 || obj.type === 2) {
    for (let j = 0; j < 4; j++) {
      obj.answer.push({
        id: i + "-" + j,
        title: Random.string(10),
      });
    }
  }
  list.push(obj);
}
const examList = Mock.mock({
  list,
  total: list.length,
});
Mock.mock("/exam/paper/allList", "get", examList);
