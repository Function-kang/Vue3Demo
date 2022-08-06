<template>
  <div class="main">
    <div class="title">单题模式</div>
    <div class="section">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <div v-if="examList.length">
          <div v-if="item.type === 1">
            <el-form-item :label="item.subject" :prop="item.nm">
              <el-radio-group v-model="ruleForm.radioAnswer">
                <el-radio
                  :label="j"
                  v-for="(i, j) in item.answer"
                  :key="i.id"
                  >{{ i.title }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </div>
          <div v-if="item.type === 2">
            <el-form-item :label="item.subject" :prop="item.nm">
              <el-checkbox-group v-model="ruleForm.checkboxAnswer">
                <el-checkbox
                  :label="j"
                  name="checkboxAnswer"
                  v-for="(i, j) in item.answer"
                  :key="i.id"
                >
                  {{ i.title }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div v-if="item.type === 3">
            <el-form-item :label="item.subject" prop="bool">
              <el-radio-group v-model="ruleForm.boolAnswer">
                <el-radio :label="true">对</el-radio>
                <el-radio :label="false">错</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div v-if="item.type === 4">
            <el-form-item :label="item.subject" prop="textareaAnswer">
              <el-input
                type="textarea"
                v-model="ruleForm.textareaAnswer"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <ExamFooter
      ref="ExamFooter"
      :answerArr="answerArr"
      :answerObj="answerArr[count]"
      :total="examList.length"
      :submitForm="submitForm"
      @mackClick="mackClick"
      @starClick="starClick"
    />
    <el-dialog v-model="dialogTableVisible" title="Shipping address">
      <el-table :data="answerArr">
        <el-table-column property="subject" label="题目" />
        <el-table-column property="answerTitle" label="答案" width="200" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import ExamFooter from "../../components/ExamFooter";
export default {
  name: "examOdd",
  data() {
    return {
      ruleForm: {
        radioAnswer: "",
        checkboxAnswer: [],
        boolAnswer: "",
        textareaAnswer: "",
      },
      examList: [],
      lastCount: undefined,
      count: 0,
      item: {},
      answerArr: [],
      dialogTableVisible: false,
      az: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
    };
  },
  created() {
    this.getList();
  },
  watch: {
    count: function (newVal) {
      this.item = this.examList[newVal];
    },
    ruleForm: {
      handler: function (newVal) {
        const { radioAnswer, checkboxAnswer, boolAnswer, textareaAnswer } =
          newVal;
        const { type, subject } = this.item;
        this.answerArr[this.count].subject = subject;
        if (type === 1 && radioAnswer !== "") {
          this.answerArr[this.count].answer = [
            this.examList[this.count].answer[radioAnswer],
          ];
          this.answerArr[this.count].answerTitle = this.az[radioAnswer];
        } else if (type === 2) {
          this.answerArr[this.count].answer = [];
          let str = "";
          checkboxAnswer.forEach((index) => {
            this.answerArr[this.count].answer.push(
              this.examList[this.count].answer[index]
            );
            str += this.az[index];
          });
          this.answerArr[this.count].answerTitle = str;
        } else if (type === 3) {
          this.answerArr[this.count].answer = boolAnswer;
          this.answerArr[this.count].answerTitle = boolAnswer ? "对" : "错";
        } else if (type === 4) {
          this.answerArr[this.count].answer = textareaAnswer;
          this.answerArr[this.count].answerTitle = textareaAnswer;
        }
      },
      deep: true,
    },
  },
  methods: {
    getList() {
      this.$axios.get("/exam/paper/allList").then((res) => {
        const { list, total } = res.data;
        this.examList = list;
        this.item = this.examList[this.count];
        this.answerArr = Array.from({ length: total }, (v, i) => {
          const obj = {
            sign: false, // 标记
            type: list[i].type, // 题目类型
          };
          if (list[i].type === 4 || list[i] === 5) {
            obj.answer = "";
          } else {
            obj.answer = [];
          }
          return obj;
        });
      });
    },
    submitForm() {
      let bool = true;
      this.answerArr.forEach(({ answer }) => {
        if (JSON.stringify(answer) === "" || JSON.stringify(answer) === "[]") {
          bool = false;
        }
      });
      if (bool) {
        // ElMessage({
        //   message: "提交成功",
        //   type: "success",
        // });
        this.dialogTableVisible = true;
      } else {
        ElMessage({
          message: "不能空题",
          type: "warning",
        });
      }
    },
    mackClick(index) {
      const { answer, type } = this.answerArr[index];
      const obj = {
        radioAnswer: "",
        checkboxAnswer: [],
        boolAnswer: "",
        textareaAnswer: "",
      };
      const temp = Object.prototype.toString.call(answer).split(" ")[1];
      const typeStr = temp.substring(0, temp.length - 1);
      if (index !== this.count) {
        this.count = index;
        if (
          (typeStr === "String" && answer) ||
          (typeStr === "Array" && answer.length)
        ) {
          if (type === 4) {
            obj.textareaAnswer = answer;
          } else {
            for (let j = 0; j < answer.length; j++) {
              for (let i = 0; i < this.examList[index].answer.length; i++) {
                if (answer[j].id === this.examList[index].answer[i].id) {
                  if (type === 1) {
                    obj.radioAnswer = i;
                  } else if (type === 2) {
                    obj.checkboxAnswer.push(i);
                  }
                }
              }
            }
          }
        } else if (typeStr === "Boolean") {
          obj.boolAnswer = answer;
        }
        this.ruleForm = obj;
      }
    },
    starClick(sign) {
      this.answerArr[this.count].sign = sign;
    },
  },
  components: {
    ExamFooter,
  },
};
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .title {
    margin-bottom: 20px;
    position: sticky;
    top: 0;
    background: white;
  }
  .section {
    flex: 1;
    overflow: auto;
  }
}
</style>
