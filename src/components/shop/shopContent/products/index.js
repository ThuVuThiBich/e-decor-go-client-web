import { Grid } from "@material-ui/core";
import Product from "./product";
import { useStyles } from "./styles";
const mockProducts = [
  { id: "1", name: "name1", price: 50 },
  { id: "2", name: "name1", price: 50 },
  { id: "3", name: "name1", price: 50 },
  { id: "4", name: "name1", price: 50 },
  { id: "5", name: "name1", price: 50 },
  { id: "6", name: "name1", price: 50 },
];
export default function Products(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {mockProducts.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} lg={4}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
