# E-Commerce Project

A modern e-commerce application built with Next.js, TypeScript, and Stripe for payments.

## Features

- 🛒 Shopping cart functionality
- 💳 Stripe payment integration
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🔒 Server-side actions
- 🎯 TypeScript support

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Payment Processing:** Stripe
- **UI Components:** Shadcn/ui

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Stripe account

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── checkout/
│   │   ├── checkout-action.ts
│   │   └── page.tsx
│   ├── success/
│   │   └── page.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── lib/
│   └── stripe.ts
├── store/
│   └── cart-store.ts
└── public/
```

## Key Features Implementation

### Shopping Cart
- Uses Zustand for state management
- Persists cart data in localStorage
- Supports adding, removing, and updating quantities

### Checkout Process
- Server-side action for secure payment processing
- Stripe integration for payment handling
- Success and cancel pages for payment flow

## API Routes

### Checkout Action
- **Path:** `/checkout`
- **Method:** POST
- **Description:** Handles the checkout process and creates a Stripe session
- **Request Body:**
  ```typescript
  {
    items: CartItem[]
  }
  ```

## State Management

The project uses Zustand for state management. The main store is defined in `store/cart-store.ts`:

```typescript
interface CartStore {
  item: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}
```

## Styling

The project uses:
- Tailwind CSS for utility-first styling
- Shadcn/ui for pre-built components
- Custom components in the `components` directory

## Deployment

1. Build the project:
```bash
npm run build
# or
yarn build
```

2. Start the production server:
```bash
npm start
# or
yarn start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Improvements

- [ ] User authentication
- [ ] Product categories
- [ ] Search functionality
- [ ] Order history
- [ ] Admin dashboard
- [ ] Multiple payment methods
- [ ] Product reviews
- [ ] Wishlist feature

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email lokmankhodziri@gmail.com or open an issue in the repository.
