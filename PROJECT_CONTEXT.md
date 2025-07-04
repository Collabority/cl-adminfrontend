# Collabority - Frontend Project Context

## Project Overview
**Collabority** is a React-based frontend website for a company specializing in IT solutions, marketing, creative design, and video production. The project uses modern React technologies with a clean, professional design system.

## Company Information
- **Name**: Collabority
- **Tagline**: "Innovate, Elevate, Dominate"
- **Services**: IT Solutions, Digital Marketing, Creative Design, Video Production
- **Location**: Ghaziabad, Uttar Pradesh, India, 201001
- **Contact**: 
  - Email: hello@collabority.in, Info@collabority.in
  - Phone: +91 83193 01961
  - Website: https://www.collabority.in/
- **Working Hours**: 
  - Monday - Friday: 7:00 - 17:00
  - Saturday: 7:00 - 12:00
  - Sunday and holidays: 8:00 - 10:00

## Frontend Technical Stack

### Core Technologies
- **React**: 18.2.0
- **React Router DOM**: 6.20.0
- **Vite**: 5.0.0 (Build tool)
- **Tailwind CSS**: 3.3.5 (Styling)
- **Framer Motion**: 10.16.4 (Animations)
- **React Icons**: 5.5.0 (Icons)
- **React Intersection Observer**: 9.5.2 (Scroll animations)
- **Font Awesome**: 6.7.2 (Additional icons)

### Development Tools
- **ESLint**: 8.53.0 (Code linting)
- **PostCSS**: 8.4.31 (CSS processing)
- **Autoprefixer**: 10.4.16 (CSS vendor prefixes)

## Project Structure

```
CL-frontend/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── collabory-logo.png
│   ├── components/
│   │   ├── about/
│   │   │   ├── HistoryTimeline.jsx
│   │   │   └── FaqSection.jsx
│   │   ├── buttons/
│   │   ├── forms/
│   │   ├── icons/
│   │   ├── ui/
│   │   │   ├── hover-card.jsx
│   │   │   ├── navigation-menu.jsx
│   │   │   └── textarea.jsx
│   │   ├── PageHeader.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── ServicesSection.jsx
│   ├── constants/
│   │   ├── data.js (Colors, texts, animations)
│   │   ├── faqData.js (FAQ content)
│   │   ├── historyTimelineData.js (Company timeline)
│   │   └── about.js
│   ├── context/
│   │   └── AboutContext.jsx
│   ├── layouts/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── AboutUs.jsx
│   │   └── Contact.jsx
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Design System

### Color Palette
- **Primary**: #008080 (Teal)
- **Secondary**: #F8F6F3 (Beige)
- **Text Dark**: #1f2937
- **Text Light**: #6b7280
- **Background**: #ffffff
- **Footer BG**: #111827
- **Hover**: #1d4ed8

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Fallback**: Inter, sans-serif
- **Font Weights**: 400, 500, 600, 700

### Key Components

#### 1. Navbar (`src/layouts/Navbar.jsx`)
**Features**: 
- Responsive design (mobile hamburger menu)
- Active link highlighting
- Logo display
- Navigation links: Home, Services, Blog, About, Career, Portfolio, Contact
- Mobile overlay menu with smooth transitions

#### 2. Footer (`src/layouts/Footer.jsx`)
**Features**:
- Company information and description
- Page links organized in columns
- Working hours display
- Social media links with hover effects
- Contact information with email links
- Copyright notice

#### 3. PageHeader (`src/components/PageHeader.jsx`)
**Features**:
- Animated hero section with background effects
- Breadcrumb navigation
- Customizable title and description
- Responsive design
- Framer Motion animations

## Current Pages

### 1. About Us Page (`src/pages/AboutUs.jsx`)
**Features**:
- Hero section with PageHeader component
- Experience/Intro section with expandable "Read More" functionality
- Service tiles with hover effects and click-to-expand details
- Our Story section with HD business images
- History timeline with company milestones and images
- FAQ section with collapsible questions using Framer Motion
- Animated sections with scroll-triggered animations

**Key Data**:
- Company founded in 2012
- Timeline milestones: 2012 (Founded), 2015 (Expansion), 2018 (Global Reach), 2023 (Innovation)
- Service tiles: IT Solutions, Marketing Strategies, Design & Video Production

### 2. Contact Page (`src/pages/Contact.jsx`)
**Features**:
- Contact tiles (Phone, Email, Location, Social Network) with icons
- Embedded Google Maps (Ghaziabad location)
- "Get in Touch" form with validation
- Video section with YouTube modal (https://www.youtube.com/watch?v=AExAZLYf65Q)
- Responsive grid layout
- Form submission handling

**Contact Information**:
- Phone: +91 83193 01961
- Email: hello@collabority.in
- Location: Ghaziabad, Uttar Pradesh, India
- Social: https://www.collabority.in/

## Data Management

### Constants Files
1. **`src/constants/data.js`**: Global colors, texts, animations, company info
2. **`src/constants/faqData.js`**: FAQ questions and answers
3. **`src/constants/historyTimelineData.js`**: Company timeline data with images
4. **`src/constants/about.js`**: About page specific data

### Context
- **`src/context/AboutContext.jsx`**: React Context for About page data management

## Routing Structure
```javascript
// Current routes in App.jsx
<Routes>
  <Route path="/" element={<Navigate to="/about" replace />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

## Styling Approach
- **Tailwind CSS** for utility-first styling
- **Custom color palette** defined in `tailwind.config.js`
- **Responsive design** with mobile-first approach
- **Custom animations** using Framer Motion
- **Global Poppins font** applied throughout (except Navbar/Footer)
- **Component-based styling** with reusable classes

## Frontend Components Architecture

### Reusable Components
1. **PageHeader**: Hero section component with animations
2. **ScrollToTop**: Smooth scroll to top functionality
3. **HistoryTimeline**: Timeline display component
4. **FaqSection**: Collapsible FAQ component
5. **UI Components**: hover-card, navigation-menu, textarea

### Layout Components
1. **Navbar**: Navigation with mobile responsiveness
2. **Footer**: Site footer with company information
3. **App**: Main app wrapper with routing

### Page Components
1. **AboutUs**: Complete about page with all sections
2. **Contact**: Contact page with form and map

## Animation System
- **Framer Motion** for complex animations
- **Scroll-triggered animations** using React Intersection Observer
- **Hover effects** on interactive elements
- **Smooth transitions** between states
- **Loading animations** for content

## Responsive Design
- **Mobile-first approach**
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible grid systems** using Tailwind CSS
- **Touch-friendly interactions** for mobile devices
- **Optimized images** for different screen sizes

## Frontend Features for Admin Portal

### Content Management Areas
1. **Company Information Management**:
   - Contact details editor (phone, email, address)
   - Working hours configuration
   - Social media links management
   - Company description editor

2. **About Page Content Management**:
   - Hero section content editor
   - Company timeline/milestones management
   - FAQ questions and answers editor
   - Service descriptions editor
   - Image upload and management

3. **Contact Page Management**:
   - Contact form configuration
   - Contact information updates
   - Map location settings
   - Video URL management

4. **General Content Management**:
   - Navigation menu items editor
   - Footer content management
   - Meta descriptions and SEO content
   - Image gallery management

### Admin Portal Frontend Requirements

#### 1. Authentication Interface
- **Login Page**: Clean, branded login form
- **Dashboard**: Overview of content and statistics
- **User Profile**: Admin profile management
- **Logout**: Secure logout functionality

#### 2. Content Management Interface
- **Dashboard Overview**: Quick stats and recent activities
- **Content Editors**: Rich text editors for different content types
- **Media Management**: Image upload, gallery management
- **Form Management**: Contact form submissions viewer

#### 3. Navigation & Layout
- **Admin Sidebar**: Navigation for different sections
- **Breadcrumbs**: Clear navigation hierarchy
- **Responsive Design**: Mobile-friendly admin interface
- **Loading States**: Proper loading indicators

#### 4. User Experience Features
- **Real-time Preview**: Live preview of content changes
- **Auto-save**: Automatic saving of content
- **Search & Filter**: Content search and filtering
- **Bulk Actions**: Multiple item selection and actions

### Admin Portal Component Structure
```
admin-portal/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── RecentActivity.jsx
│   │   ├── content/
│   │   │   ├── ContentEditor.jsx
│   │   │   ├── MediaUpload.jsx
│   │   │   ├── FaqManager.jsx
│   │   │   └── TimelineManager.jsx
│   │   ├── layout/
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AdminHeader.jsx
│   │   │   └── AdminLayout.jsx
│   │   └── ui/
│   │       ├── RichTextEditor.jsx
│   │       ├── ImageUpload.jsx
│   │       └── DataTable.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AboutManager.jsx
│   │   ├── ContactManager.jsx
│   │   └── Settings.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useContent.js
│   ├── utils/
│   │   ├── api.js
│   │   └── helpers.js
│   └── styles/
│       └── admin.css
```

### Admin Portal Design Guidelines
1. **Consistent Branding**: Use same color palette and typography
2. **Professional Interface**: Clean, modern admin design
3. **Intuitive Navigation**: Easy-to-use interface for content management
4. **Responsive Design**: Works on all device sizes
5. **Accessibility**: WCAG compliant design
6. **Performance**: Fast loading and smooth interactions

### Admin Portal Features
1. **Content Preview**: Live preview of changes
2. **Version History**: Track content changes
3. **Media Library**: Organized image and file management
4. **Form Submissions**: View and manage contact form submissions
5. **Analytics Dashboard**: Basic analytics and insights
6. **User Management**: Admin user roles and permissions
7. **Backup & Export**: Content backup and export functionality

## Development Guidelines

### Code Organization
- **Component-based architecture**
- **Reusable components** for common UI elements
- **Consistent naming conventions**
- **Proper file structure** and organization

### Styling Standards
- **Tailwind CSS utilities** for styling
- **Custom CSS classes** for complex components
- **Responsive design** principles
- **Accessibility considerations**

### Performance Optimization
- **Lazy loading** for components and images
- **Code splitting** for better bundle size
- **Optimized images** and assets
- **Efficient animations** and transitions

### Browser Compatibility
- **Modern browsers** support (Chrome, Firefox, Safari, Edge)
- **Mobile browsers** optimization
- **Progressive enhancement** approach

This frontend-focused context provides a comprehensive foundation for building both the main website and admin portal frontend components while maintaining design consistency and modern development practices. 