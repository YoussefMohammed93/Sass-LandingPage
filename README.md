# Critter - Pet Care Business SaaS Landing Page

A modern, responsive landing page for Critter, a digital office management solution designed specifically for pet care businesses. Built with Next.js 14, TypeScript, Tailwind CSS, and enhanced with sophisticated GSAP animations.

## 🚀 Features

- **Modern Design**: Clean, professional interface optimized for pet care businesses
- **Responsive Layout**: Fully responsive design that works seamlessly across all devices
- **Advanced Animations**: Sophisticated GSAP animations with scroll-triggered effects
- **Accessibility First**: Built with accessibility in mind, including reduced motion support
- **Performance Optimized**: Fast loading times with Next.js optimization features
- **TypeScript**: Full type safety throughout the application
- **SEO Ready**: Optimized meta tags and structure for search engines

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) with ScrollTrigger
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Fonts**: Inter & Ovo (Google Fonts)
- **Linting**: ESLint with Next.js configuration

## 📁 Project Structure

```
sass-landing-page/
├── app/                    # Next.js App Router
│   ├── contact-us/        # Contact page
│   ├── features/          # Features page
│   ├── pricing/           # Pricing page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── button.tsx         # Custom button component
│   ├── header.tsx         # Navigation header
│   ├── footer.tsx         # Site footer
│   ├── hero-section.tsx   # Hero section with animations
│   ├── features-*.tsx     # Various feature sections
│   ├── pricing-*.tsx      # Pricing components
│   ├── contact.tsx        # Contact form
│   └── scroll-to-top-button.tsx
├── public/                # Static assets
│   ├── *.svg             # SVG illustrations
│   ├── *.webp            # Optimized images
│   └── favicon.png       # Site favicon
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Design Features

### Typography

- **Headings**: Ovo font for elegant, professional headings
- **Body Text**: Inter font for excellent readability
- **Responsive**: Fluid typography that scales across devices

### Color Scheme

- **Primary**: Orange accent color (#E75837)
- **Background**: Clean white and light gray backgrounds
- **Text**: High contrast text for accessibility

### Animations

- **Entrance Effects**: Staggered animations for content sections
- **Scroll Triggers**: Elements animate as they enter the viewport
- **Hover States**: Interactive button and element hover effects
- **Parallax**: Subtle parallax scrolling for hero images
- **Accessibility**: Respects `prefers-reduced-motion` settings

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sass-landing-page
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Pages

### Home Page (`/`)

- Hero section with animated elements
- Feature showcases with GSAP animations
- Technology highlights
- Call-to-action sections

### Features Page (`/features`)

- Detailed feature explanations
- Business-focused content
- Software capabilities showcase

### Pricing Page (`/pricing`)

- Pricing plans and tiers
- Feature comparisons
- Call-to-action buttons

### Contact Page (`/contact-us`)

- Contact form with validation
- Business information
- Interactive elements

## 🎨 Customization

### Colors

Update the color scheme in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: "var(--primary)",
    90: "rgba(231, 88, 55, 0.9)",
    5: "rgba(231, 88, 55, 0.05)",
  },
  // Add your custom colors
}
```

### Fonts

Modify fonts in `app/layout.tsx`:

```typescript
const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});
```

### Animations

Customize GSAP animations in individual component files. Each component includes:

- Entrance animations
- Scroll-triggered effects
- Hover interactions
- Accessibility considerations

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Custom**: 825px (md-custom breakpoint)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion support
- High contrast text
- Focus indicators

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [GSAP](https://greensock.com/) for powerful animations
- [React Icons](https://react-icons.github.io/) for beautiful icons
- [Vercel](https://vercel.com/) for seamless deployment

---

Built with ❤️ for pet care businesses everywhere.
