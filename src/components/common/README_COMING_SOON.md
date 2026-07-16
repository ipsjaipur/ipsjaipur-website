# ComingSoon Component

A beautiful, animated "Coming Soon" component for upcoming pages that matches the IPS Business School theme.

## Features

- 🎨 **Theme-matched design** using IPS brand colors (#eb5905 orange, #222222 primary)
- 📱 **Fully responsive** - works perfectly on mobile, tablet, and desktop
- ✨ **Smooth animations** using Framer Motion
- 🎯 **Customizable content** - flexible props for different use cases
- 🔙 **Optional back button** - navigate easily back to home
- 🌊 **Animated background** with floating particles and gradients

## Usage

### Basic Usage

```jsx
import ComingSoon from "@/components/common/ComingSoon";

export default function MyPage() {
  return <ComingSoon />;
}
```

### With Custom Props

```jsx
import ComingSoon from "@/components/common/ComingSoon";

export default function MyPage() {
  return (
    <ComingSoon 
      title="Blog"
      subtitle="Insights & Updates Coming Soon"
      message="Our blog is currently under development. Stay tuned for exciting updates!"
      showBackButton={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "Coming Soon" | Main heading text |
| `subtitle` | string | "We're working on something amazing!" | Subheading text |
| `message` | string | "This page is under construction..." | Descriptive message |
| `showBackButton` | boolean | true | Show/hide the back to home button |

## Examples

### Blog Page
```jsx
<ComingSoon 
  title="Blog"
  subtitle="Insights & Updates Coming Soon"
  message="Our blog is currently under development. Soon you'll find valuable insights about business education, career guidance, and more."
  showBackButton={true}
/>
```

### Terms & Conditions
```jsx
<ComingSoon 
  title="Terms & Conditions"
  subtitle="Legal Documentation Coming Soon"
  message="We're preparing comprehensive terms and conditions for your review."
  showBackButton={true}
/>
```

### Privacy Policy
```jsx
<ComingSoon 
  title="Privacy Policy"
  subtitle="Your Privacy Matters to Us"
  message="We're finalizing our comprehensive privacy policy to ensure transparency."
  showBackButton={true}
/>
```

### Custom Page (No Back Button)
```jsx
<ComingSoon 
  title="Special Feature"
  subtitle="Something Exciting Is On The Way"
  message="We're building something special just for you!"
  showBackButton={false}
/>
```

## Design Elements

- **Animated Clock Icon** - Central focal point with pulsing glow effect
- **Sparkles** - Rotating accent icon
- **Gradient Background** - Soft orange to white gradient
- **Floating Blobs** - Animated background elements
- **Loading Dots** - Animated dot sequence
- **Progress Bar** - Visual indicator showing 60% completion
- **Floating Particles** - 6 animated particles across the screen

## Responsive Breakpoints

- **Mobile** (< 640px): Optimized text sizes and spacing
- **Tablet** (640px - 1024px): Medium sizing
- **Desktop** (> 1024px): Full-sized elements

## Typography

The component uses the following fonts from your theme:
- **Montserrat** - Main title (bold)
- **Rubik** - Body text (default)

## Color Palette

- Primary: `#222222` (IPS Primary)
- Accent: `#eb5905` (IPS Orange)
- Secondary: `#ff9e3d` (IPS Amber)
- Text: `#77838f` (IPS Steel)

## Animation Features

1. **Entry animations** - Elements fade in with staggered delays
2. **Continuous animations** - Pulsing icon, rotating sparkles, floating particles
3. **Hover effects** - Button transforms on hover
4. **Progress animation** - Bar fills to 60% on load

## Dependencies

Make sure these packages are installed:
- `framer-motion` - For animations
- `lucide-react` - For icons
- `next/link` - For navigation

## Notes

- The component is a client component (`'use client'`)
- Minimum height is set to `70vh` for proper centering
- All animations are optimized for performance
- Fully accessible with semantic HTML
