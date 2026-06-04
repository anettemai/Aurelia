# Aurelia

Aurelia is a luxury clothing brand web application that offers designer clothing and accessories through an online shopping platform. The project is a prototype implementation of an e-commerce storefront that focuses on natural, high-quality, and eco-friendly materials while providing a minimal, luxurious user experience.

## Key features
- Browse products by main category (Women, Men, Exclusive)
- Dropdown subcategory filtering (seasonal and exclusive collections)
- Product listing and product detail pages (images, price, description, material, size guide)
- Size selection and cart management
- Simulated checkout with order confirmation (no real payment processing)

Notes:
- Originally planned categories: Women, Men, Accessories with clothing-type subcategories (dresses, jeans, etc.). Restructed to Women, Men, Exclusive with seasonal collections (Spring, Summer, Fall) to better reflect the luxury brand identity.

## User flow
1. Homepage with navigation to main categories, a hero banner, and popular products.
2. Select a main category → choose a subcategory from a dropdown.
3. View product listing for the subcategory.
4. Open a product detail page to view materials, sizes, and size guide.
5. Add item(s) to cart → review cart → proceed to simulated checkout → order confirmation.

## Tech stack
- Frontend: React
- Styling: Custom CSS
- Backend: Node.js + Express.js
- Database: PostgreSQL

Notes:
- Originally planned to use Bootstrap, opted for custom CSS to achieve a luxury aesthetic.

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
- `GET /products?category={Women|Men|Exclusive}` - Get products by category
- `GET /products?category={category}&collection={1|2|3}` - Filter by collection  
- `GET /products/search?q={keyword}` — Search products by name
- `GET /products/featured?ids={1,2,3}` — Get featured products by IDs
- `GET /products/:id` — Get single product details

### Cart Management
- `POST /cart/add` - Add item to cart
- `GET /cart` - View cart contents
- `PUT /cart/update` - Update item quantity 
- `DELETE /cart/remove` - Remove item from cart
- `DELETE /cart/clear` — Clear entire cart

Note:
- Cart is stored server-side in Express sessions. React Context (CartContext) calls these endpoints and shares the cart state across all frontend components.

### Orders  
- `POST /orders` - Place order (checkout)

### Example API Usage
```bash
# Place an order
curl -X POST http://localhost:5001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_info": {
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "jane@example.com",
      "phone_number": "+358 00 000 0000",
      "shipping_address": "123 Main St, Helsinki, 00100, Finland"
    },
    "cart_items": [
      { "product_id": 1, "size": "M", "quantity": 1, "price": "299.00" }
    ]
  }'
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

  # Import schema
  psql -U <your-username> -d aurelia_db < schema.sql
  ```


4. **Configure environment (local & production)**

Environment variables are used to keep credentials and deploy-time configuration out of source control. This project provides `backend/.env.example` which lists the variables the backend expects. Do not commit real secrets — copy the example to a local `.env` for development.

Local development (recommended)

- Copy the example and edit the values locally:

```bash
cd backend
cp .env.example .env
# edit .env and fill in DB_PASSWORD and any other values
```

- The backend uses `dotenv` (already added to `backend/package.json`) so running the server will automatically load values from `backend/.env`.

- Required variables (from `.env.example`):

```
DB_USER   # database username
DB_PASSWORD  # database password (leave blank if not set)
DB_HOST   # e.g. localhost
DB_PORT   # e.g. 5432
DB_NAME   # e.g. aurelia_db
PORT      # optional: port the Express server listens on, default 5001
```

- You can also set variables in your shell for a single run (zsh):

```bash
export DB_USER=your_db_user
export DB_PASSWORD=your_db_password
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=aurelia_db
export PORT=5001
node server.js
```

For production, set environment variables through your host/platform configuration (do not commit a `.env` file).

Security & best practices

- Never commit secret values. Keep `backend/.env.example` in the repo as documentation and store real secrets locally or in your CI/host platform.
- For automated builds (CI) use the CI provider's secret storage. In production, provide secrets via your host/platform configuration rather than committing them.

Start the server (local)

```bash
cd backend
npm install      # if you haven't already
node server.js
```

Server runs on http://localhost:5001 (or the `PORT` you set)

### Frontend Setup
```bash
cd Aurelia/frontend
npm install
npm start
```

Frontend runs on http://localhost:3000

## Contributing
Contributions, issues, and feature requests are welcome. Please open issues or pull requests in this repository and include a clear description of changes and rationale.
