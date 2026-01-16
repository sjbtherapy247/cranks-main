/**
 * Script to populate Sanity with content from cranks.com.au
 * Run with: node scripts/populate-sanity.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-08-05',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Store Information Content
const storeInfo = {
  _type: 'storeInfo',
  _id: 'storeInfo',
  businessName: 'Cranks Bikes',
  tagline: 'Your trusted local bike shop for premium bikes, expert service, and cycling gear',
  description: 'Cranks is your local independent bike and scooter shop located in Chatswood on Sydney\'s North Shore. We provide you with friendly sales, service and advice about all things to do with bikes, ebikes and scooters.',
  
  // Contact Information
  phone: '+61 2 9417 3776',
  email: 'sales@cranks.com.au',
  website: 'https://cranks.com.au',
  
  // Address
  address: {
    street: '352A Penshurst Street',
    suburb: 'Chatswood',
    state: 'NSW',
    postcode: '2067',
    country: 'Australia'
  },
  
  // Business Details
  yearsInBusiness: '30+',
  businessType: 'Independent bike and scooter shop',
  serviceArea: 'Chatswood and North Shore Sydney',
  specialty: 'Bikes, ebikes, scooters, expert service',
  
  // Opening Hours
  openingHours: {
    monday: { open: '09:00', close: '17:00' },
    tuesday: { open: '09:00', close: '17:00' },
    wednesday: { open: '09:00', close: '17:00' },
    thursday: { open: '09:00', close: '17:00' },
    friday: { open: '09:00', close: '17:00' },
    saturday: { open: '09:00', close: '16:00' },
    sunday: { open: '09:00', close: '15:00' }
  },
  
  // Features
  features: [
    'Free service within first 3 months of purchase',
    '30+ years serving Chatswood and North Shore',
    'Independent local business',
    'Fast stock availability',
    'Expert advice and friendly service'
  ],
  
  // Social & Marketing
  newsletterSignup: 'Subscribe to get great offers from Cranks!',
  callToAction: 'Call us or Call in if you need anything bike!',
  
  // Business Hours Note
  businessHoursNote: 'Please see our Google page for our bank holiday opening hours'
};

// Homepage Content
const homePage = {
  _type: 'homePage',
  _id: 'homePage',
  title: 'Home Page',
  
  heroTitle: 'Your Local Bike Shop for 30+ Years',
  heroSubtitle: 'Serving Chatswood and Sydney\'s North Shore with premium bikes, expert service, and cycling gear. We\'re your trusted independent bike shop with friendly advice and unbeatable service.',
  
  ctaButtons: [
    {
      text: 'Call Now: 02 9417 3776',
      link: 'tel:+61294173776',
      variant: 'primary'
    },
    {
      text: 'Visit Our Shop',
      link: '/contact',
      variant: 'outline'
    }
  ],
  
  featuredCategories: [
    {
      title: 'Bikes for Everyone',
      description: 'Mountain bikes, road bikes, ebikes, and kids bikes from trusted brands',
      link: '/category/bikes'
    },
    {
      title: 'Scooters & Fun',
      description: 'Kids scooters, stunt scooters, and adult scooters for all ages',
      link: '/category/scooters'
    },
    {
      title: 'Expert Service',
      description: 'Professional repairs and free 3-month service with new purchases',
      link: '/our-services'
    }
  ],
  
  aboutPreview: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Cranks is your local independent bike shop in Chatswood, serving Sydney\'s North Shore for over 30 years. We offer expert advice, premium bikes, and unbeatable service including free 3-month service with every new purchase.'
        }
      ]
    }
  ],
  
  newsletterTitle: 'Stay in the Loop!',
  newsletterSubtitle: 'Be the first to learn about our latest offers and new lines in stock',
  
  seo: {
    metaTitle: 'Cranks Bikes Chatswood - Your Local Sydney Bike Shop | 30+ Years Experience',
    metaDescription: 'Sydney\'s trusted bike shop in Chatswood. Premium bikes, expert service, free 3-month service guarantee. Serving North Shore for 30+ years. Call 02 9417 3776'
  }
};

// Services Content
const services = [
  {
    _type: 'service',
    title: 'Bike Sales',
    description: 'Wide selection of bikes, ebikes, and scooters from trusted brands',
    price: 'Varies by model',
    duration: 'Consultation included',
    features: [
      'Mountain bikes, road bikes, ebikes',
      'Kids bikes for all ages', 
      'Expert advice on selection',
      'Brand partnerships with Trek, Factor, Norco'
    ],
    slug: { current: 'bike-sales' }
  },
  {
    _type: 'service',
    title: 'Expert Repairs & Service',
    description: 'Professional bike servicing and repairs by experienced mechanics',
    price: 'From $30',
    duration: 'Same day to 1 week',
    features: [
      'Complete bike overhauls',
      'Brake and gear adjustments',
      'Tire and tube replacements',
      'Component upgrades'
    ],
    slug: { current: 'expert-repairs-service' }
  },
  {
    _type: 'service',
    title: 'Free 3-Month Service',
    description: 'Complimentary service within first 3 months of new bike or scooter purchase',
    price: 'FREE',
    duration: '30 minutes',
    features: [
      'Included with every new purchase',
      'Safety check and adjustments',
      'Keep your new bike running perfectly',
      'Peace of mind guarantee'
    ],
    slug: { current: 'free-3-month-service' },
    featured: true
  },
  {
    _type: 'service',
    title: 'Expert Advice & Consultation',
    description: 'Friendly advice on all cycling needs from our experienced team',
    price: 'Free consultation',
    duration: 'As needed',
    features: [
      'Bike selection guidance',
      'Accessory recommendations',
      'Maintenance tips',
      '30+ years of experience'
    ],
    slug: { current: 'expert-advice-consultation' }
  },
  {
    _type: 'service',
    title: 'Stock Ordering & Availability',
    description: 'Fast access to products not currently in stock',
    price: 'No additional charge',
    duration: '1-2 days typically',
    features: [
      'Fast supplier relationships',
      'Wide brand network',
      'Call to check availability',
      'Quick turnaround times'
    ],
    slug: { current: 'stock-ordering-availability' }
  }
];

// Blog Categories
const categories = [
  {
    _type: 'category',
    title: 'Cycling Tips',
    description: 'Helpful advice for cyclists of all levels',
    slug: { current: 'cycling-tips' }
  },
  {
    _type: 'category',
    title: 'Bike Maintenance',
    description: 'Keep your bike in top condition with our maintenance guides',
    slug: { current: 'bike-maintenance' }
  },
  {
    _type: 'category',
    title: 'Product Spotlights',
    description: 'Featured bikes, accessories, and gear recommendations',
    slug: { current: 'product-spotlights' }
  },
  {
    _type: 'category',
    title: 'Shop News',
    description: 'Latest news and updates from Cranks Bikes',
    slug: { current: 'shop-news' }
  },
  {
    _type: 'category',
    title: 'Kids & Family',
    description: 'Everything for young cyclists and family bike adventures',
    slug: { current: 'kids-family' }
  }
];

// Function to create or update documents
async function createDocument(doc) {
  try {
    const result = await client.createOrReplace(doc);
    console.log(`✅ Created/Updated: ${doc._type} - ${doc.title || doc.businessName || doc._id}`);
    return result;
  } catch (error) {
    console.error(`❌ Error creating ${doc._type}:`, error.message);
    throw error;
  }
}

// Main execution function
async function populateSanity() {
  console.log('🚀 Starting Sanity content population...\n');
  
  try {
    // Create Store Information
    console.log('📍 Creating Store Information...');
    await createDocument(storeInfo);
    
    // Create Homepage
    console.log('\n🏠 Creating Homepage Content...');
    await createDocument(homePage);
    
    // Create Services
    console.log('\n🛠️  Creating Services...');
    for (const service of services) {
      await createDocument(service);
    }
    
    // Create Categories
    console.log('\n📂 Creating Blog Categories...');
    for (const category of categories) {
      await createDocument(category);
    }
    
    console.log('\n🎉 Content population completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Store Information: ✅`);
    console.log(`- Homepage Content: ✅`);
    console.log(`- Services: ${services.length} ✅`);
    console.log(`- Categories: ${categories.length} ✅`);
    console.log('\n🎨 You can now view and edit this content in Sanity Studio:');
    console.log('http://localhost:3000/studio');
    
  } catch (error) {
    console.error('\n❌ Error during content population:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  populateSanity();
}

module.exports = { populateSanity };