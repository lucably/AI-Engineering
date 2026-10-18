type Product = {
  id: number;
  orderId: number;
  name: string;
  stock: number;
};

type ToolCall = {
  name: string;
  arguments: Record<string, unknown>;
};

type Order = {
    id: number;
    status: string;
}

export {
    Product,
    ToolCall,
    Order
}