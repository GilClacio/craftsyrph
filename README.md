# CraftSyrph - Textile Crafts Showcase Website

A beautiful, mobile-friendly website for showcasing personal textile crafts with blog functionality, project management, and e-commerce integration.

## 🎨 Features

- **Project Showcase**: Display textile projects with detailed documentation
- **Blog Functionality**: Share tutorials, project stories, and crafting insights
- **Mobile-First Design**: Optimized for all device sizes
- **Project Management**: Track project status, materials, and progress updates
- **Photo Galleries**: Showcase project images and process documentation
- **Video Integration**: Embed instructional videos
- **Bill of Materials**: Track materials and costs for each project
- **Equipment Cataloging**: Document tools and equipment used
- **Etsy Integration**: Link completed projects to Etsy store listings
- **Search & Filter**: Find projects and blog posts easily
- **Progress Tracking**: Update project status and milestones

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd craftsyrph
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser to see the website.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Heroicons](https://heroicons.com/) & [Lucide React](https://lucide.dev/)
- **Fonts**: [Geist](https://vercel.com/font)
- **Development**: ESLint, Turbopack

## 📁 Project Structure

```
src/
├── app/                    # App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog listing and individual posts
│   │   └── [slug]/        # Dynamic blog post pages
│   ├── contact/           # Contact page
│   ├── projects/          # Projects listing and details
│   │   └── [id]/          # Dynamic project detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
└── components/            # Reusable components
    └── Navigation.tsx     # Main navigation component
```

## 🎯 Key Pages

### Home Page
- Hero section with craft showcase
- Featured projects grid
- About preview section

### Projects Page
- Filterable project gallery
- Search functionality
- Project status indicators (completed, in-progress, planning)
- Category filtering (embroidery, knitting, quilting, etc.)

### Project Detail Pages
- Comprehensive project documentation
- Material lists with costs
- Equipment used
- Progress timeline
- Photo galleries
- Instructional videos
- Etsy integration links

### Blog
- Tutorial posts and project stories
- Category filtering
- Tag-based navigation
- Featured posts
- Newsletter signup

### About Page
- Personal story and journey
- Skills and expertise
- Timeline of achievements
- Crafting philosophy

### Contact Page
- Contact form with inquiry types
- Social media links
- Etsy store integration
- FAQ section

## 🎨 Customization

### Colors
The website uses a pink and purple color scheme that can be customized in the Tailwind configuration:
- Primary: Pink (pink-600)
- Secondary: Purple (purple-600)
- Accent: Various complementary colors

### Content Management
Currently uses static data structures. To make it dynamic, you can:
1. Integrate with a CMS (Contentful, Strapi, Sanity)
2. Add a database (MongoDB, PostgreSQL)
3. Implement an admin dashboard

### Etsy Integration
Update the Etsy store links in the project data structures to point to your actual Etsy listings.

## 🚢 Deployment

### Build the Application
```bash
npm run build
```

### Deploy Options
- **Vercel**: Automatic deployment with Git integration
- **Netlify**: Easy static site hosting
- **Railway**: Full-stack deployment
- **Self-hosted**: Use `npm start` after building

## 📱 Mobile Optimization

The website is built mobile-first with:
- Responsive navigation with hamburger menu
- Touch-friendly interface elements
- Optimized image loading
- Mobile-friendly forms and interactions

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Features
1. Create new pages in the `src/app` directory
2. Add reusable components in `src/components`
3. Update navigation in `Navigation.tsx`
4. Follow the existing TypeScript and styling patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or support:
- Create an issue in the repository
- Contact through the website's contact form
- Check the documentation for common solutions
