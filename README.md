## [coryfitzpatrick.com] README

# Deploy Process:

1. `brew install heroku/brew/heroku` # Install Heroku CLI
2. `heroku login`
3. `git add .`
4. `git commit` {message about commit}
5. `git push origin master` {pushes to GitHub and deploys to Heroku}

# Running Locally:

1. `npm install` (Install dependencies)
2. `npm run build` (Build project)
3. `npm start` (Start server)

# Test Suite

This directory contains comprehensive unit tests for the React portfolio application using the **Given-When-Then** testing pattern.

## Setup

To install the testing dependencies, run:

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run coverage
```

## Test Structure

All tests follow the **Given-When-Then** pattern:

- **Given**: Setup test data and initial conditions
- **When**: Execute the action being tested
- **Then**: Assert the expected outcomes

## Test Files

### API Tests (`api.test.ts`)
- Tests for `getContentByCategory()` function
- Tests for `getContentByUrl()` function
- Error handling and URL encoding scenarios

### Component Tests
- `header.test.tsx` - Navigation, mobile menu, link behavior
- `footer.test.tsx` - Email link, copyright year, semantic structure
- `category-list.test.tsx` - Content loading, error states, image fallbacks
- `detail-item.test.tsx` - Content display, video/images, 404 handling
- `router-wrapper.test.tsx` - Component structure and mocking
- `routing-wrapper.test.tsx` - Route matching, redirects, navigation behavior
- `not-found.test.tsx` - 404 page functionality
- `about-page.test.tsx` - Static content and links

## Test Coverage

The test suite covers:
- ✅ API function error handling
- ✅ Component rendering and user interactions
- ✅ React Router navigation
- ✅ Loading and error states
- ✅ Image fallback behavior
- ✅ Mobile navigation
- ✅ External link attributes

## Mocking Strategy

- API calls are mocked using Vitest `vi.mock()`
- React Router uses `MemoryRouter` for testing
- `window.scrollTo` is mocked globally
- Child components are mocked in integration tests