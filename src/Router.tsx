import { createBrowserRouter } from "react-router-dom";
import Root from "./Root"; // 루트 컴포넌트
import Coins from "./routes/Coins"; // 코인 목록 컴포넌트
import Coin from "./routes/Coin"; // 코인 상세 정보 컴포넌트
import Price from "./routes/Price"; // 가격 정보 컴포넌트
import Chart from "./routes/Chart"; // 차트 컴포넌트

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "price",
            element: <Price />,
          },
          {
            path: "chart",
            element: <Chart />,
          },
        ],
      },
    ],
  },
]);

export default router;
