import { AtSegmentedControl, AtButton } from "taro-ui";
import Taro, { useLoad } from "@tarojs/taro";
import { View } from "@tarojs/components";
import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";
import "./index.scss";
import { useEffect, useState } from "react";

type Keys = Array<{ id: string; key: string }>;
enum Game {
  "lottery" = "lottery", // 大乐透
  "welfareLottery" = "welfareLottery", // 双色球
}

const defaultNum = 1;

export default function Lottery() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const [keys, setKeys] = useState<Keys>([]);
  const [num, setNum] = useState<number>(defaultNum);
  const [mode, setMode] = useState<number>(0);

  useEffect(() => {
    setKeys([]);
  }, [mode]);

  function generateKey() {
    if (mode == 0) {
      return (
        lodash.sortBy(
          lodash.sampleSize(
            new Array(35)
              .fill(undefined)
              .map((item, index) =>
                lodash.padStart((index + 1).toString(), 2, "0")
              ),
            5
          )
        ) +
        " | " +
        lodash.sortBy(
          lodash.sampleSize(
            new Array(12)
              .fill(undefined)
              .map((item, index) =>
                lodash.padStart((index + 1).toString(), 2, "0")
              ),
            2
          )
        )
      );
    } else if (mode == 1) {
      return (
        lodash.sortBy(
          lodash.sampleSize(
            new Array(33)
              .fill(undefined)
              .map((item, index) =>
                lodash.padStart((index + 1).toString(), 2, "0")
              ),
            6
          )
        ) +
        " | " +
        lodash.sortBy(
          lodash.sampleSize(
            new Array(16)
              .fill(undefined)
              .map((item, index) =>
                lodash.padStart((index + 1).toString(), 2, "0")
              ),
            1
          )
        )
      );
    } else {
      return "";
    }
  }
  function generateKeyWithNum() {
    const list = new Array(num)
      .fill(undefined)
      .map(() => ({ id: uuidv4(), key: generateKey() }));
    setKeys([...keys, ...list]);
  }
  function deleteKey(id: string) {
    setKeys(
      lodash.remove(keys, function (ctx) {
        return ctx.id !== id;
      })
    );
  }
  return (
    <View>
      <AtSegmentedControl
        current={mode}
        onClick={setMode}
        values={["大乐透", "双色球"]}
      ></AtSegmentedControl>
      <View className="at-row at-row__justify--between space">
        <View className="at-col at-col-3">
          <AtButton
            type="primary"
            size="small"
            onClick={() =>
              Taro.setClipboardData({
                data: keys.map((item) => item.key).join("\n"),
              })
            }
          >
            复制 {keys.length} 组号码
          </AtButton>
        </View>
        <View className="at-col at-col-3">
          <AtButton size="small" onClick={() => setKeys([])}>
            清空全部号码
          </AtButton>
        </View>
        <View className="at-col at-col-3">
          <AtButton size="small" type="primary" onClick={generateKeyWithNum}>
            生成
          </AtButton>
        </View>
      </View>
      <View className="space">
        {keys.map((item) => (
          <View
            className="at-row at-row__justify--between at-row__align--center"
            style={{ borderBottom: "1px solid #f6f6f6", padding: "5px 0" }}
            key={item.id}
          >
            <View className="at-col">{item.key}</View>
            <AtButton
              type="primary"
              size="small"
              onClick={() => deleteKey(item.id)}
            >
              删除
            </AtButton>
          </View>
        ))}
      </View>
    </View>
  );
}
