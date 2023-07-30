import Taro from "@tarojs/taro";
import { AtGrid, AtFab, AtIcon } from "taro-ui";
import { useLoad } from "@tarojs/taro";
import { Button, View } from "@tarojs/components";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  function jump(item) {
    Taro.navigateTo({ url: item.url });
  }
  return (
    <>
      <AtGrid
        data={[
          {
            iconInfo: { value: "analytics" },
            value: "lottery",
            url: "/pages/lottery/index",
          },
        ]}
        onClick={jump}
      />
      <View style={{ position: "fixed", right: 8, top: "50%" }}>
        <AtFab>
          <AtIcon className="at-fab__icon" value="message" />
          <Button
            openType="contact"
            style={{
              opacity: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          ></Button>
        </AtFab>
      </View>
    </>
  );
}
