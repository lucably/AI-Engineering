type Product = {
  id: number;
  orderId: number;
  name: string;
  stock: number;
};

type ToolCall = {
  name: string;
  arguments: unknown;
  approved?: boolean;
};

type Order = {
    id: number;
    status: string;
}

type User = {
  id: number;
  name: string;
  age: number
}

export {
    Product,
    ToolCall,
    Order,
    User
}