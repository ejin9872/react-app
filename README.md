# Restaurant Picks

A curated restaurant discovery and tracking app built with React 19 and TypeScript. Browse handpicked dining spots, save your favorites, mark places you've visited, and find your next meal with powerful search and filters.

## Features

### Browse & Discover
- 🍽️ **Restaurant Cards**: Browse a responsive grid of restaurants showing images, cuisine type, price range, star ratings, descriptions, and addresses
- 🔎 **Detail Modal**: Click any card to open a detailed view with the full description, a personalized recommendation, operating hours, Yelp-style reviews, and an embedded Google Map with directions link
- 📊 **Results Count**: See how many restaurants match your current filters

### Organize & Track
- ❤️ **Favorites**: Mark restaurants as favorites with an animated heart toggle
- 📌 **Visited / To Try**: Track which restaurants you've been to and which are still on your list
- ✕ **Remove**: Delete restaurants you're no longer interested in
- 🔢 **Progress Footer**: See how many restaurants you still have left to try

### Search & Filter
- 🔍 **Search**: Find restaurants by name, cuisine, or address
- 🏷️ **Tag Filters**: Filter by Favorites, Visited, or To Try
- 🍕 **Cuisine Filter**: Multi-select by cuisine type (Japanese, Italian, Mexican, etc.)
- 📍 **Location Filter**: Narrow results by city/area
- ⭐ **Rating Filter**: Set a minimum star rating (3+, 3.5+, 4+, 4.5+)
- 💰 **Price Filter**: Multi-select by price range (`$`, `$$`, `$$$`, `$$$$`)
- 🧹 **Clear All**: Reset all active filters with one click

### Add Restaurants
- ➕ **Add Form**: Add your own restaurants with name, cuisine, address, rating, price range, and description

### Persistence & UX
- 💾 **Local Storage**: All data (including favorites and visited state) persists across browser sessions
- 📱 **Responsive Design**: Fully responsive layout for desktop and mobile
- ✨ **Animations**: Smooth heart and checkmark animations on favorite/visited toggles
- 🗺️ **Google Maps Integration**: Embedded map, "View on Map", and "Get Directions" links in the detail modal

## Default Restaurants

The app ships with 8 curated Seattle-area restaurants spanning Japanese, Italian, Mexican, French, Indian, Chinese, BBQ, and Mediterranean cuisines — each with descriptions, recommendations, and sample reviews.

## Tech Stack

- **React 19** with **TypeScript**
- **Create React App** (react-scripts 5.0.1)
- **localStorage** for client-side persistence
- **Google Maps Embed API** for location display

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
