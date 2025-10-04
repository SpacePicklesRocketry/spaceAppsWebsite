import 'dotenv/config';
import mongoose from 'mongoose';
import connectDatabase, { disconnectDatabase } from '../config/database.js';
import FAQ from '../models/FAQ.js';

const seedFAQs = async () => {
  try {
    // Connect to database
    await connectDatabase();
    console.log('Connected to database for seeding');

    // Clear existing FAQs
    await FAQ.deleteMany({});
    console.log('Cleared existing FAQs');

    // Seed data matching the frontend placeholder data
    const seedData = [
      {
        question: "What is LEO Satellite Hub?",
        answer: "LEO Satellite Hub is an affordable space research platform that provides modular satellite systems for universities, research institutions, and small companies. We offer customizable solutions for various space research applications including Earth observation, communication experiments, and scientific missions.",
        order: 1,
        isPublished: true,
        category: "general"
      },
      {
        question: "How much does it cost?",
        answer: "Our pricing is designed to be affordable for educational and research institutions. We offer flexible pricing models including modular packages starting from $50,000 for basic systems, with additional modules available as needed. Contact us for a detailed quote based on your specific requirements.",
        order: 2,
        isPublished: true,
        category: "pricing"
      },
      {
        question: "What technical expertise is required?",
        answer: "While some technical knowledge is helpful, our platform is designed to be accessible to researchers with varying levels of space technology experience. We provide comprehensive documentation, training materials, and ongoing support to help your team get started. Basic knowledge of programming and electronics is recommended.",
        order: 3,
        isPublished: true,
        category: "technical"
      },
      {
        question: "How long does setup take?",
        answer: "Setup time varies depending on your specific requirements and technical complexity. Basic systems can be deployed within 3-6 months, while more complex configurations may take 6-12 months. We work closely with your team throughout the process to ensure smooth implementation and testing.",
        order: 4,
        isPublished: true,
        category: "general"
      },
      {
        question: "What kind of research can we conduct?",
        answer: "Our modular platform supports various types of space research including Earth observation, atmospheric studies, communication experiments, technology demonstrations, and scientific missions. The modular design allows you to customize payloads and systems based on your specific research objectives.",
        order: 5,
        isPublished: true,
        category: "research"
      }
    ];

    // Insert seed data
    const insertedFAQs = await FAQ.insertMany(seedData);
    console.log(`Successfully seeded ${insertedFAQs.length} FAQs`);

    // Close database connection
    await disconnectDatabase();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedFAQs();
