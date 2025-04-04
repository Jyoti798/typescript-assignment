"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
//function to add a product
function addProduct(inventory, product) {
    var alreadyProduct = false;
    for (var _i = 0, inventory_1 = inventory; _i < inventory_1.length; _i++) {
        var prd = inventory_1[_i];
        if (prd.id === product.id) {
            alreadyProduct = true;
            break;
        }
    }
    if (alreadyProduct) {
        console.log("Product already exists.");
        return inventory;
    }
    return __spreadArray(__spreadArray([], inventory, true), [product], false);
}
//update the stock
function updateStock(inventory, productId, quantityChange) {
    var found = false;
    var updateInventory = inventory.map(function (product) {
        if (product.id === productId) {
            found = true;
            var updateQuantity = product.quantitiyInStock + quantityChange;
            if (updateQuantity < 0) {
                updateQuantity = 0;
            }
            return __assign(__assign({}, product), { quantitiyInStock: updateQuantity });
        }
        return product;
    });
    return found ? updateInventory : inventory;
}
// getProductById function
function getProductById(inventory, productId) {
    for (var _i = 0, inventory_2 = inventory; _i < inventory_2.length; _i++) {
        var product = inventory_2[_i];
        if (product.id === productId) {
            return product;
        }
    }
    return undefined;
}
//getTotalInventoryValue function
function getTotalInventoryValue(inventory) {
    var totalValue = 0;
    for (var _i = 0, inventory_3 = inventory; _i < inventory_3.length; _i++) {
        var product = inventory_3[_i];
        totalValue += product.price * product.quantitiyInStock;
    }
    return totalValue;
}
//implementation
var inventory = [];
// Adding products
inventory = addProduct(inventory, { id: 101, name: "Apple", price: 3, quantitiyInStock: 200 });
inventory = addProduct(inventory, { id: 102, name: "Banana", price: 1, quantitiyInStock: 150 });
// Updating stock
inventory = updateStock(inventory, 101, 30); // Restock 30 Apples
// Get product by ID
var banana = getProductById(inventory, 102);
console.log("Banana details:", banana);
// Get total value of inventory
var totalInventoryValue = getTotalInventoryValue(inventory);
console.log("Total Inventory Value:", totalInventoryValue);
