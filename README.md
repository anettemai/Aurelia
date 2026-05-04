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

## Development / Local setup (overview)
1. Clone the repository.
2. Install dependencies for each part of the project (example: `cd Frontend && npm install`; `cd Backend && npm install`).
3. Configure a local PostgreSQL database and set environment variables for database connection in the backend.
4. Run any database migrations or seed scripts if present.
5. Start backend and frontend servers (e.g. `npm start` / framework-specific start commands).

Provide actual commands, ports, and environment variable names in the backend and frontend README or documentation files when available.

## Contributing
Contributions, issues, and feature requests are welcome. Please open issues or pull requests in this repository and include a clear description of changes and rationale.
