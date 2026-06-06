# Har Ghar Services - Color Theme

## Modern Teal + Orange + Cream Theme

### Color Palette

| Color Name | Hex Code | Usage | CSS Variable |
|------------|----------|-------|--------------|
| **Deep Teal** | #115E59 | Primary actions, links, borders | `--primary`, `--teal-800` |
| **Aqua** | #2DD4BF | Secondary accents, highlights | `--secondary`, `--teal-400` |
| **Orange CTA** | #FB923C | Call-to-action buttons, conversions | `--cta`, `--orange-400` |
| **Cream Background** | #FEF3C7 | Page background, cards | `--background`, `--cream-100` |
| **Charcoal Text** | #1F2937 | Primary text, headings | `--foreground` |

### Full Color Scale

#### Teal Colors
```css
teal-50:   #F0FDFA
teal-100:  #CCFBF1
teal-200:  #99F6E4
teal-300:  #5EEAD4
teal-400:  #2DD4BF  /* Aqua */
teal-500:  #14B8A6
teal-600:  #0D9488
teal-700:  #0F766E
teal-800:  #115E59  /* Deep Teal */
teal-900:  #134E4A
teal-950:  #042F2E
```

#### Orange Colors
```css
orange-50:  #FFF7ED
orange-100: #FFEDD5
orange-200: #FED7AA
orange-300: #FDBA74
orange-400: #FB923C  /* CTA Orange */
orange-500: #F97316
orange-600: #EA580C
orange-700: #C2410C
orange-800: #9A3412
orange-900: #7C2D12
orange-950: #431407
```

#### Cream Colors
```css
cream-50:  #FFFBEB
cream-100: #FEF3C7  /* Cream Background */
cream-200: #FDE68A
cream-300: #FCD34D
cream-400: #FBBF24
cream-500: #F59E0B
cream-600: #D97706
cream-700: #B45309
cream-800: #92400E
cream-900: #78350F
cream-950: #451A03
```

### CSS Variables

The theme uses CSS variables for easy theming and dark mode support:

```css
:root {
  /* Background & Text */
  --background: oklch(0.96 0.04 85);    /* Cream */
  --foreground: oklch(0.31 0.04 215);   /* Charcoal */

  /* Primary Colors (Teal) */
  --primary: oklch(0.40 0.12 180);      /* Deep Teal */
  --primary-foreground: oklch(0.99 0.01 85);

  /* Secondary Colors (Aqua) */
  --secondary: oklch(0.72 0.12 180);    /* Aqua */
  --secondary-foreground: oklch(0.31 0.04 215);

  /* CTA Color (Orange) */
  --cta: oklch(0.72 0.15 40);           /* Orange */
  --cta-foreground: oklch(0.31 0.04 215);

  /* Muted & Accent */
  --muted: oklch(0.93 0.03 85);
  --muted-foreground: oklch(0.50 0.05 215);
  --accent: oklch(0.72 0.15 40);        /* Orange accent */
  --accent-foreground: oklch(0.99 0.01 85);

  /* Borders & Inputs */
  --border: oklch(0.85 0.03 180);
  --input: oklch(0.88 0.03 180);
  --ring: oklch(0.40 0.12 180);         /* Teal focus ring */
}
```

### Usage Guidelines

#### Primary Actions (Teal)
Use for:
- Links
- Navigation items
- Informational icons
- Primary branding elements

```jsx
<Button variant="primary">Primary Action</Button>
<div className="text-teal-800">Teal text</div>
```

#### CTA Buttons (Orange)
Use for:
- Sign Up buttons
- Book Now buttons
- Proceed to Payment
- Add to Cart
- Any conversion-focused action

```jsx
<Button className="bg-cta hover:bg-cta/foreground text-cta-foreground">
  Sign Up
</Button>
```

#### Secondary Actions (Aqua)
Use for:
- Secondary buttons
- Highlights
- Hover states
- Success indicators

```jsx
<Button variant="secondary">Secondary</Button>
```

#### Backgrounds (Cream)
Use for:
- Page backgrounds
- Card backgrounds
- Section backgrounds
- Modal backgrounds

```jsx
<section className="bg-cream-100">
<Card className="bg-background">
```

### Component Updates

#### Updated Components
1. **Landing Page** (`src/app/page.tsx`)
   - Hero search button: Orange CTA
   - Sign Up buttons: Orange CTA
   - Book a Service Now: Orange CTA
   - CTA section: Teal gradient with orange buttons

2. **Services Page** (`src/components/ServicesPage.tsx`)
   - Sign Up button: Orange CTA
   - Category filters: Teal on hover

3. **Service Card** (`src/components/ServiceCard.tsx`)
   - Book Now button: Orange border, orange on hover
   - Book This Service: Orange CTA
   - Proceed to Payment: Orange CTA

4. **Customer Dashboard** (`src/components/CustomerDashboard.tsx`)
   - Add New Address: Orange CTA
   - Save Changes: Orange CTA
   - Default address card: Teal border

### Dark Mode Support

The theme includes full dark mode support with inverted colors:
- Dark teal backgrounds
- Lighter teal for primary actions
- Orange CTAs remain for visibility
- Adjusted contrast for readability

### Benefits of This Theme

1. **Premium Look**: The cream background with teal accents creates a warm, professional feel
2. **Trustworthy**: Teal conveys trust and reliability (perfect for service platforms)
3. **Conversion-Focused**: Orange CTAs stand out against the teal/cream background
4. **Mobile-Friendly**: Good contrast ratios for outdoor visibility
5. **Modern**: Contemporary color palette that feels fresh and current
6. **Accessible**: Proper color contrast for readability

### Custom CSS Classes

The theme includes a custom CTA button class:

```css
.btn-cta {
  background-color: oklch(0.72 0.15 40);
  color: oklch(0.31 0.04 215);
}

.btn-cta:hover {
  background-color: oklch(0.65 0.15 40);
}
```

### Best Practices

1. **Limit Orange Usage**: Reserve orange (#FB923C) for CTAs only
2. **Teal for Trust**: Use teal for navigation, links, and information
3. **Cream for Warmth**: Cream backgrounds create a welcoming feel
4. **Consistent Hierarchy**: Maintain visual hierarchy with color usage
5. **Accessibility**: Always check contrast ratios, especially with cream backgrounds

### Color Combinations

#### Recommended Combinations
- **Primary CTA**: Orange button on cream background
- **Secondary CTA**: Teal button on cream background
- **Navigation**: Teal text on cream background
- **Cards**: White/cream cards with teal borders
- **Alerts**: Teal for success, red for errors
- **Text**: Charcoal for body, teal for links

#### Avoid
- Orange for non-CTA elements
- Teal backgrounds with teal text (low contrast)
- Too many colors in one section
- Orange on light cream (low contrast)

### Testing

The theme has been tested and verified:
- ✅ No lint errors
- ✅ Compiles successfully
- ✅ Works in light mode
- ✅ Works in dark mode
- ✅ All components updated
- ✅ Responsive design maintained

---

**Theme Status**: ✅ Successfully implemented across all components
