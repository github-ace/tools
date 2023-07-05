import React, { useState } from "react";
import lodash, { keys } from "lodash";
import { Button, List } from "antd";
import styles from "./index.less";
import { v4 as uuidv4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Keys = Array<{ id: string; key: string }>;

export default function Page() {
  const [keys, setKeys] = useState<Keys>([]);
  function generateKey() {
    const key =
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
      );
    setKeys([...keys, { id: uuidv4(), key }]);
  }
  function deleteKey(id: string) {
    console.log(keys);
    console.log(
      lodash.filter(keys, function (ctx) {
        return ctx.id !== id;
      })
    );
    console.log(keys);
    setKeys(
      lodash.remove(keys, function (ctx) {
        return ctx.id !== id;
      })
    );
  }
  return (
    <div>
      <List
        dataSource={keys}
        header={<div>号码</div>}
        footer={<Button onClick={generateKey}>生成</Button>}
        locale={{ emptyText: "点击生成获取幸运数字" }}
        rowKey="id"
        renderItem={(item) => (
          <List.Item
            actions={[
              <CopyToClipboard text={item.key}>
                <Button type="link">复制</Button>
              </CopyToClipboard>,
              <Button type="link" onClick={() => deleteKey(item.id)}>
                删除
              </Button>,
            ]}
          >
            <div>{item.key}</div>
          </List.Item>
        )}
      />
    </div>
  );
}
