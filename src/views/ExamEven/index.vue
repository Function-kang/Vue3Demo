<template>
  <div class="main">
    <div class="title">整卷模式</div>
    <div class="section">
      <el-form
        :model="params"
        ref="formRef"
        label-width="100px"
        label-position="top"
      >
        <div v-for="(domain, index) in params.ruleForm" :key="domain.key">
          <el-form-item
            :label="index + 1 + '、' + domain.subject"
            :prop="'ruleForm.' + index + '.value'"
            :rules="{
              required: true,
              message: 'domain can not be null',
              trigger: 'blur',
            }"
          >
            <div v-if="domain.type === 1">
              <el-radio-group v-model="domain.value">
                <el-radio
                  :label="String(j)"
                  v-for="(i, j) in domain.answer"
                  :key="i.id"
                  >{{ i.title }}</el-radio
                >
              </el-radio-group>
            </div>
            <div v-if="domain.type === 2">
              <el-checkbox-group v-model="domain.value">
                <el-checkbox
                  :label="String(j)"
                  name="checkboxAnswer"
                  v-for="(i, j) in domain.answer"
                  :key="i.id"
                >
                  {{ i.title }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="domain.type === 3">
              <el-radio-group v-model="domain.value">
                <el-radio :label="true">对</el-radio>
                <el-radio :label="false">错</el-radio>
              </el-radio-group>
            </div>
            <div v-if="domain.type === 4">
              <el-input type="textarea" v-model="domain.value"></el-input>
            </div>
          </el-form-item>
          <el-button
            type="warning"
            :icon="answerArr[index].sign ? StarFilled : Star"
            @click="starClick(index)"
            >标记题目</el-button
          >
        </div>
      </el-form>
    </div>
    <ExamFooter
      ref="ExamFooter"
      :answerArr="answerArr"
      :total="examList.length"
      :submitForm="submitForm"
      @mackClick="mackClick"
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
import { Star, StarFilled } from "@element-plus/icons-vue";
import ExamFooter from "../../components/ExamFooter";
import { ElMessage } from "element-plus";
export default {
  name: "examEven",
  data() {
    return {
      params: {
        ruleForm: [],
      },
      examList: [],
      answerArr: [],
      Star,
      StarFilled,
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
  watch: {
    params: {
      handler: function ({ ruleForm }) {
        ruleForm.forEach(({ value, type, answer, subject }, index) => {
          const temp = Object.prototype.toString.call(value).split(" ")[1];
          const typeStr = temp.substring(0, temp.length - 1);
          this.answerArr[index].subject = subject;

          if (
            (typeStr === "String" && value) ||
            (typeStr === "Array" && value.length) ||
            typeStr === "Boolean"
          ) {
            if (type === 3 || type === 4 || type === 5) {
              this.answerArr[index].answer = value;
              this.answerArr[index].answerTitle = value;
            } else if (type === 1) {
              this.answerArr[index].answer = [answer[Number(value)]];
              this.answerArr[index].answerTitle = this.az[Number(value)];
            } else if (type === 2) {
              this.answerArr[index].answer = value.map((item) => {
                return answer[Number(item)];
              });

              let str = "";
              value.forEach((i) => {
                this.answerArr[index].answer.push(
                  this.examList[index].answer[i]
                );
                str += this.az[i];
              });
              this.answerArr[index].answerTitle = str;
            }
          }
        });
      },
      deep: true,
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get("/exam/paper/allList").then((res) => {
        const { list, total } = res.data;
        this.examList = list;

        this.answerArr = Array.from({ length: total }, (v, i) => {
          const obj = {
            sign: false, // 标记
            type: list[i].type, // 题目类型
          };
          this.formAdd(i);
          if (list[i].type === 4 || list[i] === 5) {
            obj.answer = "";
          } else {
            obj.answer = [];
          }
          return obj;
        });
      });
    },
    formAdd(i) {
      if (this.examList[i].type === 2) {
        this.params.ruleForm.push({
          ...this.examList[i],
          key: Date.now(),
          value: [],
        });
      } else {
        this.params.ruleForm.push({
          ...this.examList[i],
          key: Date.now(),
          value: "",
        });
      }
    },
    mackClick() {},
    starClick(index) {
      this.answerArr[index].sign = !this.answerArr[index].sign;
    },
    submitForm() {
      let bool = true;
      this.answerArr.forEach(({ answer }) => {
        if (JSON.stringify(answer) === "" || JSON.stringify(answer) === "[]") {
          bool = false;
        }
      });
      if (bool) {
        this.dialogTableVisible = true;
      } else {
        ElMessage({
          message: "不能空题",
          type: "warning",
        });
      }
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