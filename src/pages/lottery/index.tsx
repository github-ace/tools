import React, { useEffect, useState } from "react";
import lodash from "lodash";
import { Button, List, Row, Col, InputNumber, Segmented } from "antd";
import styles from "./index.less";
import { v4 as uuidv4 } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ClearOutlined } from "@ant-design/icons";

type Keys = Array<{ id: string; key: string }>;
enum Game {
  "lottery" = "lottery", // 大乐透
  "welfareLottery" = "welfareLottery", // 双色球
}

const defaultNum = 1;

export default function Page() {
  const [keys, setKeys] = useState<Keys>([]);
  const [num, setNum] = useState<number>(defaultNum);
  const [mode, setMode] = useState<Game>(Game.lottery);

  useEffect(() => {
    setKeys([]);
  }, [mode]);

  function generateKey() {
    if (mode == Game.lottery) {
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
    } else if (mode == Game.welfareLottery) {
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
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Segmented
          value={mode}
          onChange={(value) => {
            if (value === Game.lottery || value == Game.welfareLottery) {
              setMode(value);
            }
          }}
          block
          options={[
            { label: "大乐透", value: Game.lottery },
            { label: "双色球", value: Game.welfareLottery },
          ]}
        />
      </Col>
      <Col span={24}>
        <List
          dataSource={keys}
          header={
            <Row align="middle" justify="space-between">
              <Col>
                <CopyToClipboard text={keys.map((item) => item.key).join("\n")}>
                  <Button>复制 {keys.length} 组号码</Button>
                </CopyToClipboard>
              </Col>
              <Col>
                <Button icon={<ClearOutlined />} onClick={() => setKeys([])}>
                  清空全部号码
                </Button>
              </Col>
              <Col>
                <Button onClick={generateKeyWithNum}>生成</Button>
                <InputNumber
                  style={{ width: 120 }}
                  addonAfter="组"
                  onChange={(value) => {
                    typeof value == "number" && setNum(value);
                  }}
                  defaultValue={defaultNum}
                  precision={0}
                  min={1}
                  max={50}
                />
              </Col>
            </Row>
          }
          locale={{ emptyText: '点击 "生成" 获取幸运数字' }}
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
      </Col>
    </Row>
  );
}
