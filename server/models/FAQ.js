import mongoose from 'mongoose';

const { Schema } = mongoose;

const FAQSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true,
    unique: true,
    maxlength: [500, 'Question cannot exceed 500 characters']
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    trim: true,
    maxlength: [5000, 'Answer cannot exceed 5000 characters']
  },
  order: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters']
  }
}, {
  timestamps: true,
  collection: 'faqs'
});

// Indexes for efficient querying
FAQSchema.index({ order: 1 });
FAQSchema.index({ isPublished: 1 });

// Static method to get published FAQs sorted by order
FAQSchema.statics.getPublishedFAQs = function() {
  return this.find({ isPublished: true }).sort({ order: 1 });
};

const FAQ = mongoose.model('FAQ', FAQSchema);

export default FAQ;
