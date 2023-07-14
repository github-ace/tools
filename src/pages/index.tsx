import { Card, Row, Col } from "antd";
import { Link, useAppData } from "umi";
import lodash from "lodash";
import { routesConfig } from "@/config/site";

export default function HomePage() {
  const { routes } = useAppData();
  const list = lodash.values(
    lodash.omitBy(routes, function (ctx) {
      return ctx.path == "/";
    })
  );
  return (
    <Row gutter={16}>
      {list.map((item) => (
        <Col xs={12} sm={10} md={8} lg={6} xl={4} key={item.id}>
          <Link to={item.path || ""}>
            <Card hoverable>{routesConfig[item.path || ""].title}</Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
