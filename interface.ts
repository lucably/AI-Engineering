type Product = {
  id: number;
  orderId: number;
  name: string;
  stock: number;
};

type ToolCall = {
  name: string;
  arguments: unknown;
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

interface OrderArguments {
  orderId: number;
}

export {
    Product,
    ToolCall,
    Order,
    User,
    OrderArguments
}