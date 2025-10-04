import express from 'express';
import { body } from 'express-validator';
import { getFAQs } from '../controllers/faqController.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

// Validation rules for FAQ
const faqValidation = [
  body('question')
    .notEmpty()
    .withMessage('Question is required')
    .trim()
    .isLength({ max: 500 })
    .withMessage('Question cannot exceed 500 characters'),
  body('answer')
    .notEmpty()
    .withMessage('Answer is required')
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Answer cannot exceed 5000 characters'),
  body('order')
    .optional()
    .isNumeric()
    .withMessage('Order must be a number'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Category cannot exceed 50 characters')
];

// Routes
router.get('/', getFAQs);
// Admin endpoints removed for security - createFAQ, updateFAQ, deleteFAQ should be protected with auth middleware

export default router;
