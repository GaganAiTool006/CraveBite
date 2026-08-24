import fs from 'fs';
import path from 'path';

const dishNames = {
  'r1': [
    { name: 'Meghana Special Chicken Biryani', price: 340, veg: false, cat: 'Biryani Special', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80', customizable: true, options: [{name: 'Portion Size', choices: [{label: 'Half', price: 0}, {label: 'Full (+ ₹80)', price: 80}]}] },
    { name: 'Paneer Biryani', price: 290, veg: true, cat: 'Biryani Special', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Boneless Starters', price: 320, veg: false, cat: 'Starters', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80' },
    { name: 'Special Raita & Salan Combo', price: 60, veg: true, cat: 'Sides', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mutton Dum Biryani', price: 450, veg: false, cat: 'Biryani Special', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=500&q=80' },
    { name: 'Guntur Chicken Dry', price: 280, veg: false, cat: 'Starters', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80' },
    { name: 'Andhra Chicken Curry', price: 320, veg: false, cat: 'Main Course', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80' },
    { name: 'Egg Biryani', price: 220, veg: false, cat: 'Biryani Special', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mushroom Biryani', price: 250, veg: true, cat: 'Biryani Special', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80' },
    { name: 'Apollo Fish', price: 340, veg: false, cat: 'Starters', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken 65', price: 260, veg: false, cat: 'Starters', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80' },
    { name: 'Vegetable Meals', price: 180, veg: true, cat: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80' },
    { name: 'Curd Rice', price: 120, veg: true, cat: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80' },
    { name: 'Gulab Jamun (2 pcs)', price: 80, veg: true, cat: 'Desserts', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80' },
    { name: 'Paneer Butter Masala', price: 290, veg: true, cat: 'Main Course', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80' }
  ],
  'r2': [
    { name: 'All American Cheese Burger (Chicken)', price: 285, veg: false, cat: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80', customizable: true, options: [{name: 'Add Extra Cheese', choices: [{label: 'Single Cheese Slice (+ ₹30)', price: 30}, {label: 'Double Cheese (+ ₹50)', price: 50}]}] },
    { name: 'Crunchy Veggie Delight Burger', price: 220, veg: true, cat: 'Burgers', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80' },
    { name: 'Ferrero Rocher Thick Shake', price: 210, veg: true, cat: 'Beverages', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80' },
    { name: 'Spicy Chicken Wrap', price: 190, veg: false, cat: 'Wraps', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80' },
    { name: 'Veggie Supreme Wrap', price: 170, veg: true, cat: 'Wraps', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80' },
    { name: 'Peri Peri Fries', price: 120, veg: true, cat: 'Sides', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mac & Cheese', price: 250, veg: true, cat: 'Main Course', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=500&q=80' },
    { name: 'Grilled Chicken Steak', price: 380, veg: false, cat: 'Main Course', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=500&q=80' },
    { name: 'BBQ Chicken Wings (6 pcs)', price: 240, veg: false, cat: 'Starters', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80' },
    { name: 'Cheese Garlic Bread', price: 140, veg: true, cat: 'Sides', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=500&q=80' },
    { name: 'Oreo Thick Shake', price: 180, veg: true, cat: 'Beverages', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chocolate Brownie', price: 160, veg: true, cat: 'Desserts', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mushroom Penne Alfredo', price: 320, veg: true, cat: 'Pasta', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Arrabiata Pasta', price: 350, veg: false, cat: 'Pasta', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=500&q=80' },
    { name: 'Classic Lemonade', price: 90, veg: true, cat: 'Beverages', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80' }
  ],
  'r3': [
    { name: 'Ultimate Cheese Burst Margherita', price: 399, veg: true, cat: 'Pizzas', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80', customizable: true, options: [{name: 'Crust Type', choices: [{label: 'Pan Crust', price: 0}, {label: 'Cheese Burst (+ ₹99)', price: 99}]}] },
    { name: 'Non-Veg Supreme Feast', price: 499, veg: false, cat: 'Pizzas', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=500&q=80' },
    { name: 'Garlic Breadstix with Cheese Dip', price: 159, veg: true, cat: 'Sides', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=500&q=80' },
    { name: 'Farmhouse Pizza', price: 450, veg: true, cat: 'Pizzas', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80' },
    { name: 'Peppy Paneer Pizza', price: 390, veg: true, cat: 'Pizzas', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Pepperoni Pizza', price: 480, veg: false, cat: 'Pizzas', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=500&q=80' },
    { name: 'BBQ Chicken Pizza', price: 460, veg: false, cat: 'Pizzas', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=500&q=80' },
    { name: 'Veggie Paradise Pizza', price: 420, veg: true, cat: 'Pizzas', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80' },
    { name: 'Spicy Chicken Sausage Pizza', price: 410, veg: false, cat: 'Pizzas', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=500&q=80' },
    { name: 'Choco Lava Cake', price: 110, veg: true, cat: 'Desserts', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80' },
    { name: 'Stuffed Garlic Bread', price: 160, veg: true, cat: 'Sides', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=500&q=80' },
    { name: 'Jalapeno Cheese Dips', price: 30, veg: true, cat: 'Sides', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=500&q=80' },
    { name: 'Creamy Tomato Pasta Veg', price: 220, veg: true, cat: 'Pasta', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Meatballs', price: 190, veg: false, cat: 'Sides', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80' },
    { name: 'Pepsi Pet Bottle', price: 60, veg: true, cat: 'Beverages', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80' }
  ],
  'r4': [
    { name: 'Ghee Roast Masala Dosa', price: 130, veg: true, cat: 'South Indian Specials', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=500&q=80' },
    { name: 'Steamed Idli Vada Combo', price: 95, veg: true, cat: 'South Indian Specials', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80' },
    { name: 'Filter Coffee', price: 45, veg: true, cat: 'Beverages', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80' },
    { name: 'Onion Rava Dosa', price: 110, veg: true, cat: 'South Indian Specials', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mysore Masala Dosa', price: 140, veg: true, cat: 'South Indian Specials', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=500&q=80' },
    { name: 'Set Dosa (3 pcs)', price: 90, veg: true, cat: 'South Indian Specials', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=500&q=80' },
    { name: 'Medu Vada (2 pcs)', price: 70, veg: true, cat: 'South Indian Specials', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80' },
    { name: 'Bisi Bele Bath', price: 110, veg: true, cat: 'Rice Bowls', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80' },
    { name: 'Pongal', price: 90, veg: true, cat: 'Rice Bowls', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80' },
    { name: 'Tomato Onion Uttapam', price: 120, veg: true, cat: 'South Indian Specials', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=500&q=80' },
    { name: 'Rava Kesari', price: 60, veg: true, cat: 'Desserts', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80' },
    { name: 'Poori Saagu (2 pcs)', price: 100, veg: true, cat: 'Main Course', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chow Chow Bath', price: 110, veg: true, cat: 'Combo', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=500&q=80' },
    { name: 'South Indian Thali', price: 180, veg: true, cat: 'Main Course', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80' },
    { name: 'Badam Milk', price: 70, veg: true, cat: 'Beverages', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80' }
  ],
  'r5': [
    { name: 'Steamed Chicken Darjeeling Momos (8 Pcs)', price: 190, veg: false, cat: 'Momos & Dimsum', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80', customizable: true, options: [{name: 'Preparation', choices: [{label: 'Steamed', price: 0}, {label: 'Pan Fried (+ ₹30)', price: 30}]}] },
    { name: 'Hakka Noodles with Chilli Paneer', price: 260, veg: true, cat: 'Bowls & Noodles', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Fried Rice', price: 210, veg: false, cat: 'Bowls & Noodles', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80' },
    { name: 'Veg Fried Rice', price: 180, veg: true, cat: 'Bowls & Noodles', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chilli Chicken Dry', price: 250, veg: false, cat: 'Starters', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80' },
    { name: 'Gobi Manchurian', price: 190, veg: true, cat: 'Starters', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80' },
    { name: 'Veg Spring Rolls', price: 160, veg: true, cat: 'Starters', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Manchow Soup', price: 140, veg: false, cat: 'Soups', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=80' },
    { name: 'Sweet Corn Veg Soup', price: 120, veg: true, cat: 'Soups', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Schezwan Noodles', price: 230, veg: false, cat: 'Bowls & Noodles', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80' },
    { name: 'Veg Momos (8 pcs)', price: 140, veg: true, cat: 'Momos & Dimsum', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chicken Lollipop (6 pcs)', price: 260, veg: false, cat: 'Starters', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80' },
    { name: 'Paneer Chilli Gravy', price: 240, veg: true, cat: 'Main Course', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80' },
    { name: 'Egg Hakka Noodles', price: 200, veg: false, cat: 'Bowls & Noodles', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80' },
    { name: 'Honey Chilli Potato', price: 180, veg: true, cat: 'Starters', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=80' }
  ],
  'r6': [
    { name: 'Death By Chocolate (DBC Signature)', price: 270, veg: true, cat: 'Signature Sundaes', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80' },
    { name: 'Hot Fudge Nut Sundae', price: 180, veg: true, cat: 'Signature Sundaes', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80' },
    { name: 'Vanilla Ice Cream (1 Scoop)', price: 80, veg: true, cat: 'Ice Creams', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chocolate Ice Cream (1 Scoop)', price: 90, veg: true, cat: 'Ice Creams', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80' },
    { name: 'Butterscotch Ice Cream (1 Scoop)', price: 90, veg: true, cat: 'Ice Creams', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80' },
    { name: 'Strawberry Ice Cream', price: 90, veg: true, cat: 'Ice Creams', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80' },
    { name: 'Fruit Salad with Ice Cream', price: 180, veg: true, cat: 'Signature Sundaes', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80' },
    { name: 'Cake Fudge', price: 220, veg: true, cat: 'Signature Sundaes', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80' },
    { name: 'Brownie Sundae', price: 200, veg: true, cat: 'Signature Sundaes', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80' },
    { name: 'Thick Chocolate Milkshake', price: 160, veg: true, cat: 'Beverages', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mango Milkshake', price: 150, veg: true, cat: 'Beverages', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80' },
    { name: 'Black Forest Cake Slice', price: 120, veg: true, cat: 'Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80' },
    { name: 'Red Velvet Cake Slice', price: 140, veg: true, cat: 'Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80' },
    { name: 'Belgian Waffle with Nutella', price: 210, veg: true, cat: 'Waffles', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80' },
    { name: 'Extra Chocolate Sauce', price: 40, veg: true, cat: 'Add-ons', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80' }
  ]
};

const filePath = path.join(process.cwd(), 'src/data/mockData.js');
let fileContent = fs.readFileSync(filePath, 'utf-8');

// Replace the RESTAURANTS array in mockData.js with our new generated 15-item menus!
// Simple regex to extract the JSON parts of restaurants

// Instead of complex AST, I will export the whole mockData file programmatically
let newMockData = `
export const LOCATIONS = [
  { id: '1', name: 'Koramangala', city: 'Bengaluru', fullAddress: 'Koramangala 5th Block, Bengaluru, Karnataka' },
  { id: '2', name: 'Indiranagar', city: 'Bengaluru', fullAddress: '100 Feet Road, Indiranagar, Bengaluru, Karnataka' },
  { id: '3', name: 'HSR Layout', city: 'Bengaluru', fullAddress: 'Sector 1, HSR Layout, Bengaluru, Karnataka' },
  { id: '4', name: 'MG Road', city: 'Bengaluru', fullAddress: 'Trinity Circle, MG Road, Bengaluru, Karnataka' },
  { id: '5', name: 'Whitefield', city: 'Bengaluru', fullAddress: 'ITPL Main Rd, Whitefield, Bengaluru, Karnataka' }
];

export const CATEGORIES = [
  { id: 'c1', name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=200&q=80' },
  { id: 'c2', name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80' },
  { id: 'c3', name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80' },
  { id: 'c4', name: 'North Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=200&q=80' },
  { id: 'c5', name: 'South Indian', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=200&q=80' },
  { id: 'c6', name: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=200&q=80' },
  { id: 'c7', name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=200&q=80' },
  { id: 'c8', name: 'Rolls & Shawarma', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=200&q=80' },
  { id: 'c9', name: 'Cakes & Bakery', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=200&q=80' },
  { id: 'c10', name: 'Healthy Bowls', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=200&q=80' }
];

export const PROMO_BANNERS = [
  { id: 'p1', title: 'FLAT ₹125 OFF', subtitle: 'ON ORDERS ABOVE ₹499', code: 'SWIGGY125', color: 'linear-gradient(135deg, #ff7e5f, #feb47b)', tag: 'BANK OFFER' },
  { id: 'p2', title: '50% OFF UP TO ₹100', subtitle: 'USE CODE: SWIGGY50', code: 'SWIGGY50', color: 'linear-gradient(135deg, #6a11cb, #2575fc)', tag: 'WELCOME DEAL' },
  { id: 'p3', title: 'FREE DELIVERY', subtitle: 'NO DELIVEY CHARGES TODAY', code: 'FREEDEL', color: 'linear-gradient(135deg, #11998e, #38ef7d)', tag: 'SUPER SAVER' }
];

export const COUPONS = [
  { code: 'SWIGGY50', discountPercent: 50, maxDiscount: 100, minOrder: 199, description: '50% OFF up to ₹100' },
  { code: 'SWIGGY125', discountPercent: 25, maxDiscount: 125, minOrder: 499, description: 'Flat ₹125 OFF on orders above ₹499' },
  { code: 'WELCOME100', discountAmount: 100, minOrder: 299, description: '₹100 Instant Discount for New Users' },
  { code: 'FREEDEL', freeDelivery: true, minOrder: 149, description: 'Free Delivery on order above ₹149' }
];

export const RESTAURANTS = [
  {
    id: 'r1', name: 'Meghana Foods', cuisine: ['Biryani', 'Andhra', 'North Indian'], rating: 4.6, ratingCount: '10K+', deliveryTime: '25-30 mins', deliveryMinutes: 28, costForTwo: 450, costCategory: 'medium', location: 'Koramangala 5th Block', distance: '2.1 km', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', isVeg: false, offer: '50% OFF UPTO ₹100', promoted: true,
    menu: ${JSON.stringify(dishNames.r1.map((d, i) => ({ id: 'm1' + i, ...d, description: 'Delicious and authentic preparation.' })), null, 4)}
  },
  {
    id: 'r2', name: 'Truffles Gourmet & Burgers', cuisine: ['Burgers', 'American', 'Continental', 'Desserts'], rating: 4.7, ratingCount: '25K+', deliveryTime: '20-25 mins', deliveryMinutes: 22, costForTwo: 500, costCategory: 'medium', location: 'Indiranagar', distance: '1.8 km', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', isVeg: false, offer: 'FLAT ₹125 OFF', promoted: true,
    menu: ${JSON.stringify(dishNames.r2.map((d, i) => ({ id: 'm2' + i, ...d, description: 'Freshly prepared with premium ingredients.' })), null, 4)}
  },
  {
    id: 'r3', name: 'Pizza Hut & Artisan Crust', cuisine: ['Pizza', 'Italian', 'Fast Food'], rating: 4.3, ratingCount: '5K+', deliveryTime: '30-35 mins', deliveryMinutes: 32, costForTwo: 600, costCategory: 'high', location: 'HSR Layout', distance: '3.4 km', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', isVeg: false, offer: '50% OFF UPTO ₹100', promoted: false,
    menu: ${JSON.stringify(dishNames.r3.map((d, i) => ({ id: 'm3' + i, ...d, description: 'Hot, fresh and cheesy pizzas just for you.' })), null, 4)}
  },
  {
    id: 'r4', name: 'Sagar Ratna Pure Veg', cuisine: ['South Indian', 'Pure Veg', 'Dosa', 'North Indian'], rating: 4.8, ratingCount: '15K+', deliveryTime: '15-20 mins', deliveryMinutes: 18, costForTwo: 250, costCategory: 'low', location: 'MG Road', distance: '1.2 km', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80', isVeg: true, offer: 'FREE DELIVERY', promoted: false,
    menu: ${JSON.stringify(dishNames.r4.map((d, i) => ({ id: 'm4' + i, ...d, description: 'Authentic South Indian taste.' })), null, 4)}
  },
  {
    id: 'r5', name: 'Wok & Roll Asian Bistro', cuisine: ['Chinese', 'Asian', 'Momos', 'Noodles'], rating: 4.4, ratingCount: '6K+', deliveryTime: '25-30 mins', deliveryMinutes: 26, costForTwo: 400, costCategory: 'medium', location: 'Koramangala 4th Block', distance: '2.5 km', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', isVeg: false, offer: '20% OFF ABOVE ₹299', promoted: false,
    menu: ${JSON.stringify(dishNames.r5.map((d, i) => ({ id: 'm5' + i, ...d, description: 'Spicy, tangy and delicious Asian flavors.' })), null, 4)}
  },
  {
    id: 'r6', name: 'Corner House Ice Creams', cuisine: ['Desserts', 'Ice Cream', 'Cakes'], rating: 4.9, ratingCount: '40K+', deliveryTime: '15-20 mins', deliveryMinutes: 17, costForTwo: 300, costCategory: 'low', location: 'Indiranagar', distance: '1.4 km', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', isVeg: true, offer: 'FLAT ₹50 OFF', promoted: true,
    menu: ${JSON.stringify(dishNames.r6.map((d, i) => ({ id: 'm6' + i, ...d, description: 'The best desserts in town.' })), null, 4)}
  }
];
`;

fs.writeFileSync(filePath, newMockData);
