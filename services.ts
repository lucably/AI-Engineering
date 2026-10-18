import { Order, Product } from "./interface";

//Mock data.
const products: Product[] = [
  { id: 1, orderId: 123, name: "Teclado", stock: 47 },
  { id: 2, orderId: 345, name: "Mouse", stock: 12 },
];

const orders: Order[] = [
  { id: 123, status: "delayed" },
  { id: 456, status: "delivered" },
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


export {
    getStock,
    getOrder
}