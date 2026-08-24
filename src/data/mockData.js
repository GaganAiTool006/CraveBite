export const CATEGORIES = [
  { id: 'cat-1', name: 'Pizza', emoji: '🍕', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80', count: 42 },
  { id: 'cat-2', name: 'Burgers', emoji: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', count: 35 },
  { id: 'cat-3', name: 'Biryani', emoji: '🥘', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', count: 28 },
  { id: 'cat-4', name: 'North Indian', emoji: '🍲', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80', count: 50 },
  { id: 'cat-5', name: 'Chinese', emoji: '🥡', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80', count: 31 },
  { id: 'cat-6', name: 'South Indian', emoji: '🥞', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=400&q=80', count: 19 },
  { id: 'cat-7', name: 'Healthy & Bowls', emoji: '🥗', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', count: 24 },
  { id: 'cat-8', name: 'Desserts', emoji: '🍰', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80', count: 38 },
  { id: 'cat-9', name: 'Beverages', emoji: '🥤', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80', count: 22 },
  { id: 'cat-10', name: 'Italian & Pasta', emoji: '🍝', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80', count: 16 }
];

export const RESTAURANTS = [
  {
    id: 'rest-1',
    name: 'Artisan Burger Co.',
    slug: 'artisan-burger-co',
    rating: 4.8,
    reviewCount: '1.4k+',
    deliveryTime: '25-30 min',
    distance: '2.3 km',
    costForTwo: 450,
    cuisine: ['Burgers', 'American', 'Fast Food', 'Beverages'],
    isVeg: false,
    hasPureVeg: true,
    isPromoted: true,
    offer: 'FLAT 50% OFF up to ₹100',
    address: 'Plot 45, Downtown Boulevard, Sector 18',
    openingHours: '11:00 AM - 11:30 PM',
    description: 'Specializing in smashed brioche burgers, truffle fries, and signature thick handcrafted shakes.',
    coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80',
    menu: [
      {
        id: 'dish-101',
        name: 'Truffle Smash Double Cheeseburger',
        category: 'Burgers',
        price: 289,
        rating: 4.9,
        reviews: 412,
        isVeg: false,
        isBestseller: true,
        description: 'Double tender smashed patty, truffle aioli, aged cheddar, caramelised onions on toasted butter brioche.',
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80'
      },
      {
        id: 'dish-102',
        name: 'Crispy Peri-Peri Chicken Burger',
        category: 'Burgers',
        price: 249,
        rating: 4.7,
        reviews: 290,
        isVeg: false,
        isBestseller: true,
        description: 'Golden fried chicken breast tossed in fiery peri peri seasoning, creamy coleslaw, and spicy mayo.',
        image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&q=80'
      },
      {
        id: 'dish-103',
        name: 'Loaded Cottage Cheese Deluxe Burger',
        category: 'Burgers',
        price: 229,
        rating: 4.6,
        reviews: 184,
        isVeg: true,
        isBestseller: false,
        description: 'Crispy spiced paneer patty, chipotle drizzle, crunchy lettuce, and cheddar slice.',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80'
      },
      {
        id: 'dish-104',
        name: 'Cajun Seasoned Crinkle Fries',
        category: 'Starters',
        price: 139,
        rating: 4.8,
        reviews: 350,
        isVeg: true,
        isBestseller: true,
        description: 'Golden crinkle cut potato fries dusted with zesty Louisiana Cajun seasoning and cheese dip.',
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&q=80'
      },
      {
        id: 'dish-105',
        name: 'Classic Belgian Chocolate Thick Shake',
        category: 'Beverages',
        price: 189,
        rating: 4.9,
        reviews: 510,
        isVeg: true,
        isBestseller: true,
        description: 'Rich creamy milkshake blended with authentic Belgian dark cocoa and chocolate chips.',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80'
      },
      {
        id: 'dish-106',
        name: 'Oreo Mint Crunch Shake',
        category: 'Beverages',
        price: 199,
        rating: 4.7,
        reviews: 120,
        isVeg: true,
        isBestseller: false,
        description: 'Crushed Oreos with a hint of fresh peppermint, topped with whipped cream.',
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&q=80'
      }
    ]
  },
  {
    id: 'rest-2',
    name: 'Royal Awadh Dum Biryani',
    slug: 'royal-awadh-dum-biryani',
    rating: 4.7,
    reviewCount: '2.8k+',
    deliveryTime: '30-35 min',
    distance: '3.1 km',
    costForTwo: 600,
    cuisine: ['Biryani', 'Mughlai', 'North Indian', 'Kebab'],
    isVeg: false,
    hasPureVeg: true,
    isPromoted: false,
    offer: '₹120 OFF on orders above ₹499',
    address: 'Heritage Square, 2nd Floor, Civil Lines',
    openingHours: '12:00 PM - 11:00 PM',
    description: 'Slow-cooked aromatic dum biryanis prepared with authentic spices, saffron, and tender marinated meats.',
    coverImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&q=80',
    menu: [
      {
        id: 'dish-201',
        name: 'Hyderabadi Dum Gosht Biryani',
        category: 'Biryani',
        price: 389,
        rating: 4.9,
        reviews: 950,
        isVeg: false,
        isBestseller: true,
        description: 'Aged basmati rice sealed in earthen pots with succulent marinated mutton chunks and royal saffron.',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80'
      },
      {
        id: 'dish-202',
        name: 'Lucknowi Chicken Biryani [Boneless]',
        category: 'Biryani',
        price: 329,
        rating: 4.8,
        reviews: 730,
        isVeg: false,
        isBestseller: true,
        description: 'Fragrant mild spiced biryani with melt-in-mouth chicken pieces, served with burani raita and salan.',
        image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&q=80'
      },
      {
        id: 'dish-203',
        name: 'Shahi Paneer Dum Biryani',
        category: 'Biryani',
        price: 279,
        rating: 4.6,
        reviews: 310,
        isVeg: true,
        isBestseller: false,
        description: 'Tender tandoori paneer cubes layered with saffron spiced rice, fried onions, and mint.',
        image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=500&q=80'
      },
      {
        id: 'dish-204',
        name: 'Galouti Kebab with Ulta Tawa Paratha',
        category: 'Starters',
        price: 299,
        rating: 4.9,
        reviews: 420,
        isVeg: false,
        isBestseller: true,
        description: 'Finely minced spiced lamb patties smoked with cloves, served with soft saffron paratha.',
        image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&q=80'
      },
      {
        id: 'dish-205',
        name: 'Shahi Gulab Jamun (2 pcs)',
        category: 'Desserts',
        price: 99,
        rating: 4.8,
        reviews: 280,
        isVeg: true,
        isBestseller: false,
        description: 'Warm golden khoya dumplings soaked in rose and cardamom flavored sugar syrup.',
        image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14d48?w=500&q=80'
      }
    ]
  },
  {
    id: 'rest-3',
    name: 'Napoli Woodfire Pizzeria',
    slug: 'napoli-woodfire-pizzeria',
    rating: 4.9,
    reviewCount: '3.1k+',
    deliveryTime: '20-25 min',
    distance: '1.8 km',
    costForTwo: 750,
    cuisine: ['Pizza', 'Italian', 'Pastas', 'Salads'],
    isVeg: false,
    hasPureVeg: true,
    isPromoted: true,
    offer: 'Free Garlic Bread on orders > ₹599',
    address: '42 Baker Avenue, High Street Mall',
    openingHours: '11:30 AM - 11:00 PM',
    description: 'Neapolitan style thin-crust wood-fired pizzas with imported San Marzano tomatoes and fior di latte mozzarella.',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=200&q=80',
    menu: [
      {
        id: 'dish-301',
        name: 'Margherita Burrata Special Pizza',
        category: 'Pizza',
        price: 449,
        rating: 4.9,
        reviews: 620,
        isVeg: true,
        isBestseller: true,
        description: 'Wood-fired crust with artisanal burrata cheese, organic basil leaves, crushed tomatoes, and extra virgin olive oil.',
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80'
      },
      {
        id: 'dish-302',
        name: 'Pepperoni & Smoked Bacon Pizza',
        category: 'Pizza',
        price: 529,
        rating: 4.9,
        reviews: 840,
        isVeg: false,
        isBestseller: true,
        description: 'Authentic cured pork pepperoni, hot honey drizzle, mozzarella, and chili flakes.',
        image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&q=80'
      },
      {
        id: 'dish-303',
        name: 'Truffle Mushroom Fettuccine',
        category: 'Italian & Pasta',
        price: 389,
        rating: 4.7,
        reviews: 310,
        isVeg: true,
        isBestseller: false,
        description: 'Handmade flat ribbon pasta in creamy wild mushroom sauce with parmesan shavings and black truffle oil.',
        image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500&q=80'
      },
      {
        id: 'dish-304',
        name: 'Cheesy Garlic Pull-Apart Bread',
        category: 'Starters',
        price: 189,
        rating: 4.8,
        reviews: 520,
        isVeg: true,
        isBestseller: true,
        description: 'Crusty loaf stuffed with garlic herb butter and molten mozzarella cheese.',
        image: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=500&q=80'
      },
      {
        id: 'dish-305',
        name: 'Classic Venetian Tiramisu',
        category: 'Desserts',
        price: 249,
        rating: 4.9,
        reviews: 410,
        isVeg: true,
        isBestseller: true,
        description: 'Espresso-soaked ladyfingers layered with rich mascarpone zabaglione cream and dusted with raw cocoa.',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80'
      }
    ]
  },
  {
    id: 'rest-4',
    name: 'Green Bowl & Fresh Greens',
    slug: 'green-bowl-fresh-greens',
    rating: 4.6,
    reviewCount: '890+',
    deliveryTime: '20-25 min',
    distance: '1.5 km',
    costForTwo: 500,
    cuisine: ['Healthy & Bowls', 'Salads', 'Smoothies', 'Continental'],
    isVeg: true,
    hasPureVeg: true,
    isPromoted: false,
    offer: '20% OFF on all signature bowls',
    address: 'Eco Park Complex, Green Glen Layout',
    openingHours: '08:00 AM - 10:00 PM',
    description: 'Wholesome organic macro-nutrient counted salad bowls, cold-pressed juices, and energizing smoothie jars.',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&q=80',
    menu: [
      {
        id: 'dish-401',
        name: 'Avocado Quinoa Fiesta Protein Bowl',
        category: 'Healthy & Bowls',
        price: 329,
        rating: 4.8,
        reviews: 290,
        isVeg: true,
        isBestseller: true,
        description: 'Hass avocado, tri-color quinoa, edamame, roasted corn, cherry tomatoes, with honey lime vinaigrette.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'
      },
      {
        id: 'dish-402',
        name: 'Falafel & Hummus Mezze Platter',
        category: 'Starters',
        price: 279,
        rating: 4.7,
        reviews: 180,
        isVeg: true,
        isBestseller: false,
        description: 'Crispy herbed chickpea falafels with velvety garlic hummus, pickled veggies, and warm wholewheat pita.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80'
      },
      {
        id: 'dish-403',
        name: 'Berry Bliss Antioxidant Smoothie',
        category: 'Beverages',
        price: 179,
        rating: 4.9,
        reviews: 340,
        isVeg: true,
        isBestseller: true,
        description: 'Strawberries, blueberries, Greek yogurt, chia seeds, and almond milk with no refined sugar.',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&q=80'
      }
    ]
  },
  {
    id: 'rest-5',
    name: 'Wok & Dragon Asian Kitchen',
    slug: 'wok-dragon-asian-kitchen',
    rating: 4.5,
    reviewCount: '1.9k+',
    deliveryTime: '25-30 min',
    distance: '3.4 km',
    costForTwo: 550,
    cuisine: ['Chinese', 'Asian', 'Thai', 'Noodles'],
    isVeg: false,
    hasPureVeg: false,
    isPromoted: false,
    offer: 'Complimentary Steamed Dumplings',
    address: 'Tower B, Oriental Arcade, Cyber City',
    openingHours: '12:00 PM - 11:45 PM',
    description: 'Fiery wok-tossed noodles, handcrafted dim sums, comforting ramen, and authentic pan-Asian flavors.',
    coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=200&q=80',
    menu: [
      {
        id: 'dish-501',
        name: 'Chili Garlic Hakka Noodles with Chicken',
        category: 'Chinese',
        price: 249,
        rating: 4.7,
        reviews: 420,
        isVeg: false,
        isBestseller: true,
        description: 'Wok-tossed noodles with shredded chicken, crunchy bell peppers, burnt garlic, and spicy scallion chili oil.',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80'
      },
      {
        id: 'dish-502',
        name: 'Crystal Veg Dim Sum (6 pcs)',
        category: 'Starters',
        price: 219,
        rating: 4.8,
        reviews: 310,
        isVeg: true,
        isBestseller: true,
        description: 'Translucent steamed dumplings stuffed with water chestnuts, bok choy, and shiitake mushrooms with chili dip.',
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&q=80'
      },
      {
        id: 'dish-503',
        name: 'Crispy Kung Pao Paneer',
        category: 'Chinese',
        price: 269,
        rating: 4.6,
        reviews: 210,
        isVeg: true,
        isBestseller: false,
        description: 'Diced cottage cheese tossed with dry red chilies, roasted peanuts, and sweet & tangy Szechuan glaze.',
        image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&q=80'
      }
    ]
  },
  {
    id: 'rest-6',
    name: 'Sweet Haven Bakery & Cafe',
    slug: 'sweet-haven-bakery',
    rating: 4.9,
    reviewCount: '4.2k+',
    deliveryTime: '15-20 min',
    distance: '1.2 km',
    costForTwo: 350,
    cuisine: ['Desserts', 'Bakery', 'Coffee', 'Cakes'],
    isVeg: true,
    hasPureVeg: true,
    isPromoted: true,
    offer: 'BUY 1 GET 1 on Classic Pastries',
    address: '14 Sunshine Square, Rose Garden Road',
    openingHours: '09:00 AM - 12:00 AM',
    description: 'French croissants, decadent cheesecakes, artisanal brownies, and specialty barista-brewed coffee.',
    coverImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80',
    menu: [
      {
        id: 'dish-601',
        name: 'New York Baked Blueberry Cheesecake',
        category: 'Desserts',
        price: 219,
        rating: 4.9,
        reviews: 840,
        isVeg: true,
        isBestseller: true,
        description: 'Velvety cream cheese slice on a buttery graham cracker crust topped with wild blueberry compote.',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80'
      },
      {
        id: 'dish-602',
        name: 'Molten Belgian Chocolate Lava Cake',
        category: 'Desserts',
        price: 169,
        rating: 4.9,
        reviews: 990,
        isVeg: true,
        isBestseller: true,
        description: 'Warm chocolate cake with an oozing liquid ganache center, dusted with icing sugar.',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80'
      },
      {
        id: 'dish-603',
        name: 'Iced Caramel Macchiato',
        category: 'Beverages',
        price: 159,
        rating: 4.7,
        reviews: 210,
        isVeg: true,
        isBestseller: false,
        description: 'Fresh espresso shot poured over chilled milk, vanilla syrup, and sweet golden caramel drizzle.',
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&q=80'
      }
    ]
  }
];

export const POPULAR_DISHES = [
  {
    id: 'dish-101',
    name: 'Truffle Smash Double Cheeseburger',
    restaurantId: 'rest-1',
    restaurantName: 'Artisan Burger Co.',
    price: 289,
    rating: 4.9,
    isVeg: false,
    description: 'Double smashed patty with truffle aioli on toasted brioche.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80'
  },
  {
    id: 'dish-201',
    name: 'Hyderabadi Dum Gosht Biryani',
    restaurantId: 'rest-2',
    restaurantName: 'Royal Awadh Dum Biryani',
    price: 389,
    rating: 4.9,
    isVeg: false,
    description: 'Aged basmati rice sealed in earthen pots with tender mutton.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80'
  },
  {
    id: 'dish-301',
    name: 'Margherita Burrata Special Pizza',
    restaurantId: 'rest-3',
    restaurantName: 'Napoli Woodfire Pizzeria',
    price: 449,
    rating: 4.9,
    isVeg: true,
    description: 'Wood-fired crust with artisanal burrata and fresh basil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80'
  },
  {
    id: 'dish-601',
    name: 'New York Baked Blueberry Cheesecake',
    restaurantId: 'rest-6',
    restaurantName: 'Sweet Haven Bakery & Cafe',
    price: 219,
    rating: 4.9,
    isVeg: true,
    description: 'Velvety cream cheese slice with wild blueberry compote.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80'
  }
];

export const COUPONS = [
  {
    code: 'CRAVE50',
    title: '50% OFF up to ₹100',
    minOrder: 199,
    discountPercent: 50,
    maxDiscount: 100,
    description: 'Valid on all orders above ₹199 for first 3 orders'
  },
  {
    code: 'FEAST150',
    title: 'Flat ₹150 OFF',
    minOrder: 599,
    flatDiscount: 150,
    description: 'Enjoy weekend party treats with ₹150 discount'
  },
  {
    code: 'FREEDEL',
    title: 'Free Delivery',
    minOrder: 249,
    freeDelivery: true,
    description: 'Zero delivery charges on all favorite partner restaurants'
  },
  {
    code: 'GOURMET20',
    title: '20% OFF on Fine Dining',
    minOrder: 799,
    discountPercent: 20,
    maxDiscount: 250,
    description: 'Valid on premium and artisanal restaurants'
  }
];

export const DEMO_USERS = {
  customer: {
    uid: 'cust-demo-100',
    name: 'Aarav Sharma',
    email: 'customer@cravebite.com',
    phone: '+91 98765 43210',
    role: 'customer',
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
    savedAddresses: [
      { id: 'addr-1', tag: 'Home', flat: 'A-402, Skyline Residency', area: 'Sector 45', city: 'Jaipur', isDefault: true },
      { id: 'addr-2', tag: 'Work', flat: 'Tower B, 5th Floor, Tech Hub', area: 'Cyber City', city: 'Jaipur', isDefault: false }
    ],
    favouriteRestaurants: ['rest-1', 'rest-3'],
    favouriteFoods: ['dish-101', 'dish-301']
  },
  restaurant: {
    uid: 'rest-demo-200',
    name: 'Marco Rossi',
    email: 'restaurant@cravebite.com',
    phone: '+91 98111 22334',
    role: 'restaurant',
    restaurantId: 'rest-1',
    restaurantName: 'Artisan Burger Co.',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80'
  },
  delivery: {
    uid: 'del-demo-300',
    name: 'Vikram Singh',
    email: 'delivery@cravebite.com',
    phone: '+91 97777 88899',
    role: 'delivery',
    vehicleNumber: 'RJ 14 EU 5589',
    vehicleType: 'EV Bike',
    rating: 4.92,
    totalDeliveries: 482,
    isOnline: true,
    profileImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80'
  },
  admin: {
    uid: 'admin-demo-400',
    name: 'Super Admin',
    email: 'admin@cravebite.com',
    phone: '+91 99999 00000',
    role: 'admin',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
  },
  manager: {
    uid: 'mgr-demo-500',
    name: 'Operations Manager',
    email: 'ccadmin@cravebite.internal',
    username: 'ccadmin',
    phone: '+91 99888 77665',
    role: 'manager',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80'
  }
};
