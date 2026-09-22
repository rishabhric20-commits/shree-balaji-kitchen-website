import heroImage from '../assets/images/hero_thali_tiffin_1786084926944.jpg';
import tiffinBoxImage from '../assets/images/tiffin_boxes_1786084946199.jpg';
import specialThaliImage from '../assets/images/special_thali_1786084961655.jpg';

export const BUSINESS_INFO = {
  name: 'Shree Balaji Home Tiffin Services',
  tagline: 'Fresh. Hygienic. Homemade.',
  owner: 'Rishabh Yadav',
  establishedYear: 2021,
  yearsOfService: '5+',
  type: 'Home-Based Tiffin & Meal Delivery',
  address: {
    street: 'House No. 24, Shanti Nagar, Near Hanuman Mandir',
    area: 'Aliganj',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226024',
    full: 'House No. 24, Shanti Nagar, Near Hanuman Mandir, Aliganj, Lucknow, Uttar Pradesh - 226024'
  },
  contact: {
    phone: '+91 70077 67076',
    whatsapp: '917007767076',
    email: 'info@shreebalajitiffin.in',
    website: 'www.shreebalajitiffin.in'
  },
  hours: {
    weekday: 'Monday - Saturday: 7:00 AM – 10:00 PM',
    sunday: 'Sunday: 8:00 AM – 2:00 PM',
    lunchDelivery: '11:30 AM – 2:00 PM',
    dinnerDelivery: '7:30 PM – 9:30 PM'
  },
  stats: {
    happyCustomers: '1,500+',
    mealsDelivered: '75,000+',
    dailyOrders: '180+',
    googleRating: '4.8/5',
    totalReviews: '420+'
  },
  images: {
    hero: heroImage,
    tiffinBox: tiffinBoxImage,
    specialThali: specialThaliImage
  }
};

export const WEEKLY_MENU = [
  {
    day: 'Monday',
    rotis: '4 Fresh Tawa Rotis (with Ghee)',
    mainCurry: 'Aloo Gobhi Masala',
    sideCurry: 'Homestyle Dal Tadka',
    rice: 'Jeera Rice',
    extras: ['Fresh Green Salad', 'Mango Pickle'],
    description: 'A comforting classic combination of tempered yellow lentil with spiced potato cauliflower fry.',
    calories: 520,
    protein: '16g'
  },
  {
    day: 'Tuesday',
    rotis: '4 Fresh Tawa Rotis',
    mainCurry: 'Dilli Style Chole Masala',
    sideCurry: 'Lauki Chana Dal / Seasonal Sabzi',
    rice: 'Steamed Basmati Rice',
    extras: ['Sliced Onion & Lemon Salad', 'Fried Green Chili'],
    description: 'Protein-packed chickpea curry simmered in aromatic home spices with fluffy rice.',
    calories: 560,
    protein: '19g'
  },
  {
    day: 'Wednesday',
    rotis: '4 Fresh Tawa Rotis',
    mainCurry: 'Nutritious Mix Vegetable',
    sideCurry: 'Garlic Dal Fry',
    rice: 'Steamed Rice',
    extras: ['Cucumber Salad', 'Papad'],
    description: 'Assorted seasonal vegetables pan-cooked with home spices alongside fragrant garlic lentil stew.',
    calories: 490,
    protein: '15g'
  },
  {
    day: 'Thursday',
    rotis: '4 Fresh Tawa Rotis',
    mainCurry: 'Punjabi Rajma Masala',
    sideCurry: 'Aloo Jeera / Baingan Bharta',
    rice: 'Aromatic Jeera Rice',
    extras: ['Kachumber Salad', 'Mixed Pickle'],
    description: 'Slow-cooked kidney beans in rich onion-tomato gravy served with cumin scented basmati rice.',
    calories: 540,
    protein: '18g'
  },
  {
    day: 'Friday',
    rotis: '4 Butter Rotis',
    mainCurry: 'Shahi Paneer Butter Masala',
    sideCurry: 'Yellow Moong Dal',
    rice: 'Steamed Basmati Rice',
    extras: ['Fresh Salad', 'Pickle'],
    description: 'Tender cottage cheese cubes in rich creamy tomato sauce - Friday night favorite!',
    calories: 610,
    protein: '22g'
  },
  {
    day: 'Saturday',
    rotis: '2 Whole Wheat Parathas / 4 Rotis',
    mainCurry: 'Veg Matar Pulao / Special Biryani',
    sideCurry: 'Aloo Matar Gravy',
    rice: 'Vegetable Pulao',
    extras: ['Boondi Raita', 'Gulab Jamun / Sweet Dish'],
    description: 'Weekend special feast featuring fragrant vegetable pulao, spiced pea curry, and a homemade sweet.',
    calories: 630,
    protein: '17g'
  },
  {
    day: 'Sunday',
    rotis: '4 Hot Puri / Rotis',
    mainCurry: 'Special Paneer / Kadai Veg',
    sideCurry: 'Khatte Meethe Aloo',
    rice: 'Matar Rice',
    extras: ['Raita', 'Festive Kheer / Halwa'],
    description: 'Special Sunday delight menu prepared with extra love for lunch order.',
    calories: 650,
    protein: '20g'
  }
];

export const PRICING_PLANS = [
  {
    id: 'single-meal',
    name: 'Single Trial / One-Time Meal',
    price: 90,
    period: 'meal',
    description: 'Perfect when you need a hot, homemade meal delivered to your doorstep today.',
    features: [
      '4 Roti + Main Sabzi + Dal + Rice',
      'Includes Salad & Pickle',
      'Delivered hot in leak-proof tiffin',
      'Trial discount available for ₹80',
      'No subscription commitment required'
    ]
  },
  {
    id: 'daily-lunch',
    name: 'Daily Lunch Subscription',
    price: 2200,
    period: 'month',
    description: '30 Days of hearty, hygienic lunch for office professionals, bachelors & students.',
    features: [
      '30 Days Lunch Delivery (11:30 AM - 2:00 PM)',
      'Rotating weekly menu (No repetitive food!)',
      'Free delivery within 5 km',
      'Pause subscription anytime (1 day notice)',
      'Custom spice & oil levels available'
    ]
  },
  {
    id: 'daily-dinner',
    name: 'Daily Dinner Subscription',
    price: 2200,
    period: 'month',
    description: 'Relax after work with warm, light, home-cooked dinner delivered daily.',
    features: [
      '30 Days Dinner Delivery (7:30 PM - 9:30 PM)',
      'Freshly cooked evening batches',
      'Light & easy to digest recipes',
      'Free delivery within 5 km',
      'Pause & resume feature'
    ]
  },
  {
    id: 'lunch-dinner-combo',
    name: 'Lunch + Dinner Combo',
    price: 4100,
    period: 'month',
    popular: true,
    savingsBadge: 'SAVE ₹300/MONTH',
    description: 'Complete monthly meal solution. Never worry about cooking or meal planning again!',
    features: [
      '60 Meals total (Both Lunch & Dinner)',
      'Priority delivery guaranteed',
      'Custom Jain / Diet food customization',
      'Free delivery included',
      'Free festival special sweets on holidays',
      'Dedicated support line'
    ]
  },
  {
    id: 'family-pack',
    name: 'Family Pack (4 Persons)',
    price: 350,
    period: 'day',
    description: 'Generous homestyle food quantity designed for nuclear families or roommate sharing.',
    features: [
      'Sufficient for 4 hungry adults',
      '16 Rotis + Large Dal + Large Sabzi + Rice',
      'Salad, Pickle & Dessert bowl',
      'Significant cost savings vs individual meals',
      'Delivered in large hot containers'
    ]
  }
];

export const SERVICES_LIST = [
  {
    title: 'Daily Lunch Tiffin',
    desc: 'Hot, fresh lunch delivered directly to your desk or home between 11:30 AM and 2:00 PM.',
    icon: 'Sun'
  },
  {
    title: 'Daily Dinner Tiffin',
    desc: 'Homestyle light dinner prepared fresh every evening, delivered between 7:30 PM and 9:30 PM.',
    icon: 'Moon'
  },
  {
    title: 'Monthly Subscription',
    desc: 'Hassle-free 30-day meal plans with pause/resume flexibility and zero delivery fee.',
    icon: 'Calendar'
  },
  {
    title: 'Weekly Meal Plan',
    desc: '7-day test plan for short stays or quick office assignments.',
    icon: 'Clock'
  },
  {
    title: 'Office Lunch Delivery',
    desc: 'Corporate meal packages and group tiffin deliveries for companies in Lucknow.',
    icon: 'Briefcase'
  },
  {
    title: 'Family Meal Packs',
    desc: 'Wholesome 4-person meal packs for households looking for pure vegetarian home food.',
    icon: 'Users'
  },
  {
    title: 'Festival Special Meals',
    desc: 'Traditional festive feasts with sweets (Puri, Halwa, Paneer, Kheer) for festivals.',
    icon: 'Sparkles'
  },
  {
    title: 'Bulk Food Orders',
    desc: 'Catering for small house parties, puja functions, birthdays, and get-togethers.',
    icon: 'Utensils'
  }
];

export const FEATURES = [
  {
    title: 'Fresh Homemade Food',
    desc: 'Prepared daily with minimal oil, pure spices, and 100% wholesome ingredients by Rishabh Yadav and team.',
    icon: 'HeartHandshake'
  },
  {
    title: '100% Pure Vegetarian',
    desc: 'Strictly 100% veg kitchen environment. Jain meal options available on request.',
    icon: 'Leaf'
  },
  {
    title: 'Hygienic Kitchen',
    desc: 'Clean stainless steel utensils, hairnets, glove-handling, and sanitized packing process.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Free Delivery (Within 5 km)',
    desc: 'Zero delivery charges for customers in Aliganj, Jankipuram, Kapoorthala & surrounding 5 km radius.',
    icon: 'Truck'
  },
  {
    title: 'Affordable Rates',
    desc: 'Quality meals starting at just ₹90 per thali, making healthy eating accessible for everyone.',
    icon: 'Tag'
  },
  {
    title: 'Custom Diet Meals',
    desc: 'Need less spice, no garlic/onion, or extra rotis? We tailor meals to your personal health needs.',
    icon: 'Sliders'
  }
];

export const DELIVERY_AREAS = [
  { name: 'Aliganj', pincode: '226024', distanceKm: 1.2, isFreeDelivery: true, estimatedMinutes: 20 },
  { name: 'Jankipuram', pincode: '226021', distanceKm: 3.5, isFreeDelivery: true, estimatedMinutes: 25 },
  { name: 'Kapoorthala', pincode: '226020', distanceKm: 2.1, isFreeDelivery: true, estimatedMinutes: 20 },
  { name: 'Mahanagar', pincode: '226006', distanceKm: 4.8, isFreeDelivery: true, estimatedMinutes: 30 },
  { name: 'Vikas Nagar', pincode: '226022', distanceKm: 3.0, isFreeDelivery: true, estimatedMinutes: 25 },
  { name: 'Gomti Nagar', pincode: '226010', distanceKm: 7.5, isFreeDelivery: false, estimatedMinutes: 40 },
  { name: 'Indira Nagar', pincode: '226016', distanceKm: 6.2, isFreeDelivery: false, estimatedMinutes: 35 },
  { name: 'Hazratganj', pincode: '226001', distanceKm: 6.8, isFreeDelivery: false, estimatedMinutes: 35 }
];

export const CUSTOMER_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Priya Sharma',
    role: 'IT Professional (Gomti Nagar)',
    comment: "Food tastes just like home. The dal tadka and roti remind me of my mother's kitchen in Kanpur. Highly recommended!",
    rating: 5,
    date: '2 days ago',
    area: 'Gomti Nagar',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Amit Verma',
    role: 'Banking Executive (Hazratganj)',
    comment: 'Always delivered on time. Fresh, piping hot and healthy meals without excess oil. Ideal for daily office lunch.',
    rating: 5,
    date: '1 week ago',
    area: 'Aliganj',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Neha Singh',
    role: 'Student (Jankipuram)',
    comment: 'Best tiffin service for students in Lucknow! Super clean packaging, generous portion size, and very polite uncle.',
    rating: 5,
    date: '2 weeks ago',
    area: 'Jankipuram',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Rahul Gupta',
    role: 'CA Student',
    comment: 'Affordable prices and excellent quality. The monthly combo subscription saved me so much time during exam prep.',
    rating: 5,
    date: '3 weeks ago',
    area: 'Kapoorthala',
    verified: true
  }
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'Do you provide trial meals?',
    answer: 'Yes! We offer a special 1-meal trial box for just ₹80 (regular price ₹90) so you can experience our quality, taste, and packaging before subscribing.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'Is delivery free?',
    answer: 'Delivery is 100% FREE for all locations within a 5 km radius of our kitchen in Aliganj (including Jankipuram, Kapoorthala, Vikas Nagar, Mahanagar). For areas beyond 5 km (like Gomti Nagar or Hazratganj), a nominal ₹20-30 delivery charge applies per drop.',
    category: 'Delivery'
  },
  {
    id: 'faq-3',
    question: 'Can I pause my monthly subscription if I travel?',
    answer: 'Absolutely! You can pause your subscription anytime with 24 hours prior notice over WhatsApp or Call. The paused days will be carried forward to your next billing cycle.',
    category: 'Subscription'
  },
  {
    id: 'faq-4',
    question: 'Do you prepare Jain food?',
    answer: 'Yes, we prepare 100% authentic Jain food without onion, garlic, or root vegetables on request in a dedicated pure vegetarian preparation area.',
    category: 'Food & Diet'
  },
  {
    id: 'faq-5',
    question: 'What are the delivery timings?',
    answer: 'Lunch is delivered between 11:30 AM and 2:00 PM. Dinner is delivered between 7:30 PM and 9:30 PM.',
    category: 'Delivery'
  },
  {
    id: 'faq-6',
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI (Google Pay, PhonePe, Paytm, BHIM), Cash on Delivery, Bank Transfer, and major online payment apps.',
    category: 'General'
  }
];

export const PAYMENT_METHODS = [
  { name: 'UPI / QR Code', icon: 'QrCode', desc: 'Scan and pay instantly using any UPI app' },
  { name: 'Google Pay', icon: 'Smartphone', desc: 'GPay ID: 7007767076@okbizaxis' },
  { name: 'PhonePe', icon: 'Smartphone', desc: 'PhonePe Number: +91 7007767076' },
  { name: 'Paytm', icon: 'Wallet', desc: 'Paytm Wallet / UPI' },
  { name: 'Cash on Delivery', icon: 'Banknote', desc: 'Pay directly to our delivery executive' },
  { name: 'Bank Transfer', icon: 'Landmark', desc: 'IMPS/NEFT account details provided on invoice' }
];
