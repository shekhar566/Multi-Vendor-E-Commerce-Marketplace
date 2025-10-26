import config from "@payload-config";
import { getPayload } from "payload";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Business & Money",
    slug: "business-money",
    color: "#FFB347",
    subcategories: [
      { name: "Accounting", slug: "accounting" },
      { name: "Entrepreneurship", slug: "entrepreneurship" },
      { name: "Gigs & Side Projects", slug: "gigs-side-projects" },
      { name: "Investing", slug: "investing" },
      { name: "Management & Leadership", slug: "management-leadership" },
      { name: "Marketing & Sales", slug: "marketing-sales" },
    ],
  },
  {
    name: "Technology & IT",
    slug: "technology-it",
    color: "#36C5F0",
    subcategories: [
      { name: "Software Development", slug: "software-development" },
      { name: "AI & Machine Learning", slug: "ai-ml" },
      { name: "Data Science", slug: "data-science" },
      { name: "Cybersecurity", slug: "cybersecurity" },
    ],
  },
  {
    name: "Health & Wellness",
    slug: "health-wellness",
    color: "#FF6B6B",
    subcategories: [
      { name: "Fitness", slug: "fitness" },
      { name: "Nutrition", slug: "nutrition" },
      { name: "Mental Health", slug: "mental-health" },
    ],
  },
  {
    name: "Education & Learning",
    slug: "education-learning",
    color: "#6A4C93",
    subcategories: [
      { name: "Online Courses", slug: "online-courses" },
      { name: "Certifications", slug: "certifications" },
      { name: "Tutorials", slug: "tutorials" },
    ],
  },
  {
    name: "Electronics",
    slug: "electronics",
    color: "#36C5F0",
    subcategories: [
      { name: "Mobiles", slug: "mobiles" },
      { name: "Laptops", slug: "laptops" },
      { name: "Cameras", slug: "cameras" },
      { name: "Audio", slug: "audio" },
    ],
  },
  {
    name: "Fashion",
    slug: "fashion",
    color: "#FF6B6B",
    subcategories: [
      { name: "Men's Clothing", slug: "mens-clothing" },
      { name: "Women's Clothing", slug: "womens-clothing" },
      { name: "Footwear", slug: "footwear" },
      { name: "Accessories", slug: "accessories" },
    ],
  },
  {
    name: "Home & Living",
    slug: "home-living",
    color: "#FFB347",
    subcategories: [
      { name: "Furniture", slug: "furniture" },
      { name: "Decor", slug: "decor" },
      { name: "Kitchenware", slug: "kitchenware" },
      { name: "Bedding", slug: "bedding" },
    ],
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    color: "#6A4C93",
    subcategories: [
      { name: "Skincare", slug: "skincare" },
      { name: "Makeup", slug: "makeup" },
      { name: "Haircare", slug: "haircare" },
      { name: "Fragrances", slug: "fragrances" },
    ],
  },
  {
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    color: "#1ABC9C",
    subcategories: [
      { name: "Fitness Equipment", slug: "fitness-equipment" },
      { name: "Cycling", slug: "cycling" },
      { name: "Camping", slug: "camping" },
      { name: "Team Sports", slug: "team-sports" },
    ],
  },
  {
    name: "Toys & Kids",
    slug: "toys-kids",
    color: "#FF9F1C",
    subcategories: [
      { name: "Action Figures", slug: "action-figures" },
      { name: "Dolls", slug: "dolls" },
      { name: "Educational Toys", slug: "educational-toys" },
      { name: "Board Games", slug: "board-games" },
    ],
  },
  {
    name: "Books & Stationery",
    slug: "books-stationery",
    color: "#E63946",
    subcategories: [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "School Supplies", slug: "school-supplies" },
      { name: "Office Supplies", slug: "office-supplies" },
    ],
  },
  {
    name: "Automotive",
    slug: "automotive",
    color: "#2A9D8F",
    subcategories: [
      { name: "Car Accessories", slug: "car-accessories" },
      { name: "Motorbike Accessories", slug: "motorbike-accessories" },
      { name: "Tools & Parts", slug: "tools-parts" },
    ],
  },
  {
    name: "Groceries",
    slug: "groceries",
    color: "#F4A261",
    subcategories: [
      { name: "Fruits & Vegetables", slug: "fruits-vegetables" },
      { name: "Snacks", slug: "snacks" },
      { name: "Beverages", slug: "beverages" },
      { name: "Dairy & Eggs", slug: "dairy-eggs" },
    ],
  },
  {
    name: "Pet Supplies",
    slug: "pet-supplies",
    color: "#8D99AE",
    subcategories: [
      { name: "Dog Supplies", slug: "dog-supplies" },
      { name: "Cat Supplies", slug: "cat-supplies" },
      { name: "Bird Supplies", slug: "bird-supplies" },
      { name: "Aquarium", slug: "aquarium" },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  // create admin tenant
  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "admin",
      slug: "admin",
      stripeAccountId: "admin",
    },
  });

  // create admin user
  await payload.create({
    collection: "users",
    data: {
      email: "admin@demo.com",
      password: "demo",
      roles: ["super-admin"],
      username: "admin",
      tenants: [
        {
          tenant: adminTenant.id,
        },
      ],
    },
  });

  for (const category of categories) {
    // Create parent category
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color || null,
        parent: null,
      },
    });

    // Create subcategories
    for (const subCategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }

  console.log("✅ Seeding complete successfully");
};

try {
  await seed();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
