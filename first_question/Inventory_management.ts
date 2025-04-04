//define the interface for the products
interface Product {
  id: number;
  name: string;
  price: number;
  quantitiyInStock: number;
}

//define the type alias
type Inventory = Product[];

//function to add a product
function addProduct(inventory: Inventory, product: Product): Inventory {
  let alreadyProduct = false;
  for (const prd of inventory) {
    if (prd.id === product.id) {
      alreadyProduct = true;
      break;
    }
  }

  if (alreadyProduct) {
    console.log(`Product already exists.`);
    return inventory;
  }

  return [...inventory, product];
}

//update the stock
function updateStock(
  inventory: Inventory,
  productId: number,
  quantityChange: number
): Inventory {
  let found = false;
  const updateInventory = inventory.map((product) => {
    if (product.id === productId) {
      found = true;
      let updateQuantity = product.quantitiyInStock + quantityChange;
      if (updateQuantity < 0) {
        updateQuantity = 0;
      }
      return {
        ...product,
        quantitiyInStock: updateQuantity,
      };
    }
    return product;
  });
  return found ? updateInventory : inventory;
}

// getProductById function

function getProductById(
  inventory: Inventory,
  productId: number
): Product | undefined {
  for (const product of inventory) {
    if (product.id === productId) {
      return product;
    }
  }
  return undefined;
}

//getTotalInventoryValue function
function getTotalInventoryValue(inventory: Inventory): number {
  let totalValue = 0;

  for (const product of inventory) {
    totalValue += product.price * product.quantitiyInStock;
  }

  return totalValue;
}

//implementation
let inventory: Inventory = [];

// Adding products
inventory = addProduct(inventory, {
  id: 101,
  name: "Apple",
  price: 3,
  quantitiyInStock: 200,
});
inventory = addProduct(inventory, {
  id: 102,
  name: "Banana",
  price: 1,
  quantitiyInStock: 150,
});

// Updating stock
inventory = updateStock(inventory, 101, 30); // Restock 30 Apples

// Get product by ID
const banana = getProductById(inventory, 102);
console.log("Banana details:", banana);

// Get total value of inventory
const totalInventoryValue = getTotalInventoryValue(inventory);
console.log("Total Inventory Value:", totalInventoryValue);

export {};
