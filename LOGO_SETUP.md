# Blue Wave Logo Setup Instructions

## Logo Integration Complete ✅

The Blue Wave Laundry logos have been successfully integrated into the website! Here's what's been implemented:

### Current Logo Placements:

1. **Navigation Bar** - Small logo with text on the left side
2. **Homepage Hero** - Large logo at the top of the hero section
3. **Footer** - White variant logo with text in the business info section

### Logo Component Features:

- **Responsive Sizes**: `sm`, `md`, `lg`, `xl`
- **Color Variants**: `colored`, `white`, `monochrome`
- **With/Without Text**: `Logo` component (icon only) and `LogoWithText` component

### To Add Your Actual Logo Files:

1. **Create logos directory**:

   ```
   mkdir public/logos
   ```

2. **Add your logo files**:

   - `public/logos/blue-wave-logo-colored.png` (for colored version)
   - `public/logos/blue-wave-logo-white.png` (for white version on dark backgrounds)

3. **Update the Logo component**:
   - Open `src/components/Logo.tsx`
   - Uncomment the Image component code (lines 41-49)
   - Comment out the placeholder div (lines 30-38)

### Logo Specifications:

Based on your provided logos, the following variants are available:

1. **Colored Version**: The royal blue and white logo with palm tree and wave graphics
2. **White Version**: For use on dark backgrounds (footer, dark sections)
3. **Monochrome Version**: For special cases

### Current Usage Examples:

```tsx
// Small logo with text in navbar
<LogoWithText size="sm" variant="colored" />

// Large logo in hero section
<Logo size="xl" variant="colored" />

// White logo in footer
<LogoWithText size="md" variant="white" />
```

### Logo Design Notes:

Your logos perfectly capture the Blue Wave brand with:

- **Tropical Theme**: Palm tree and wave graphics
- **Professional Typography**: Clean "LAUNDROMAT" text
- **Brand Colors**: Royal blue and white color scheme
- **Modern Design**: Contemporary styling that works well with the website

The logos are now seamlessly integrated and will automatically adapt to different contexts throughout the website!

