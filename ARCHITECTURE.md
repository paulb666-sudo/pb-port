# Surface Flow Portfolio
## Architecture Guide

Version: 2.0
Status: Active
Author: Paul Bristow

---

# Purpose

This portfolio is not a traditional portfolio website.

It is a living knowledge surface that documents:

- Selected Product Design work
- UX thinking
- AI-assisted workflows
- Design systems
- Motion & spatial interaction
- Surface Flow research
- Future product ideas

The architecture is intentionally simple.

Content is authored in HTML.

JavaScript provides behaviour only.

CSS controls presentation only.

---

# Core Principles

## 1. HTML Owns Content

Never generate content with JavaScript.

Every article exists as HTML.

Good

case-studies/darg.html

knowledge/ai-workflow.html

Bad

Large JavaScript objects containing HTML strings.

---

## 2. CSS Owns Appearance

Avoid inline styling whenever possible.

Every reusable visual treatment becomes a CSS class.

Typography

Spacing

Colour

Animation

Glass effects

Cards

Buttons

Should all live in CSS.

---

## 3. JavaScript Owns Behaviour

JavaScript never owns content.

JavaScript should only:

- Open modal
- Close modal
- Load HTML fragments
- Navigation
- Utility helpers
- Animation triggers

Nothing else.

---

## 4. Every Project Is Independent

Each project exists as its own document.

Example

case-studies/

    darg.html

    rain.html

    sanlam.html

    discovery-health.html

This keeps editing simple.

---

## 5. Every Knowledge Article Is Independent

Knowledge pieces are treated exactly like projects.

knowledge/

    ai-workflow.html

    design-systems.html

    motion-spatial.html

    surface-flow.html

    ai-orchestration.html

The modal does not care which type it loads.

---

# Folder Structure

pb-port/

│

├── index.html

│

├── css/

│     style.css

│

├── js/

│     app.js

│

├── images/

│

├── case-studies/

│

├── knowledge/

│

└── docs/

      ARCHITECTURE.md

---

# JavaScript Responsibilities

app.js should remain small.

Responsibilities

✓ Modal controller

✓ Mobile navigation

✓ Scroll animations

✓ Utility functions

✓ Keyboard shortcuts

Never

✗ HTML generation

✗ Case study data

✗ Long HTML strings

✗ Business content

---

# Modal Architecture

Card Click

↓

Read data-file attribute

↓

Load HTML fragment

↓

Insert into modal

↓

Display modal

The modal should remain completely generic.

It should never know what it is displaying.

---

# HTML Structure

Every article follows the same structure.

<article>

    header

    hero

    sections

    figures

    callouts

    links

    footer

</article>

This creates consistency.

---

# Semantic HTML

Use semantic elements wherever possible.

article

header

section

figure

figcaption

aside

blockquote

footer

Avoid excessive div nesting.

---

# Images

Each image should be wrapped in a figure.

Example

<figure>

    <img>

    <figcaption>

</figure>

Captions should explain why the image matters.

Not simply describe it.

---

# Buttons

Buttons should describe actions.

Preferred

View Case Study

Read Article

Open Prototype

View Video

Download PDF

Avoid

Click Here

Learn More

---

# Modal Content

Content should read like an editorial article.

Use

Headings

Paragraphs

Callouts

Quotes

Lists

Figures

Links

Avoid huge walls of text.

---

# Future Components

Future reusable content blocks

Quote

Callout

Image

Gallery

Video

Prototype

GitHub

PDF

Timeline

Metrics

Accordion

Comparison

Code Block

These should be HTML-first.

---

# Accessibility

Every interactive element must support:

Keyboard navigation

Visible focus

Escape key

ARIA labels

Proper heading hierarchy

Alt text

Reduced motion support

Accessibility is not optional.

---

# Performance

Lazy-load images.

Compress media.

Avoid unnecessary JavaScript.

Keep HTML readable.

Optimise for fast first paint.

---

# Naming Convention

IDs

cs-darg

cs-rain

knowledge-ai

knowledge-motion

Classes

modal-section

modal-callout

modal-links

project-card

knowledge-card

Use descriptive names.

Avoid abbreviations.

---

# Adding A New Case Study

Duplicate

case-studies/darg.html

Rename

Update content

Add card

Done.

No JavaScript changes.

---

# Adding A Knowledge Article

Duplicate

knowledge/ai-workflow.html

Rename

Update content

Add card

Done.

---

# Design Freeze

The visual identity is frozen.

Changes are only made when they improve:

Usability

Accessibility

Performance

Consistency

Not because a different design feels newer.

---

# Design Philosophy

The portfolio should feel like reading a beautifully designed digital publication.

Whitespace is intentional.

Typography carries hierarchy.

Images support the narrative.

Motion provides context, not decoration.

The interface should disappear so the work can speak.

---

# Future Vision

This portfolio is the first public surface of the wider Surface Flow ecosystem.

It should eventually become a living knowledge platform capable of presenting:

Case studies

Research

Design systems

AI workflows

Operating models

Presentations

Articles

Talks

Videos

Experiments

Without changing the underlying architecture.

---

# Guiding Principle

If future Paul can add a new project in under ten minutes without touching JavaScript, the architecture is working.

If adding content requires modifying JavaScript, the architecture has failed.