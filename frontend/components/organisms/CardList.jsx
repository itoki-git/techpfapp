import Link from "next/link";
import Card from "../molecules/Card";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// カードリスト
const CardList = (props) => {
  const items = [
    {
      title: "# 空の抜けがまったく違う滋賀で楽しむ極上アウトドア",
      to: "/logoput",
    },
    { title: "日本の暑い夏は...　暑さをずらして涼しく楽しむズラ！", to: "#" },
    { title: "Create", to: "#" },
    { title: "Create", to: "#" },
  ];
  return (
    <div className="card-list">
      <Container>
        <Grid container spacing={3} className="card-grid">
          {items.map((item, i) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              xl={4}
              className="card-item"
              key={item.id}
            >
              <Link href={item.to}>
                <a>
                  <Card title={item.title} />
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>

      <style jsx>
        {`
          .card-list {
            width: 100%;
            height: 100%;
            min-height: 100vh;
          }
          .card-grid {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
          }
          .card-item {
            position: relative;
            width: 33.3%;
          }
        `}
      </style>
    </div>
  );
};
export default CardList;
