# Design System Template

A comprehensive design language template with tokens, components, and guidelines.

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Atomic Components](#atomic-components)
3. [Component Patterns](#component-patterns)
4. [Accessibility Guidelines](#accessibility-guidelines)

---

## Design Tokens

### Color System

#### Primary Colors
```
primary-50:   #[hex-value]   // Lightest tint
primary-100:  #[hex-value]
primary-200:  #[hex-value]
primary-300:  #[hex-value]
primary-400:  #[hex-value]
primary-500:  #[hex-value]   // Base primary color
primary-600:  #[hex-value]
primary-700:  #[hex-value]
primary-800:  #[hex-value]
primary-900:  #[hex-value]   // Darkest shade
primary-950:  #[hex-value]
```

#### Secondary Colors
```
secondary-50:   #[hex-value]
secondary-100:  #[hex-value]
secondary-200:  #[hex-value]
secondary-300:  #[hex-value]
secondary-400:  #[hex-value]
secondary-500:  #[hex-value]   // Base secondary color
secondary-600:  #[hex-value]
secondary-700:  #[hex-value]
secondary-800:  #[hex-value]
secondary-900:  #[hex-value]
secondary-950:  #[hex-value]
```

#### Semantic Colors
```
// Success
success-50:   #[hex-value]
success-500:  #[hex-value]   // Base success
success-700:  #[hex-value]
success-900:  #[hex-value]

// Warning
warning-50:   #[hex-value]
warning-500:  #[hex-value]   // Base warning
warning-700:  #[hex-value]
warning-900:  #[hex-value]

// Error/Danger
error-50:     #[hex-value]
error-500:    #[hex-value]   // Base error
error-700:    #[hex-value]
error-900:    #[hex-value]

// Info
info-50:      #[hex-value]
info-500:     #[hex-value]   // Base info
info-700:     #[hex-value]
info-900:     #[hex-value]
```

#### Neutral/Gray Scale
```
gray-50:      #[hex-value]   // White/lightest
gray-100:     #[hex-value]
gray-200:     #[hex-value]
gray-300:     #[hex-value]
gray-400:     #[hex-value]
gray-500:     #[hex-value]   // Mid gray
gray-600:     #[hex-value]
gray-700:     #[hex-value]
gray-800:     #[hex-value]
gray-900:     #[hex-value]   // Black/darkest
gray-950:     #[hex-value]
```

#### Surface Colors
```
background:           #[hex-value]   // Page background
surface:              #[hex-value]   // Card/container background
surface-variant:      #[hex-value]   // Alternative surface
surface-elevated:     #[hex-value]   // Elevated/modal background
overlay:              rgba([r,g,b], 0.5)   // Modal overlay
```

#### Text Colors
```
text-primary:         #[hex-value]   // Primary text
text-secondary:       #[hex-value]   // Secondary/muted text
text-tertiary:        #[hex-value]   // Tertiary/disabled text
text-inverse:         #[hex-value]   // Text on dark backgrounds
text-on-primary:      #[hex-value]   // Text on primary color
text-on-secondary:    #[hex-value]   // Text on secondary color
text-link:            #[hex-value]   // Hyperlinks
text-link-hover:      #[hex-value]   // Hovered links
```

#### Border Colors
```
border-default:       #[hex-value]   // Default borders
border-subtle:        #[hex-value]   // Subtle borders
border-strong:        #[hex-value]   // Strong/emphasized borders
border-focus:         #[hex-value]   // Focus ring color
border-error:         #[hex-value]   // Error state borders
```

---

### Typography

#### Font Families
```
font-sans:     [font-stack]     // e.g., 'Inter', system-ui, sans-serif
font-serif:    [font-stack]     // e.g., 'Georgia', serif
font-mono:     [font-stack]     // e.g., 'Fira Code', monospace
font-display:  [font-stack]     // e.g., 'Playfair Display', serif
```

#### Font Sizes
```
text-xs:       0.75rem      // 12px
text-sm:       0.875rem     // 14px
text-base:     1rem         // 16px (base)
text-lg:       1.125rem     // 18px
text-xl:       1.25rem      // 20px
text-2xl:      1.5rem       // 24px
text-3xl:      1.875rem     // 30px
text-4xl:      2.25rem      // 36px
text-5xl:      3rem         // 48px
text-6xl:      3.75rem      // 60px
text-7xl:      4.5rem       // 72px
```

#### Font Weights
```
font-thin:         100
font-extralight:   200
font-light:        300
font-normal:       400
font-medium:       500
font-semibold:     600
font-bold:         700
font-extrabold:    800
font-black:        900
```

#### Line Heights
```
leading-none:      1
leading-tight:     1.25
leading-snug:      1.375
leading-normal:    1.5
leading-relaxed:   1.625
leading-loose:     2
```

#### Letter Spacing
```
tracking-tighter:  -0.05em
tracking-tight:    -0.025em
tracking-normal:   0
tracking-wide:     0.025em
tracking-wider:    0.05em
tracking-widest:   0.1em
```

#### Type Scale Presets
```
display-large:
  font-size: text-6xl
  font-weight: font-bold
  line-height: leading-tight
  letter-spacing: tracking-tight

display-medium:
  font-size: text-5xl
  font-weight: font-bold
  line-height: leading-tight
  letter-spacing: tracking-tight

display-small:
  font-size: text-4xl
  font-weight: font-bold
  line-height: leading-snug
  letter-spacing: tracking-normal

headline-large:
  font-size: text-3xl
  font-weight: font-semibold
  line-height: leading-snug
  letter-spacing: tracking-normal

headline-medium:
  font-size: text-2xl
  font-weight: font-semibold
  line-height: leading-snug
  letter-spacing: tracking-normal

headline-small:
  font-size: text-xl
  font-weight: font-semibold
  line-height: leading-normal
  letter-spacing: tracking-normal

title-large:
  font-size: text-lg
  font-weight: font-medium
  line-height: leading-normal
  letter-spacing: tracking-normal

title-medium:
  font-size: text-base
  font-weight: font-medium
  line-height: leading-normal
  letter-spacing: tracking-normal

title-small:
  font-size: text-sm
  font-weight: font-medium
  line-height: leading-normal
  letter-spacing: tracking-normal

body-large:
  font-size: text-base
  font-weight: font-normal
  line-height: leading-relaxed
  letter-spacing: tracking-normal

body-medium:
  font-size: text-sm
  font-weight: font-normal
  line-height: leading-normal
  letter-spacing: tracking-normal

body-small:
  font-size: text-xs
  font-weight: font-normal
  line-height: leading-normal
  letter-spacing: tracking-normal

label-large:
  font-size: text-sm
  font-weight: font-medium
  line-height: leading-tight
  letter-spacing: tracking-wide

label-medium:
  font-size: text-xs
  font-weight: font-medium
  line-height: leading-tight
  letter-spacing: tracking-wide

label-small:
  font-size: text-xs
  font-weight: font-medium
  line-height: leading-none
  letter-spacing: tracking-wider
```

---

### Spacing Scale

```
space-0:       0
space-px:      1px
space-0.5:     0.125rem    // 2px
space-1:       0.25rem     // 4px
space-1.5:     0.375rem    // 6px
space-2:       0.5rem      // 8px
space-2.5:     0.625rem    // 10px
space-3:       0.75rem     // 12px
space-3.5:     0.875rem    // 14px
space-4:       1rem        // 16px
space-5:       1.25rem     // 20px
space-6:       1.5rem      // 24px
space-7:       1.75rem     // 28px
space-8:       2rem        // 32px
space-9:       2.25rem     // 36px
space-10:      2.5rem      // 40px
space-11:      2.75rem     // 44px
space-12:      3rem        // 48px
space-14:      3.5rem      // 56px
space-16:      4rem        // 64px
space-20:      5rem        // 80px
space-24:      6rem        // 96px
space-28:      7rem        // 112px
space-32:      8rem        // 128px
space-36:      9rem        // 144px
space-40:      10rem       // 160px
space-44:      11rem       // 176px
space-48:      12rem       // 192px
space-52:      13rem       // 208px
space-56:      14rem       // 224px
space-60:      15rem       // 240px
space-64:      16rem       // 256px
space-72:      18rem       // 288px
space-80:      20rem       // 320px
space-96:      24rem       // 384px
```

---

### Border Radius

```
radius-none:   0
radius-xs:     0.125rem    // 2px
radius-sm:     0.25rem     // 4px
radius-md:     0.375rem    // 6px
radius-lg:     0.5rem      // 8px
radius-xl:     0.75rem     // 12px
radius-2xl:    1rem        // 16px
radius-3xl:    1.5rem      // 24px
radius-full:   9999px      // Fully rounded
```

---

### Shadows

```
shadow-xs:
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)

shadow-sm:
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
              0 1px 2px -1px rgba(0, 0, 0, 0.1)

shadow-md:
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -2px rgba(0, 0, 0, 0.1)

shadow-lg:
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -4px rgba(0, 0, 0, 0.1)

shadow-xl:
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 8px 10px -6px rgba(0, 0, 0, 0.1)

shadow-2xl:
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)

shadow-inner:
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)

shadow-none:
  box-shadow: none
```

---

### Elevation System

```
elevation-0:   shadow-none, z-index: 0
elevation-1:   shadow-sm, z-index: 10
elevation-2:   shadow-md, z-index: 20
elevation-3:   shadow-lg, z-index: 30
elevation-4:   shadow-xl, z-index: 40
elevation-5:   shadow-2xl, z-index: 50
```

---

### Z-Index Scale

```
z-0:           0
z-10:          10
z-20:          20
z-30:          30
z-40:          40
z-50:          50
z-dropdown:    1000
z-sticky:      1020
z-fixed:       1030
z-modal:       1040
z-popover:     1050
z-tooltip:     1060
z-notification: 1070
z-top:         9999
```

---

### Opacity Scale

```
opacity-0:     0
opacity-5:     0.05
opacity-10:    0.1
opacity-20:    0.2
opacity-25:    0.25
opacity-30:    0.3
opacity-40:    0.4
opacity-50:    0.5
opacity-60:    0.6
opacity-70:    0.7
opacity-75:    0.75
opacity-80:    0.8
opacity-90:    0.9
opacity-95:    0.95
opacity-100:   1
```

---

### Transitions & Animation

#### Duration
```
duration-0:      0ms
duration-75:     75ms
duration-100:    100ms
duration-150:    150ms
duration-200:    200ms
duration-300:    300ms
duration-500:    500ms
duration-700:    700ms
duration-1000:   1000ms
```

#### Timing Functions
```
ease-linear:     cubic-bezier(0, 0, 1, 1)
ease-in:         cubic-bezier(0.4, 0, 1, 1)
ease-out:        cubic-bezier(0, 0, 0.2, 1)
ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1)
ease-bounce:     cubic-bezier(0.68, -0.55, 0.265, 1.55)
ease-elastic:    cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

#### Transition Presets
```
transition-fast:
  duration: duration-150
  timing: ease-out

transition-base:
  duration: duration-200
  timing: ease-in-out

transition-slow:
  duration: duration-300
  timing: ease-in-out
```

---

### Breakpoints

```
breakpoint-xs:    320px    // Small mobile
breakpoint-sm:    640px    // Mobile
breakpoint-md:    768px    // Tablet
breakpoint-lg:    1024px   // Desktop
breakpoint-xl:    1280px   // Large desktop
breakpoint-2xl:   1536px   // Extra large desktop
```

---

### Container Widths

```
container-xs:     320px
container-sm:     640px
container-md:     768px
container-lg:     1024px
container-xl:     1280px
container-2xl:    1536px
container-full:   100%
```

---

## Atomic Components

### Button

#### Variants

**Primary Button**
```
Style:
  background: primary-600
  color: text-on-primary
  padding: space-2.5 space-4
  border-radius: radius-md
  font-weight: font-medium
  font-size: text-sm
  
States:
  hover:
    background: primary-700
    
  active:
    background: primary-800
    
  disabled:
    background: gray-300
    color: gray-500
    cursor: not-allowed
    
  focus:
    outline: 2px solid primary-500
    outline-offset: 2px
```

**Secondary Button**
```
Style:
  background: transparent
  border: 1px solid border-default
  color: text-primary
  padding: space-2.5 space-4
  border-radius: radius-md
  font-weight: font-medium
  font-size: text-sm
  
States:
  hover:
    background: gray-50
    border-color: border-strong
    
  active:
    background: gray-100
    
  disabled:
    color: gray-400
    border-color: gray-300
    cursor: not-allowed
    
  focus:
    outline: 2px solid primary-500
    outline-offset: 2px
```

**Tertiary/Ghost Button**
```
Style:
  background: transparent
  border: none
  color: text-primary
  padding: space-2.5 space-4
  border-radius: radius-md
  font-weight: font-medium
  font-size: text-sm
  
States:
  hover:
    background: gray-100
    
  active:
    background: gray-200
    
  disabled:
    color: gray-400
    cursor: not-allowed
    
  focus:
    outline: 2px solid primary-500
    outline-offset: 2px
```

**Destructive Button**
```
Style:
  background: error-600
  color: white
  padding: space-2.5 space-4
  border-radius: radius-md
  font-weight: font-medium
  font-size: text-sm
  
States:
  hover:
    background: error-700
    
  active:
    background: error-800
    
  disabled:
    background: gray-300
    color: gray-500
    cursor: not-allowed
    
  focus:
    outline: 2px solid error-500
    outline-offset: 2px
```

**Link Button**
```
Style:
  background: transparent
  border: none
  color: text-link
  padding: 0
  font-weight: font-normal
  font-size: text-sm
  text-decoration: underline
  
States:
  hover:
    color: text-link-hover
    
  active:
    color: primary-800
    
  disabled:
    color: gray-400
    cursor: not-allowed
    text-decoration: none
    
  focus:
    outline: 2px solid primary-500
    outline-offset: 2px
```

#### Sizes
```
small:
  padding: space-2 space-3
  font-size: text-xs
  min-height: 32px
  
medium (default):
  padding: space-2.5 space-4
  font-size: text-sm
  min-height: 40px
  
large:
  padding: space-3 space-5
  font-size: text-base
  min-height: 48px
```

#### Icon Variants
```
icon-only:
  width: 40px
  height: 40px
  padding: space-2
  display: flex
  align-items: center
  justify-content: center
  
icon-left:
  gap: space-2
  icon-size: 16px
  
icon-right:
  gap: space-2
  icon-size: 16px
```

---

### Input

#### Text Input
```
Style:
  background: surface
  border: 1px solid border-default
  border-radius: radius-md
  padding: space-2.5 space-3.5
  font-size: text-sm
  color: text-primary
  min-height: 40px
  
States:
  hover:
    border-color: border-strong
    
  focus:
    border-color: primary-500
    outline: 2px solid primary-200
    outline-offset: 0
    
  disabled:
    background: gray-100
    color: gray-500
    cursor: not-allowed
    
  error:
    border-color: error-500
    
  success:
    border-color: success-500
    
  readonly:
    background: gray-50
    cursor: default
```

#### Sizes
```
small:
  padding: space-2 space-3
  font-size: text-xs
  min-height: 32px
  
medium (default):
  padding: space-2.5 space-3.5
  font-size: text-sm
  min-height: 40px
  
large:
  padding: space-3 space-4
  font-size: text-base
  min-height: 48px
```

#### Variants
```
with-prefix:
  padding-left: space-10
  prefix position: absolute left space-3.5
  
with-suffix:
  padding-right: space-10
  suffix position: absolute right space-3.5
  
with-icon:
  icon position: absolute left/right space-3.5
  icon size: 16px
  icon color: gray-500
```

---

### Textarea

```
Style:
  background: surface
  border: 1px solid border-default
  border-radius: radius-md
  padding: space-2.5 space-3.5
  font-size: text-sm
  color: text-primary
  min-height: 80px
  resize: vertical
  
States:
  hover:
    border-color: border-strong
    
  focus:
    border-color: primary-500
    outline: 2px solid primary-200
    outline-offset: 0
    
  disabled:
    background: gray-100
    color: gray-500
    cursor: not-allowed
    
  error:
    border-color: error-500
    
  readonly:
    background: gray-50
    resize: none
```

---

### Select/Dropdown

```
Trigger Style:
  background: surface
  border: 1px solid border-default
  border-radius: radius-md
  padding: space-2.5 space-3.5
  font-size: text-sm
  color: text-primary
  min-height: 40px
  display: flex
  align-items: center
  justify-content: space-between
  
Trigger States:
  hover:
    border-color: border-strong
    
  focus:
    border-color: primary-500
    outline: 2px solid primary-200
    
  disabled:
    background: gray-100
    color: gray-500
    cursor: not-allowed
    
  open:
    border-color: primary-500
    
Dropdown Menu:
  background: surface
  border: 1px solid border-default
  border-radius: radius-md
  shadow: shadow-lg
  padding: space-1
  max-height: 300px
  overflow-y: auto
  
Option Style:
  padding: space-2 space-3
  border-radius: radius-sm
  cursor: pointer
  
Option States:
  hover:
    background: gray-100
    
  selected:
    background: primary-50
    color: primary-700
    font-weight: font-medium
    
  disabled:
    color: gray-400
    cursor: not-allowed
```

---

### Checkbox

```
Style:
  width: 20px
  height: 20px
  border: 2px solid border-default
  border-radius: radius-sm
  background: surface
  
States:
  hover:
    border-color: primary-500
    
  checked:
    background: primary-600
    border-color: primary-600
    checkmark-color: white
    
  indeterminate:
    background: primary-600
    border-color: primary-600
    dash-color: white
    
  disabled:
    background: gray-100
    border-color: gray-300
    cursor: not-allowed
    
  disabled-checked:
    background: gray-300
    border-color: gray-300
    checkmark-color: gray-500
    
  focus:
    outline: 2px solid primary-200
    outline-offset: 2px
    
  error:
    border-color: error-500
```

---

### Radio Button

```
Style:
  width: 20px
  height: 20px
  border: 2px solid border-default
  border-radius: radius-full
  background: surface
  
States:
  hover:
    border-color: primary-500
    
  checked:
    border-color: primary-600
    inner-circle: 10px diameter, primary-600
    
  disabled:
    background: gray-100
    border-color: gray-300
    cursor: not-allowed
    
  disabled-checked:
    border-color: gray-300
    inner-circle-color: gray-300
    
  focus:
    outline: 2px solid primary-200
    outline-offset: 2px
    
  error:
    border-color: error-500
```

---

### Toggle/Switch

```
Style:
  width: 44px
  height: 24px
  background: gray-300
  border-radius: radius-full
  position: relative
  cursor: pointer
  transition: background duration-200
  
Thumb:
  width: 20px
  height: 20px
  background: white
  border-radius: radius-full
  position: absolute
  left: 2px
  top: 2px
  transition: transform duration-200
  
States:
  hover:
    background: gray-400
    
  checked:
    background: primary-600
    thumb-transform: translateX(20px)
    
  disabled:
    background: gray-200
    cursor: not-allowed
    
  disabled-checked:
    background: primary-300
    
  focus:
    outline: 2px solid primary-200
    outline-offset: 2px
```

#### Sizes
```
small:
  width: 36px
  height: 20px
  thumb: 16px
  
medium (default):
  width: 44px
  height: 24px
  thumb: 20px
  
large:
  width: 52px
  height: 28px
  thumb: 24px
```

---

### Badge

#### Variants

**Default Badge**
```
Style:
  background: gray-100
  color: gray-700
  padding: space-0.5 space-2
  border-radius: radius-full
  font-size: text-xs
  font-weight: font-medium
  display: inline-flex
  align-items: center
```

**Primary Badge**
```
Style:
  background: primary-100
  color: primary-700
  padding: space-0.5 space-2
  border-radius: radius-full
  font-size: text-xs
  font-weight: font-medium
```

**Success Badge**
```
Style:
  background: success-100
  color: success-700
  padding: space-0.5 space-2
  border-radius: radius-full
  font-size: text-xs
  font-weight: font-medium
```

**Warning Badge**
```
Style:
  background: warning-100
  color: warning-700
  padding: space-0.5 space-2
  border-radius: radius-full
  font-size: text-xs
  font-weight: font-medium
```

**Error Badge**
```
Style:
  background: error-100
  color: error-700
  padding: space-0.5 space-2
  border-radius: radius-full
  font-size: text-xs
  font-weight: font-medium
```

**Outline Badge**
```
Style:
  background: transparent
  border: 1px solid border-default
  color: text-primary
  padding: space-0.5 space-2
  border-radius: radius-full
  font-size: text-xs
  font-weight: font-medium
```

#### Sizes
```
small:
  padding: space-0.5 space-1.5
  font-size: 0.625rem (10px)
  
medium (default):
  padding: space-0.5 space-2
  font-size: text-xs
  
large:
  padding: space-1 space-2.5
  font-size: text-sm
```

#### Variants with Icon
```
icon-only:
  width: 20px
  height: 20px
  padding: 0
  display: flex
  align-items: center
  justify-content: center
  
with-dot:
  gap: space-1
  dot-size: 6px
  dot-border-radius: radius-full
```

---

### Avatar

```
Style:
  width: 40px
  height: 40px
  border-radius: radius-full
  background: gray-200
  display: flex
  align-items: center
  justify-content: center
  overflow: hidden
  
Fallback (initials):
  font-size: text-sm
  font-weight: font-medium
  color: gray-600
  
Image:
  width: 100%
  height: 100%
  object-fit: cover
```

#### Sizes
```
xs:
  width: 24px
  height: 24px
  font-size: text-xs
  
sm:
  width: 32px
  height: 32px
  font-size: text-xs
  
md (default):
  width: 40px
  height: 40px
  font-size: text-sm
  
lg:
  width: 48px
  height: 48px
  font-size: text-base
  
xl:
  width: 64px
  height: 64px
  font-size: text-xl
  
2xl:
  width: 96px
  height: 96px
  font-size: text-3xl
```

#### Variants
```
with-ring:
  border: 2px solid surface
  box-shadow: 0 0 0 2px primary-500
  
with-status-indicator:
  position: relative
  indicator-size: 12px
  indicator-position: bottom-right
  indicator-border: 2px solid surface
  indicator-colors: success-500, warning-500, error-500, gray-400
  
grouped:
  overlap: -8px
  z-index: based on position
```

---

### Card

```
Style:
  background: surface
  border: 1px solid border-default
  border-radius: radius-lg
  padding: space-6
  shadow: shadow-sm
  
States:
  hover (interactive):
    shadow: shadow-md
    border-color: border-strong
    
  focus (interactive):
    outline: 2px solid primary-200
    outline-offset: 2px
```

#### Variants
```
elevated:
  border: none
  shadow: shadow-lg
  
flat:
  border: 1px solid border-subtle
  shadow: shadow-none
  
outlined:
  background: transparent
  border: 2px solid border-default
  shadow: shadow-none
```

#### Sections
```
header:
  padding: space-6
  border-bottom: 1px solid border-subtle
  
body:
  padding: space-6
  
footer:
  padding: space-6
  border-top: 1px solid border-subtle
  background: gray-50
```

---

### Alert

#### Variants

**Info Alert**
```
Style:
  background: info-50
  border: 1px solid info-200
  border-left: 4px solid info-500
  padding: space-4
  border-radius: radius-md
  display: flex
  gap: space-3
  
Icon:
  color: info-500
  size: 20px
  
Title:
  font-weight: font-semibold
  color: info-900
  font-size: text-sm
  
Message:
  color: info-800
  font-size: text-sm
```

**Success Alert**
```
Style:
  background: success-50
  border: 1px solid success-200
  border-left: 4px solid success-500
  padding: space-4
  border-radius: radius-md
  
Icon:
  color: success-500
  
Title:
  color: success-900
  
Message:
  color: success-800
```

**Warning Alert**
```
Style:
  background: warning-50
  border: 1px solid warning-200
  border-left: 4px solid warning-500
  padding: space-4
  border-radius: radius-md
  
Icon:
  color: warning-500
  
Title:
  color: warning-900
  
Message:
  color: warning-800
```

**Error Alert**
```
Style:
  background: error-50
  border: 1px solid error-200
  border-left: 4px solid error-500
  padding: space-4
  border-radius: radius-md
  
Icon:
  color: error-500
  
Title:
  color: error-900
  
Message:
  color: error-800
```

#### With Actions
```
close-button:
  position: absolute
  top: space-4
  right: space-4
  color: current-color
  opacity: opacity-60
  hover-opacity: opacity-100
  
action-buttons:
  margin-top: space-3
  gap: space-2
```

---

### Toast/Notification

```
Style:
  background: surface
  border: 1px solid border-default
  border-radius: radius-lg
  padding: space-4
  shadow: shadow-xl
  min-width: 320px
  max-width: 480px
  display: flex
  gap: space-3
  
Icon:
  size: 20px
  flex-shrink: 0
  
Content:
  flex: 1
  
Title:
  font-weight: font-semibold
  font-size: text-sm
  color: text-primary
  
Message:
  font-size: text-sm
  color: text-secondary
  margin-top: space-1
  
Close Button:
  position: absolute
  top: space-4
  right: space-4
  color: gray-500
  hover-color: gray-700
```

#### Variants
```
info:
  border-left: 4px solid info-500
  icon-color: info-500
  
success:
  border-left: 4px solid success-500
  icon-color: success-500
  
warning:
  border-left: 4px solid warning-500
  icon-color: warning-500
  
error:
  border-left: 4px solid error-500
  icon-color: error-500
```

#### Positions
```
top-left:     top-4, left-4
top-center:   top-4, left-50%, transform-x-50%
top-right:    top-4, right-4
bottom-left:  bottom-4, left-4
bottom-center: bottom-4, left-50%, transform-x-50%
bottom-right: bottom-4, right-4
```

---

### Tooltip

```
Style:
  background: gray-900
  color: white
  padding: space-2 space-3
  border-radius: radius-md
  font-size: text-xs
  max-width: 240px
  z-index: z-tooltip
  
Arrow:
  width: 8px
  height: 8px
  background: gray-900
  transform: rotate(45deg)
```

#### Positions
```
top:     bottom-full, margin-bottom-2
bottom:  top-full, margin-top-2
left:    right-full, margin-right-2
right:   left-full, margin-left-2
```

#### Variants
```
light:
  background: white
  color: text-primary
  border: 1px solid border-default
  shadow: shadow-md
```

---

### Modal/Dialog

```
Overlay:
  background: overlay
  position: fixed
  inset: 0
  z-index: z-modal
  display: flex
  align-items: center
  justify-content: center
  
Container:
  background: surface
  border-radius: radius-xl
  shadow: shadow-2xl
  width: 90%
  max-width: 500px
  max-height: 90vh
  overflow: hidden
  
Header:
  padding: space-6
  border-bottom: 1px solid border-subtle
  display: flex
  align-items: center
  justify-content: space-between
  
Title:
  font-size: text-xl
  font-weight: font-semibold
  color: text-primary
  
Close Button:
  color: gray-500
  hover-color: gray-700
  
Body:
  padding: space-6
  overflow-y: auto
  
Footer:
  padding: space-6
  border-top: 1px solid border-subtle
  display: flex
  gap: space-3
  justify-content: flex-end
```

#### Sizes
```
sm:
  max-width: 400px
  
md (default):
  max-width: 500px
  
lg:
  max-width: 640px
  
xl:
  max-width: 768px
  
full:
  max-width: 90vw
  max-height: 90vh
```

---

### Popover

```
Trigger:
  (inherits button styling)
  
Container:
  background: surface
  border: 1px solid border-default
  border-radius: radius-lg
  shadow: shadow-lg
  padding: space-4
  z-index: z-popover
  max-width: 320px
  
Arrow:
  width: 12px
  height: 12px
  background: surface
  border: inherit
  transform: rotate(45deg)
```

---

### Dropdown Menu

```
Trigger:
  (inherits button styling)
  
Menu Container:
  background: surface
  border: 1px solid border-default
  border-radius: radius-md
  shadow: shadow-lg
  padding: space-1
  min-width: 200px
  z-index: z-dropdown
  
Menu Item:
  padding: space-2 space-3
  border-radius: radius-sm
  font-size: text-sm
  display: flex
  align-items: center
  gap: space-2
  cursor: pointer
  
Menu Item States:
  hover:
    background: gray-100
    
  active:
    background: gray-200
    
  disabled:
    color: gray-400
    cursor: not-allowed
    
Separator:
  height: 1px
  background: border-subtle
  margin: space-1 0
  
Menu Label:
  padding: space-2 space-3
  font-size: text-xs
  font-weight: font-semibold
  color: text-secondary
  text-transform: uppercase
  letter-spacing: tracking-wide
```

---

### Tabs

```
Tab List:
  display: flex
  border-bottom: 1px solid border-default
  gap: space-1
  
Tab:
  padding: space-3 space-4
  font-size: text-sm
  font-weight: font-medium
  color: text-secondary
  border-bottom: 2px solid transparent
  cursor: pointer
  transition: transition-base
  
Tab States:
  hover:
    color: text-primary
    background: gray-50
    
  active:
    color: primary-600
    border-bottom-color: primary-600
    
  disabled:
    color: gray-400
    cursor: not-allowed
    
Tab Panel:
  padding: space-6
```

#### Variants
```
pills:
  tab:
    border-radius: radius-md
    border-bottom: none
  active:
    background: primary-100
    color: primary-700
    
underline (default):
  (as above)
  
enclosed:
  tab-list:
    border-bottom: none
  tab:
    border: 1px solid transparent
    border-radius: radius-md radius-md 0 0
    margin-bottom: -1px
  active:
    border-color: border-default
    border-bottom-color: surface
    background: surface
```

---

### Accordion

```
Item:
  border: 1px solid border-default
  border-radius: radius-md
  margin-bottom: space-2
  
Header:
  padding: space-4
  display: flex
  align-items: center
  justify-content: space-between
  cursor: pointer
  background: surface
  
Header States:
  hover:
    background: gray-50
    
  active:
    background: gray-100
    
Title:
  font-size: text-sm
  font-weight: font-medium
  color: text-primary
  
Icon:
  color: gray-500
  transition: transform duration-200
  
Icon Open:
  transform: rotate(180deg)
  
Panel:
  padding: space-4
  border-top: 1px solid border-subtle
  animation: slide-down duration-200
```

---

### Progress Bar

```
Container:
  width: 100%
  height: 8px
  background: gray-200
  border-radius: radius-full
  overflow: hidden
  
Fill:
  height: 100%
  background: primary-600
  border-radius: radius-full
  transition: width duration-300
```

#### Sizes
```
sm:
  height: 4px
  
md (default):
  height: 8px
  
lg:
  height: 12px
```

#### Variants
```
with-label:
  display: flex
  align-items: center
  gap: space-3
  label-font-size: text-sm
  label-color: text-secondary
  
indeterminate:
  animation: progress-indeterminate 1.5s infinite
  background: linear-gradient
  
striped:
  background: repeating-linear-gradient
  45deg
  stripes: 8px width
```

---

### Spinner/Loader

```
Style:
  width: 24px
  height: 24px
  border: 2px solid gray-200
  border-top-color: primary-600
  border-radius: radius-full
  animation: spin duration-700 linear infinite
```

#### Sizes
```
xs:
  width: 12px
  height: 12px
  border-width: 1px
  
sm:
  width: 16px
  height: 16px
  border-width: 2px
  
md (default):
  width: 24px
  height: 24px
  border-width: 2px
  
lg:
  width: 32px
  height: 32px
  border-width: 3px
  
xl:
  width: 48px
  height: 48px
  border-width: 4px
```

#### Variants
```
dots:
  three dots
  width: 8px each
  gap: space-2
  animation: bounce alternate
  
bars:
  three bars
  width: 4px
  height: 16px
  gap: space-1
  animation: stretch
```

---

### Breadcrumb

```
Container:
  display: flex
  align-items: center
  gap: space-2
  
Item:
  font-size: text-sm
  color: text-secondary
  
Item States:
  hover:
    color: text-primary
    
  current:
    color: text-primary
    font-weight: font-medium
    
Separator:
  color: gray-400
  font-size: text-sm
  symbols: /, >, •
```

---

### Pagination

```
Container:
  display: flex
  align-items: center
  gap: space-1
  
Page Button:
  width: 40px
  height: 40px
  display: flex
  align-items: center
  justify-content: center
  border-radius: radius-md
  font-size: text-sm
  color: text-primary
  cursor: pointer
  
Page Button States:
  hover:
    background: gray-100
    
  active:
    background: primary-600
    color: white
    font-weight: font-medium
    
  disabled:
    color: gray-400
    cursor: not-allowed
    
Ellipsis:
  width: 40px
  height: 40px
  display: flex
  align-items: center
  justify-content: center
  color: gray-400
  
Navigation Buttons:
  padding: space-2 space-3
  (inherits button styling)
```

---

### Slider/Range

```
Track:
  width: 100%
  height: 4px
  background: gray-200
  border-radius: radius-full
  position: relative
  
Fill:
  height: 100%
  background: primary-600
  border-radius: radius-full
  
Thumb:
  width: 20px
  height: 20px
  background: white
  border: 2px solid primary-600
  border-radius: radius-full
  cursor: pointer
  position: absolute
  top: 50%
  transform: translateY(-50%)
  
Thumb States:
  hover:
    transform: translateY(-50%) scale(1.1)
    
  active:
    transform: translateY(-50%) scale(0.95)
    
  focus:
    outline: 2px solid primary-200
    outline-offset: 2px
    
  disabled:
    border-color: gray-300
    cursor: not-allowed
```

---

### Divider

```
Horizontal:
  height: 1px
  background: border-subtle
  margin: space-4 0
  
Vertical:
  width: 1px
  background: border-subtle
  margin: 0 space-4
  height: 100%
```

#### Variants
```
with-text:
  display: flex
  align-items: center
  gap: space-4
  text-color: text-secondary
  text-size: text-sm
  
dashed:
  border-style: dashed
  
dotted:
  border-style: dotted
```

---

### Skeleton

```
Base:
  background: gray-200
  border-radius: radius-md
  animation: pulse duration-1000 infinite
  
Text Line:
  height: 16px
  width: 100%
  
Heading:
  height: 24px
  width: 60%
  
Circle:
  border-radius: radius-full
  width: 40px
  height: 40px
  
Rectangle:
  height: 200px
  width: 100%
```

---

### Link

```
Style:
  color: text-link
  text-decoration: underline
  font-size: inherit
  cursor: pointer
  
States:
  hover:
    color: text-link-hover
    
  active:
    color: primary-800
    
  visited:
    color: purple-600
    
  focus:
    outline: 2px solid primary-200
    outline-offset: 2px
    border-radius: radius-sm
```

#### Variants
```
external:
  icon: external-link
  icon-size: 14px
  icon-margin-left: space-1
  
no-underline:
  text-decoration: none
  hover-text-decoration: underline
```

---

### Icon Button

```
Style:
  width: 40px
  height: 40px
  padding: 0
  display: flex
  align-items: center
  justify-content: center
  border-radius: radius-md
  background: transparent
  color: gray-700
  cursor: pointer
  
States:
  hover:
    background: gray-100
    
  active:
    background: gray-200
    
  disabled:
    color: gray-400
    cursor: not-allowed
    
  focus:
    outline: 2px solid primary-200
    outline-offset: 2px
```

#### Sizes
```
sm:
  width: 32px
  height: 32px
  icon-size: 16px
  
md (default):
  width: 40px
  height: 40px
  icon-size: 20px
  
lg:
  width: 48px
  height: 48px
  icon-size: 24px
```

---

### Tag/Chip

```
Style:
  background: gray-100
  color: gray-700
  padding: space-1.5 space-3
  border-radius: radius-full
  font-size: text-sm
  display: inline-flex
  align-items: center
  gap: space-2
  
Remove Button:
  width: 16px
  height: 16px
  border-radius: radius-full
  background: gray-300
  color: gray-600
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  
Remove Button States:
  hover:
    background: gray-400
```

#### Variants
```
outlined:
  background: transparent
  border: 1px solid border-default
  
filled:
  background: primary-100
  color: primary-700
  
clickable:
  cursor: pointer
  hover-background: gray-200
```

---

### Menu Item

```
Style:
  padding: space-2.5 space-3
  display: flex
  align-items: center
  gap: space-3
  font-size: text-sm
  color: text-primary
  cursor: pointer
  border-radius: radius-sm
  
Icon:
  width: 20px
  height: 20px
  color: gray-500
  
Shortcut:
  margin-left: auto
  font-size: text-xs
  color: text-secondary
  
States:
  hover:
    background: gray-100
    
  active:
    background: primary-50
    color: primary-700
    
  disabled:
    color: gray-400
    cursor: not-allowed
```

---

## Component Patterns

### Form Layout

```
Form Container:
  max-width: 600px
  padding: space-6
  
Form Group:
  margin-bottom: space-6
  
Label:
  display: block
  font-size: text-sm
  font-weight: font-medium
  color: text-primary
  margin-bottom: space-2
  
Required Indicator:
  color: error-500
  margin-left: space-1
  
Help Text:
  font-size: text-sm
  color: text-secondary
  margin-top: space-2
  
Error Message:
  font-size: text-sm
  color: error-600
  margin-top: space-2
  display: flex
  align-items: center
  gap: space-1
  
Form Actions:
  display: flex
  gap: space-3
  margin-top: space-8
  justify-content: flex-end
```

---

### List Layout

```
List Container:
  background: surface
  border: 1px solid border-default
  border-radius: radius-lg
  
List Item:
  padding: space-4
  border-bottom: 1px solid border-subtle
  
List Item:last-child:
  border-bottom: none
  
List Item Interactive:
  cursor: pointer
  hover-background: gray-50
  
List Item Content:
  display: flex
  align-items: center
  gap: space-3
  
List Item Title:
  font-size: text-sm
  font-weight: font-medium
  color: text-primary
  
List Item Description:
  font-size: text-sm
  color: text-secondary
  margin-top: space-1
  
List Item Actions:
  margin-left: auto
  display: flex
  gap: space-2
```

---

### Empty State

```
Container:
  text-align: center
  padding: space-16 space-8
  
Icon:
  width: 64px
  height: 64px
  color: gray-400
  margin: 0 auto space-4
  
Title:
  font-size: text-xl
  font-weight: font-semibold
  color: text-primary
  margin-bottom: space-2
  
Description:
  font-size: text-sm
  color: text-secondary
  max-width: 400px
  margin: 0 auto space-6
  
Actions:
  display: flex
  gap: space-3
  justify-content: center
```

---

### Loading State

```
Full Page Loader:
  position: fixed
  inset: 0
  display: flex
  align-items: center
  justify-content: center
  background: overlay
  z-index: z-top
  
Inline Loader:
  display: flex
  align-items: center
  justify-content: center
  padding: space-8
  
Skeleton Loader:
  (use Skeleton component pattern)
```

---

### Error State

```
Container:
  text-align: center
  padding: space-16 space-8
  
Icon:
  width: 64px
  height: 64px
  color: error-500
  margin: 0 auto space-4
  
Title:
  font-size: text-xl
  font-weight: font-semibold
  color: text-primary
  margin-bottom: space-2
  
Message:
  font-size: text-sm
  color: text-secondary
  max-width: 400px
  margin: 0 auto space-6
  
Actions:
  display: flex
  gap: space-3
  justify-content: center
```

---

### Navigation Pattern

```
Header:
  height: 64px
  background: surface
  border-bottom: 1px solid border-default
  padding: 0 space-6
  display: flex
  align-items: center
  justify-content: space-between
  
Logo:
  font-size: text-xl
  font-weight: font-bold
  color: primary-600
  
Nav Links:
  display: flex
  gap: space-1
  
Nav Link:
  padding: space-2 space-3
  border-radius: radius-md
  font-size: text-sm
  font-weight: font-medium
  color: text-secondary
  
Nav Link States:
  hover:
    background: gray-100
    color: text-primary
    
  active:
    color: primary-600
    background: primary-50
```

---

### Sidebar Pattern

```
Sidebar:
  width: 256px
  height: 100vh
  background: surface
  border-right: 1px solid border-default
  padding: space-6
  
Sidebar Section:
  margin-bottom: space-6
  
Section Title:
  font-size: text-xs
  font-weight: font-semibold
  color: text-secondary
  text-transform: uppercase
  letter-spacing: tracking-wide
  margin-bottom: space-2
  
Sidebar Link:
  padding: space-2 space-3
  border-radius: radius-md
  font-size: text-sm
  display: flex
  align-items: center
  gap: space-3
  color: text-primary
  
Sidebar Link States:
  hover:
    background: gray-100
    
  active:
    background: primary-50
    color: primary-600
```

---

## Accessibility Guidelines

### Focus Management

```
Focus Visible:
  outline: 2px solid primary-500
  outline-offset: 2px
  border-radius: radius-sm
  
Focus Within:
  (container shows focus when child is focused)
  
Skip Links:
  position: absolute
  top: -9999px
  left: -9999px
  focus-position: top-4, left-4
  background: surface
  padding: space-3 space-4
  border-radius: radius-md
  z-index: z-top
```

---

### Color Contrast

```
Minimum Contrast Ratios:
  Normal text: 4.5:1
  Large text (18px+): 3:1
  UI components: 3:1
  
Text on Backgrounds:
  Always test text-primary on surface
  Always test text-on-primary on primary-600
  Always test white on all semantic colors
```

---

### ARIA Labels

```
Required ARIA Attributes:
  - aria-label: for icon-only buttons
  - aria-labelledby: for modal titles
  - aria-describedby: for error messages
  - aria-expanded: for collapsible elements
  - aria-selected: for tabs
  - aria-checked: for checkboxes/radios
  - aria-disabled: for disabled elements
  - aria-live: for dynamic content
  - aria-hidden: for decorative elements
  
Semantic HTML:
  - Use <button> for clickable actions
  - Use <a> for navigation
  - Use <nav> for navigation sections
  - Use <main> for main content
  - Use <aside> for sidebars
  - Use <header> and <footer>
  - Use <form> for forms
  - Use <label> for form labels
```

---

### Keyboard Navigation

```
Tab Order:
  - All interactive elements must be keyboard accessible
  - Tab order should follow visual order
  - Use tabindex="0" for custom interactive elements
  - Use tabindex="-1" to remove from tab order
  
Keyboard Shortcuts:
  Enter: Activate buttons, links, submit forms
  Space: Toggle checkboxes, radios, switches
  Escape: Close modals, dropdowns, popovers
  Arrow Keys: Navigate lists, tabs, dropdowns
  Home/End: Jump to start/end of lists
  
Focus Trap:
  - Modals should trap focus within
  - First focusable element gets focus on open
  - Tab cycles through modal elements only
  - Escape closes and returns focus
```

---

### Screen Reader Support

```
Announcements:
  - Use aria-live for dynamic updates
  - Use role="status" for status messages
  - Use role="alert" for errors
  - Use aria-atomic for complete announcements
  
Hidden Content:
  - Use aria-hidden="true" for decorative elements
  - Use visually-hidden class for screen-reader-only text
  
Labels:
  - All inputs must have labels
  - Use aria-label when visual label not present
  - Group related inputs with <fieldset> and <legend>
```

---

## Implementation Notes

### CSS Custom Properties Example

```css
:root {
  /* Colors */
  --color-primary-500: #[hex];
  --color-gray-900: #[hex];
  
  /* Spacing */
  --space-4: 1rem;
  
  /* Typography */
  --font-sans: [stack];
  --text-base: 1rem;
  
  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-base: 200ms ease-in-out;
}
```

### Responsive Design

```
Mobile First:
  - Design for mobile first
  - Add complexity at larger breakpoints
  - Test on real devices
  
Breakpoint Strategy:
  xs: 320px - 639px (mobile)
  sm: 640px - 767px (large mobile)
  md: 768px - 1023px (tablet)
  lg: 1024px - 1279px (desktop)
  xl: 1280px - 1535px (large desktop)
  2xl: 1536px+ (extra large desktop)
```

### Dark Mode Support

```
Color Tokens for Dark Mode:
  surface-dark: #[hex]
  text-primary-dark: #[hex]
  border-default-dark: #[hex]
  
Implementation:
  - Use CSS custom properties
  - Toggle via data-theme or class
  - Respect prefers-color-scheme
  - Store user preference
```

---

## Version History

```
Version: 1.0.0
Last Updated: [Date]
Author: [Name]
License: [License Type]
```

---

## Usage Guidelines

1. **Token Usage**: Always use design tokens instead of hardcoded values
2. **Component Variants**: Create variants through composition, not duplication
3. **Accessibility First**: Every component must meet WCAG 2.1 AA standards
4. **Responsive Design**: All components should be mobile-first responsive
5. **Documentation**: Document all variants, states, and usage examples
6. **Testing**: Test components across browsers, devices, and screen readers
7. **Consistency**: Maintain visual and behavioral consistency across all components

---

This template provides a comprehensive foundation for building a professional design system. Customize the values, add brand-specific colors, and extend components based on your specific needs.