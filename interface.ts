type ToolPermission = "read" | "write";

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

export {
    ToolPermission,
    Product,
    ToolCall,
    Order,
    User
}