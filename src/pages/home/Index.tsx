import slides from "../../../../server/data.json";
import { Slider } from "./Slider";

const Index = () => {
  const items = slides.items.map((item) => ({
    ...item,
    price: parseFloat(item.price),
  }));

  return <Slider slides={items} />;
};

export default Index;
