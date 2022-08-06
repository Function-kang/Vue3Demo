import Home from "../views/Home";
import ExamOdd from "../views/ExamOdd";
import ExamEven from "../views/ExamEven";

export const routes = [
  {
    // 将默认路由(/)重定向到(/home)
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "/exam",
        children: [
          {
            path: "odd",
            name: "examOdd",
            component: ExamOdd,
          },
          {
            path: "even",
            name: "examEven",
            component: ExamEven,
          },
        ],
      },
    ],
  },
];
