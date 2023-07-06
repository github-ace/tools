import { Card, Row, Col } from "antd";
import { Link, useAppData } from "umi";
import lodash from "lodash";

export default function HomePage() {
  const { routes } = useAppData();
  const list = lodash.values(
    lodash.omitBy(routes, function (ctx) {
      return ctx.path == "/";
    })
  );
  console.log(list);
  return (
    <Row gutter={16}>
      {list.map((item) => (
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Link to={item.path || ""}>
            <Card hoverable>{item?.title}</Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
