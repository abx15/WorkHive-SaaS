# 🐝 WorkHive – Multi-Tenant SaaS Platform

🚀 **A production-ready, full-stack multi-tenant SaaS platform where teams can create workspaces, manage projects, and collaborate efficiently with a credit-based usage system.**

## ✨ Features

### 🔐 Authentication & Security
- **NextAuth.js** integration with credentials provider
- Secure session management
- Protected routes and API endpoints

### 🏢 Multi-Tenant Architecture
- **Workspace-based isolation** for teams
- **Role-Based Access Control (RBAC)**: Admin, Manager, Member
- Team member invitations and management

### 📁 Project & Task Management
- **Kanban board** with drag-and-drop functionality
- Task creation, assignment, and tracking
- Project organization and collaboration
- Task priorities and due dates

### 💳 Credit-Based Monetization
- **Three-tier subscription system**: FREE, PRO ($9.99), ENTERPRISE
- **Stripe integration** for secure payments
- **Credit limits**: FREE (100/month, 5/day), PRO (1000/month, 50/day)
- **Webhook processing** for real-time subscription updates
- **Customer portal** for subscription management

### 📊 Analytics & Dashboard
- **Beautiful dashboard** with real-time statistics
- **Credit usage charts** and analytics
- Workspace and project metrics
- **Dark mode** support with smooth transitions

### 🎨 Modern UI/UX
- **Framer Motion** animations and transitions
- **Glassmorphism effects** and gradient designs
- **Toast notifications** with Sonner
- **Responsive design** for all devices
- **Component library** with ShadCN UI

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ShadCN UI** components
- **Framer Motion** for animations
- **next-themes** for dark mode
- **Recharts** for data visualization
- **Sonner** for notifications

### Backend & Database
- **Prisma ORM** with PostgreSQL
- **NextAuth.js** for authentication
- **Stripe** for payments
- **API Routes** with Next.js
- **Webhooks** for real-time updates

### Development
- **ESLint** and **Prettier** for code quality
- **Git hooks** for pre-commit checks
- **Environment variables** management

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Dashboard+with+Stats+and+Charts)

### Kanban Board
![Kanban Board](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Kanban+Board+with+Tasks)

### Pricing Page
![Pricing](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Pricing+Page+with+Subscription+Plans)

### Billing Management
![Billing](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Billing+Management+Portal)

## 🌐 Live Demo

🚀 **Coming soon!** The live demo will be available at: `https://workhive-demo.vercel.app`

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/abx15/WorkHive-SaaS.git
cd WorkHive-SaaS
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/workhive"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_PRICE_ID="price_..."
```

### 4. Database Setup
```bash
npx prisma db push
npx prisma generate
```

### 5. Stripe Configuration
```bash
# Create Stripe products and prices
npx tsx scripts/setup-stripe.ts
```

### 6. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📋 API Documentation

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/register` - User registration

### Workspaces
- `GET /api/workspace` - List user workspaces
- `POST /api/workspace` - Create new workspace
- `PUT /api/workspace/:id` - Update workspace
- `DELETE /api/workspace/:id` - Delete workspace

### Projects & Tasks
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task

### Payments
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/portal` - Customer portal access
- `POST /api/stripe/webhook` - Stripe webhook handler

## 💡 Architecture Highlights

### Multi-Tenancy
- Workspace-based data isolation
- Row-level security with Prisma
- Tenant-specific routing

### Credit System
- Real-time credit tracking
- Monthly/daily limits enforcement
- Usage analytics and reporting

### Payment Processing
- Secure Stripe integration
- Webhook-driven subscription management
- Customer self-service portal

### Performance
- Optimized database queries
- Component-level code splitting
- Image optimization with Next.js

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Environment Variables for Production
```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=production-secret
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_live_...
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Linting
```bash
npm run lint
```

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with code splitting
- **API Response**: <200ms average response time
- **Database**: Indexed queries for optimal performance

## 🔒 Security Features

- **Authentication**: Secure session management
- **Authorization**: Role-based access control
- **Data Validation**: Input sanitization and validation
- **HTTPS**: SSL/TLS encryption
- **Webhook Security**: Signature verification
- **CSRF Protection**: Built-in Next.js protections

## 🔄 CI/CD Pipeline

- **GitHub Actions** for automated testing
- **Vercel** for continuous deployment
- **Database Migrations** with Prisma
- **Environment Management** with proper secrets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Future Improvements

### 🚀 Planned Features
- [ ] **AI-powered task suggestions** with OpenAI integration
- [ ] **Real-time collaboration** with WebSockets
- [ ] **Mobile applications** (React Native)
- [ ] **Advanced analytics** with custom reports
- [ ] **Team templates** for quick setup
- [ ] **Integrations** with Slack, GitHub, etc.
- [ ] **Custom workflows** and automation
- [ ] **Advanced permissions** and granular access control

### 🎯 Business Features
- [ ] **Annual billing** with discounts
- [ ] **Team plans** with volume pricing
- [ ] **White-labeling** for enterprise clients
- [ ] **API access** for third-party integrations
- [ ] **Custom domains** for workspaces

## 🏆 Built With ❤️

**WorkHive** was designed and built as a demonstration of modern SaaS architecture, showcasing:

- **Scalable multi-tenant design**
- **Production-ready payment processing**
- **Modern React/Next.js patterns**
- **Beautiful UI/UX with animations**
- **Comprehensive feature set**

---

**Built with passion by [Arun Kumar Bind](https://github.com/abx15)**

📧 **Contact**: developerarunwork@gmail.com  
🔗 **LinkedIn**: [https://www.linkedin.com/in/arun-kumar-a3b047353/](https://www.linkedin.com/in/arun-kumar-a3b047353/)  
🌐 **Portfolio**: [arun15dev.netlify.app](https://arun15dev.netlify.app/)

---

*"I designed and built a scalable multi-tenant SaaS platform with RBAC, credit-based monetization, and subscription billing, similar to real-world tools like Notion or Slack."*
