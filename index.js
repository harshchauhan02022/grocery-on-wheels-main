const express = require('express');
const bodyParser = require('body-parser');
const ProductRoutes = require('./src/routes/ProductRoutes');
const UserRoutes = require('./src/routes/UserRoutes');
const VanBookingRoutes = require('./src/routes/VanBookingRoutes');
const CustomerRoutes = require('./src/routes/CustomerRoutes');
const SupplierRoutes = require('./src/routes/SupplierRouters'); // Corrected path
const CouponRoutes = require('./src/routes/CouponRoutes')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
 res.send('Hello World');
});

app.use('/products', ProductRoutes);
app.use('/user', UserRoutes);
app.use('/VanBooking', VanBookingRoutes);
app.use('/customers', CustomerRoutes);
app.use('/suppliers', SupplierRoutes); // Corrected usage
app.use('/coupons', CouponRoutes)

app.listen(8000, () => {
 console.log('Server running at http://localhost:8000');
});
