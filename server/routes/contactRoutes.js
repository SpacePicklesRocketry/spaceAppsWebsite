import express from 'express';
import { body } from 'express-validator';
import { submitContactForm } from '../controllers/contactController.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

// Validation rules for contact form
const contactValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage('Company name cannot exceed 150 characters'),
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

// Routes
router.post('/', contactValidation, validateRequest, submitContactForm);
// Admin endpoint removed for security - getAllContacts should be protected with auth middleware

export default router;
