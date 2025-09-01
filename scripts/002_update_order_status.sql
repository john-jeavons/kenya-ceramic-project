-- Add new order status for payment tracking
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_initiated_at TIMESTAMP;

-- Update existing orders to have proper status
UPDATE orders 
SET status = 'pending' 
WHERE status IS NULL OR status = '';

-- Add index for better performance on status queries
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_ref ON payments(transaction_ref);
