import { Order, Product, User } from "./interface";

//Mock data.
const products: Product[] = [
  { id: 1, orderId: 123, name: "Teclado", stock: 47 },
  { id: 2, orderId: 345, name: "Mouse", stock: 12 },
];

const orders: Order[] = [
  { id: 123, status: "delayed" },
  { id: 456, status: "delivered" },
];

const users: User[] = [
  { id: 1, name: "Lucas", age: 30 },
  { id: 2, name: "Carlos", age: 26 },
];


//functions backend
async function getStock(orderId: number) {
  const product = products.find((item) => item.orderId === orderId);

  if (!product) {
    throw new Error("Produto não encontrado");
  }

  return {
    id: product.id,
    name: product.name,
    stock: product.stock,
    orderId: product.orderId
  };
}

async function getOrder(orderId: number) {
    const order = orders.find((item) => item.id === orderId)

    if(!order) {
      throw new Error("Pedido não encontrado")
    }

    return {
      id: order.id,
      status: order.status,
    }
} 

async function getUser(userId : number) {
    const user = users.find((item) => item.id === userId )

    if(!user) {
      throw new Error("Usuário não encontrado")
    }

    return {
      id: user.id,
      name: user.name,
      age: user.age
    }
}


export {
  getStock,
  getOrder,
  getUser
}