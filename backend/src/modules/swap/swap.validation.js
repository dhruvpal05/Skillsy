import { body } from 'express-validator';

export const swapValidation = [
  body('recipient').notEmpty().withMessage('Recipient is required'),
  body('skillOffered').notEmpty().withMessage('Skill offered is required'),
  body('skillRequested').notEmpty().withMessage('Skill requested is required'),
  body('message').optional().isString()
];

export const swapStatusValidation = [
  body('status').isIn(['accepted', 'rejected']).withMessage('Status must be accepted or rejected')
];
