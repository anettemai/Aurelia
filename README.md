# Aurelia

Aurelia is a luxury clothing brand web application that offers designer clothing and accessories through an online shopping platform. The project is a prototype implementation of an e-commerce storefront that focuses on natural, high-quality, and eco-friendly materials while providing a minimal, luxurious user experience.

## Key features
- Browse products by main category (Women, Men, Accessories)
- Dropdown subcategory filtering (e.g. dresses, skirts, jeans, coats)
- Product listing and product detail pages (images, price, description, material, size guide)
- Size selection and cart management
- Simulated checkout with order confirmation (no real payment processing)

## User flow
1. Homepage with navigation to main categories, a hero banner, and popular products.
2. Select a main category → choose a subcategory from a dropdown.
3. View product listing for the subcategory.
4. Open a product detail page to view materials, sizes, and size guide.
5. Add item(s) to cart → review cart → proceed to simulated checkout → order confirmation.

## Tech stack
- Frontend: React
- Styling: Bootstrap
- Backend: Node.js + Express.js
- Database: PostgreSQL

## Data model
The database contains four main entities:

- Product
  - Attributes (examples): name, price, description, image URL, material, available sizes, size guide, main category, subcategory
- Customer
  - Stores customer profile and contact information
- Order
  - Stores order ID, customer reference, order date, total price, payment status (simulated)
- OrderItem
  - Line items belonging to an Order: product reference, quantity, selected size, price per item

Notes:
- Checkout is simulated for the prototype — no external payment gateway is integrated.

## API Documentation

### Base URL
```
http://localhost:5001/api
```

### Products
- `GET /products?category={Women|Men|Accessories}` - Get products by category
- `GET /products?category={category}&collection={1|2|3}` - Filter by collection  
- `GET /products/:id` - Get single product details

### Cart Management
- `POST /cart/add` - Add item to cart
- `GET /cart` - View cart contents
- `PUT /cart/update` - Update item quantity 
- `DELETE /cart/remove` - Remove item from cart

### Orders  
- `POST /cart/orders` - Place order (checkout)
- `GET /orders/:id` - Get order details

### Example API Usage
```bash
# Add item to cart
curl -X POST http://localhost:5001/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"product_id": 1, "quantity": 2, "size": "M"}'
```

### Development / Local Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher) 
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Aurelia/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database setup**
   ```bash
   # Create database
   createdb aurelia_db
   
   # Connect and run SQL setup
   psql -h localhost -U <your-username> -d aurelia_db
   ```
   
   Import the database schema and sample data (files in `/database` folder)

4. **Configure environment**
   Create `.env` file in backend directory:
   ```
   PORT=5001
   DB_HOST=localhost
   DB_USER=<your-username>
   DB_PASSWORD=<your-password>
   DB_NAME=aurelia_db
   ```

5. **Start the server**
   ```bash
   node server.js
   ```
   
   Server runs on http://localhost:5001

### Frontend Setup
```bash
cd Aurelia/frontend
npm install
npm start
```

Frontend runs on http://localhost:3000

## Contributing
Contributions, issues, and feature requests are welcome. Please open issues or pull requests in this repository and include a clear description of changes and rationale.
