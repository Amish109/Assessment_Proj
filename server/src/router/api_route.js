import { Router } from 'express';
import { getAtiveCustomers } from '../controller/customer_controller.js';
import { getTransactionsOfAccount, getTransactionsOfAmountBelow5000 } from '../controller/transaction_controller.js';
import { getDistinctListOfProducts } from '../controller/account_controller.js';
const router = Router();

router.route('/get-active-customers').get(getAtiveCustomers);
router.route('/transaction-of-account/:id').get(getTransactionsOfAccount);
router.route('/transaction-of-amount-below-5000').get(getTransactionsOfAmountBelow5000);
router.route('/get-distinct-list-of-products').get(getDistinctListOfProducts);
// router.use('/api/get-active-customers',getAtiveCustomers);

export default router;