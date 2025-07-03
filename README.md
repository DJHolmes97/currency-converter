# Currency Converter Portfolio Project

## Overview

This project is a modern, full-stack currency converter web application built as a portfolio piece to showcase proficiency in React, Next.js, TypeScript, and comprehensive testing practices. It demonstrates the ability to design, implement, and test a real-world, interactive web application using current best practices and technologies.

## Purpose

The Currency Converter allows users to:
- Select currencies to convert from and to
- Enter an amount to convert
- Instantly see the conversion result using up-to-date exchange rates
- Swap currencies with a single click

This project is intended to demonstrate:
- Clean, maintainable code structure
- Modern React and Next.js patterns
- Robust API integration and error handling
- Comprehensive automated testing
- Professional UI/UX design

## Technical Skills Demonstrated

- **React (with Hooks):** Functional components, state management, and effects
- **Next.js:** File-based routing, API integration, and SSR/CSR patterns
- **TypeScript:** Type safety across the codebase, including React components and API logic
- **React Query (@tanstack/react-query):** Data fetching, caching, and mutation management
- **Material UI (MUI):** Professional, accessible UI components and layout
- **Testing:**
  - **Jest:** Unit and integration testing
  - **React Testing Library:** User-centric component tests
  - **MSW (Mock Service Worker):** API mocking for reliable, isolated tests
- **API Integration:**
  - Consuming a public currency API
  - Mocking API endpoints for local development and testing
- **Modern CSS:** Styling with CSS modules and MUI's styling system
- **Project Tooling:**
  - **pnpm:** Fast, efficient package management
  - **Babel, PostCSS:** Modern JavaScript and CSS tooling
  - **Code Coverage:** Automated coverage reports

## Project Structure

- `app/` — Next.js app directory (main UI and page logic)
- `components/` — Reusable UI components (Dropdown, Input, etc.)
- `api/` — API query logic for currency data and conversion
- `utils/` — Test setup, MSW server, and utility functions
- `__tests__/` — Comprehensive test suite for all major features
- `public/` — Static assets (icons, images)

## How to Run Locally

1. **Install dependencies:**
   ```sh
   pnpm install
   ```
2. **Run the development server:**
   ```sh
   pnpm dev
   ```
3. **Run tests:**
   ```sh
   pnpm test
   ```
4. **View coverage report:**
   ```sh
   pnpm test -- --coverage
   open coverage/lcov-report/index.html
   ```

## Key Features

- **Live currency conversion** with up-to-date rates
- **Dropdowns** for selecting currencies, with disabled options to prevent invalid selections
- **Input validation** for numeric amounts
- **Swap button** to quickly reverse conversion direction
- **Responsive, accessible UI** using Material UI
- **Full test coverage** for all major user flows

## Why This Project?

This project was built to demonstrate:
- End-to-end skills in modern web development
- Ability to write clean, maintainable, and well-tested code
- Experience with real-world API integration and error handling
- Professional UI/UX design and accessibility

---

**Author:** Daniel Holmes
