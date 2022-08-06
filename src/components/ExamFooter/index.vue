<template>
  <div class="footer">
    <ul class="left">
      <li
        v-for="(i, j) in answerArr"
        :key="j"
        @click="mackClick(j)"
        :class="mack[j]"
      >
        {{ j + 1 }}
      </li>
    </ul>
    <ul class="right">
      <li>
        <el-icon :size="30" color="orange" class="star">
          <StarFilled @click="starClick" v-show="sign" />
          <Star @click="starClick" v-show="!sign" v-if="answerObj" />
        </el-icon>
      </li>
      <li>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交试卷</el-button
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "examFooter",
  // props: ["submitForm", "total", "answerObj", "answerArr"],
  props: {
    submitForm: Function,
    total: Number,
    answerObj: {
      type: Object,
      default: () => undefined,
    },
    answerArr: Array,
  },
  watch: {
    answerObj: {
      handler: function (newVal) {
        this.sign = newVal.sign;
      },
      deep: true,
    },
    answerArr: {
      handler: function (newVal) {
        newVal.forEach((item, index) => {
          const temp = Object.prototype.toString
            .call(item.answer)
            .split(" ")[1];
          const typeStr = temp.substring(0, temp.length - 1);
          if (
            (typeStr === "String" && item.answer) ||
            (typeStr === "Array" && item.answer.length) ||
            typeStr === "Boolean"
          ) {
            this.mack[index] = "mack";
          } else {
            this.mack[index] = "";
          }
        });
      },
      deep: true,
    },
  },
  data() {
    return {
      sign: false,
      mack: [],
    };
  },
  methods: {
    mackClick(i) {
      this.$emit("mackClick", i);
    },
    starClick() {
      this.$emit("starClick", !this.sign);
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  height: 90px;
  border-top: 3px solid rgb(199, 199, 199);
  display: flex;
  justify-content: space-between;

  .left {
    width: 415px;
    height: inherit;
    li {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      float: left;
      border: 3px solid #409eff;
      border-radius: 3px;
      margin-left: 5px;
      margin-top: 5px;
      cursor: pointer;
    }
    li[class="mack"] {
      color: white;
      background-color: #409eff;
    }
  }
  .right {
    display: flex;
    align-items: center;
    // background-color: blue;
    li {
      margin-right: 20px;

      .star {
        cursor: pointer;
      }
      .mackSign {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
