import React, { useState, useEffect } from 'react';
import './App.css';

interface YelpReview {
  author: string;
  rating: number;
  date: string;
  text: string;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  description: string;
  address: string;
  hours: string;
  image: string;
  recommendation: string;
  reviews: YelpReview[];
  favorite: boolean;
  visited: boolean;
}

const defaultRestaurants: Restaurant[] = [
  { id: 1, name: 'Sakura Sushi', cuisine: 'Japanese', rating: 4.5, priceRange: '$$$', description: 'Authentic omakase and hand-rolled sushi in a serene setting.', address: '123 Cherry Blossom Ln, Seattle, WA 98101', hours: 'Mon–Thu 11:30am–9:30pm · Fri–Sat 11:30am–10:30pm · Sun 12pm–9pm', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop', recommendation: 'If you appreciate precision and artistry in food, Sakura Sushi is a must. The omakase experience lets the chef showcase the freshest seasonal fish, and the intimate counter seating makes every visit feel special. Perfect for date nights or when you want to treat yourself to something extraordinary.', reviews: [{ author: 'Lisa M.', rating: 5, date: '2026-03-15', text: 'Absolutely incredible omakase experience. The fish was impeccably fresh and the chef\'s attention to detail was extraordinary.' }, { author: 'Tom K.', rating: 3, date: '2026-03-10', text: 'Good sushi but a bit overpriced for the portion sizes. Service was slow during peak hours.' }], favorite: false, visited: false },
  { id: 2, name: 'Trattoria Bella', cuisine: 'Italian', rating: 4.7, priceRange: '$$', description: 'Handmade pasta and wood-fired pizzas with a cozy atmosphere.', address: '456 Vine St, Seattle, WA 98102', hours: 'Tue–Thu 5pm–9:30pm · Fri–Sat 5pm–10:30pm · Sun 4pm–9pm · Mon Closed', image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=600&h=400&fit=crop', recommendation: 'A neighborhood gem for anyone who loves honest, soul-warming Italian cooking. The handmade pasta is rolled fresh daily and you can taste the difference. The rustic dining room and candlelit tables make it feel like a trattoria tucked away in Tuscany — ideal for a relaxed dinner with friends or family.', reviews: [{ author: 'Rachel S.', rating: 5, date: '2026-03-20', text: 'The cacio e pepe is life-changing. Every dish feels like it was made by an Italian grandmother with love.' }, { author: 'David W.', rating: 3, date: '2026-03-12', text: 'Pasta was good but not outstanding. The ambiance is lovely though and the wine list is solid.' }], favorite: false, visited: false },
  { id: 3, name: 'El Fuego Cantina', cuisine: 'Mexican', rating: 4.3, priceRange: '$$', description: 'Bold street tacos, fresh guacamole, and inventive margaritas.', address: '789 Sunset Blvd, Seattle, WA 98103', hours: 'Mon–Sun 11am–11pm', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop', recommendation: 'When you\'re craving bold, vibrant flavors and a lively atmosphere, El Fuego delivers. Their al pastor tacos are smoky and perfectly spiced, and the tableside guacamole is a crowd pleaser. The creative margarita menu and energetic vibe make it a great spot for celebrations or casual weekend nights out.', reviews: [{ author: 'Maria G.', rating: 5, date: '2026-03-18', text: 'Best al pastor tacos outside of Mexico City! The margaritas are dangerously good too.' }, { author: 'James L.', rating: 2, date: '2026-03-05', text: 'Way too loud and crowded. Waited 45 minutes with a reservation. Tacos were decent but not worth the hassle.' }], favorite: false, visited: false },
  { id: 4, name: 'Le Petit Bistro', cuisine: 'French', rating: 4.8, priceRange: '$$$$', description: 'Classic French cuisine with a modern twist and an extensive wine list.', address: '12 Rue de Paris Ave, Seattle, WA 98104', hours: 'Wed–Sat 5:30pm–10pm · Sun 10am–2pm (Brunch) · Mon–Tue Closed', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop', recommendation: 'For a truly special occasion, Le Petit Bistro is Seattle\'s answer to fine Parisian dining. The tasting menu showcases seasonal ingredients with elegant technique, and the sommelier\'s wine pairings are exceptional. If you love discovering new flavor combinations and appreciate refined service, this is your place.', reviews: [{ author: 'Sophie A.', rating: 5, date: '2026-03-22', text: 'A truly refined dining experience. The duck confit was perfection and the sommelier\'s pairings were impeccable.' }, { author: 'Mike R.', rating: 4, date: '2026-03-08', text: 'Beautiful food and presentation. Portions are small for the price but the quality is undeniable.' }], favorite: false, visited: false },
  { id: 5, name: 'Spice Route', cuisine: 'Indian', rating: 4.4, priceRange: '$$', description: 'Rich curries, fresh naan, and vibrant flavors from across India.', address: '234 Cardamom Dr, Seattle, WA 98105', hours: 'Mon–Fri 11:30am–2:30pm, 5pm–10pm · Sat–Sun 12pm–10pm', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop', recommendation: 'A paradise for spice lovers. Spice Route doesn\'t shy away from authentic heat and complex flavors — their regional dishes go beyond the typical tikka masala. The lunch buffet is incredible value, and the dinner menu\'s tandoori specialties are worth the trip alone. Great for adventurous eaters who want the real thing.', reviews: [{ author: 'Priya N.', rating: 5, date: '2026-03-19', text: 'Finally, authentic Indian food in the city! The butter chicken and garlic naan are absolute must-orders.' }, { author: 'Chris B.', rating: 3, date: '2026-03-11', text: 'Good flavors but several dishes were too oily. The lunch buffet is a better value than dinner.' }], favorite: false, visited: false },
  { id: 6, name: 'Golden Dragon', cuisine: 'Chinese', rating: 4.2, priceRange: '$', description: 'Dim sum brunch and Szechuan specialties in a lively atmosphere.', address: '567 Lantern Way, Seattle, WA 98106', hours: 'Mon–Sun 10am–10pm · Dim Sum served until 3pm', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop', recommendation: 'The best bang for your buck in the city. Golden Dragon\'s weekend dim sum is a ritual worth adopting — cart after cart of steaming dumplings, buns, and rice rolls. For dinner, the Szechuan dishes bring serious heat. Come with a group so you can order the whole menu. Unbeatable for casual, communal eating.', reviews: [{ author: 'Wendy C.', rating: 5, date: '2026-03-21', text: 'The dim sum here is the real deal. Har gow and siu mai are perfectly steamed. Great value!' }, { author: 'Alan P.', rating: 2, date: '2026-03-06', text: 'Hit or miss. Some dishes are great but the mapo tofu was bland. Service can be brusque.' }], favorite: false, visited: false },
  { id: 7, name: 'The Smokehouse', cuisine: 'BBQ', rating: 4.6, priceRange: '$$', description: 'Slow-smoked brisket, ribs, and homemade sides with craft beer.', address: '890 Hickory Rd, Seattle, WA 98107', hours: 'Wed–Sun 11:30am–8pm (or until sold out) · Mon–Tue Closed', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=400&fit=crop', recommendation: 'If you live for smoky, slow-cooked meat, The Smokehouse is a pilgrimage. Their 14-hour brisket has a perfect bark and melt-in-your-mouth tenderness that rivals the best Texas joints. Pair it with a local craft IPA and their legendary mac & cheese. Arrive early — they sell out, and for good reason.', reviews: [{ author: 'Bobby T.', rating: 5, date: '2026-03-17', text: '14-hour smoked brisket that melts in your mouth. The mac & cheese is the best side dish in the city.' }, { author: 'Jenna H.', rating: 3, date: '2026-03-09', text: 'Good BBQ but they ran out of ribs by 2pm on a Saturday. Come early or be disappointed.' }], favorite: false, visited: false },
  { id: 8, name: 'Olive & Thyme', cuisine: 'Mediterranean', rating: 4.5, priceRange: '$$$', description: 'Fresh mezze platters, grilled seafood, and sun-drenched flavors.', address: '345 Coastal Hwy, Seattle, WA 98108', hours: 'Mon–Thu 11am–9pm · Fri–Sat 11am–10pm · Sun 10am–9pm', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop', recommendation: 'Olive & Thyme captures the essence of Mediterranean coastal dining. The seafood is sourced daily and the mezze spreads are perfect for sharing. The patio offers stunning water views that pair beautifully with a glass of crisp white wine. Ideal for a long, leisurely lunch or a sunset dinner when you want to slow down and savor.', reviews: [{ author: 'Elena K.', rating: 5, date: '2026-03-23', text: 'The grilled octopus and hummus platter are heavenly. Beautiful patio seating with water views.' }, { author: 'Sam D.', rating: 3, date: '2026-03-07', text: 'Nice atmosphere but dishes are a bit inconsistent. The seafood is great, skip the lamb.' }], favorite: false, visited: false },
];

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilters, setTagFilters] = useState<Set<'favorites' | 'visited' | 'to-try'>>(new Set());
  const [cuisineFilters, setCuisineFilters] = useState<Set<string>>(new Set());
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [minStars, setMinStars] = useState<number>(0);
  const [priceFilters, setPriceFilters] = useState<Set<string>>(new Set());
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCuisine, setNewCuisine] = useState('');
  const [newRating, setNewRating] = useState('4.0');
  const [newPrice, setNewPrice] = useState<Restaurant['priceRange']>('$$');
  const [newDescription, setNewDescription] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [favAnimating, setFavAnimating] = useState<number | null>(null);
  const [visitedAnimating, setVisitedAnimating] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('restaurants');
    if (saved) {
      const parsed: Restaurant[] = JSON.parse(saved).map((r: any) => {
        const defaults = defaultRestaurants.find(d => d.id === r.id);
        return {
          ...r,
          hours: r.hours || defaults?.hours || 'Hours not available',
          image: r.image || defaults?.image || '',
          recommendation: r.recommendation || defaults?.recommendation || '',
          reviews: r.reviews || defaults?.reviews || [],
        };
      });
      setRestaurants(parsed);
    } else {
      setRestaurants(defaultRestaurants);
    }
  }, []);

  useEffect(() => {
    if (restaurants.length > 0) {
      localStorage.setItem('restaurants', JSON.stringify(restaurants));
    }
  }, [restaurants]);

  const toggleFavorite = (id: number) => {
    const restaurant = restaurants.find(r => r.id === id);
    if (restaurant && !restaurant.favorite) {
      setFavAnimating(id);
      setTimeout(() => setFavAnimating(null), 600);
    }
    setRestaurants(restaurants.map(r =>
      r.id === id ? { ...r, favorite: !r.favorite } : r
    ));
  };

  const toggleVisited = (id: number) => {
    const restaurant = restaurants.find(r => r.id === id);
    if (restaurant && !restaurant.visited) {
      setVisitedAnimating(id);
      setTimeout(() => setVisitedAnimating(null), 600);
    }
    setRestaurants(restaurants.map(r =>
      r.id === id ? { ...r, visited: !r.visited } : r
    ));
  };

  const removeRestaurant = (id: number) => {
    setRestaurants(restaurants.filter(r => r.id !== id));
  };

  const addRestaurant = () => {
    if (newName.trim() && newCuisine.trim()) {
      const restaurant: Restaurant = {
        id: Date.now(),
        name: newName.trim(),
        cuisine: newCuisine.trim(),
        rating: Math.min(5, Math.max(0, parseFloat(newRating) || 4.0)),
        priceRange: newPrice,
        description: newDescription.trim() || 'A great place to eat!',
        address: newAddress.trim() || 'Address not provided',
        hours: 'Hours not available',
        image: '',
        recommendation: '',
        reviews: [],
        favorite: false,
        visited: false,
      };
      setRestaurants([restaurant, ...restaurants]);
      setNewName('');
      setNewCuisine('');
      setNewRating('4.0');
      setNewPrice('$$');
      setNewDescription('');
      setNewAddress('');
      setShowAddForm(false);
    }
  };

  const cuisines = ['all', ...Array.from(new Set(restaurants.map(r => r.cuisine))).sort()];

  const locations = ['all', ...Array.from(new Set(restaurants.map(r => {
    const parts = r.address.split(',').map(s => s.trim());
    return parts.length >= 2 ? parts[parts.length - 2] : parts[0];
  }))).sort()];

  const toggleTag = (tag: 'favorites' | 'visited' | 'to-try') => {
    setTagFilters(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag); else next.add(tag);
      return next;
    });
  };

  const toggleCuisine = (cuisine: string) => {
    setCuisineFilters(prev => {
      const next = new Set(prev);
      if (next.has(cuisine)) next.delete(cuisine); else next.add(cuisine);
      return next;
    });
  };

  const togglePrice = (price: string) => {
    setPriceFilters(prev => {
      const next = new Set(prev);
      if (next.has(price)) next.delete(price); else next.add(price);
      return next;
    });
  };

  const hasActiveFilters = searchQuery || tagFilters.size > 0 || cuisineFilters.size > 0 || locationFilter !== 'all' || minStars > 0 || priceFilters.size > 0;

  const clearAllFilters = () => {
    setSearchQuery('');
    setTagFilters(new Set());
    setCuisineFilters(new Set());
    setLocationFilter('all');
    setMinStars(0);
    setPriceFilters(new Set());
  };

  const filteredRestaurants = restaurants.filter(r => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q) || r.address.toLowerCase().includes(q);
    const matchesTags = tagFilters.size === 0 || (
      (!tagFilters.has('favorites') || r.favorite) &&
      (!tagFilters.has('visited') || r.visited) &&
      (!tagFilters.has('to-try') || !r.visited)
    );
    const matchesCuisine = cuisineFilters.size === 0 || cuisineFilters.has(r.cuisine);
    const matchesLocation = locationFilter === 'all' || r.address.includes(locationFilter);
    const matchesStars = r.rating >= minStars;
    const matchesPrice = priceFilters.size === 0 || priceFilters.has(r.priceRange);
    return matchesSearch && matchesTags && matchesCuisine && matchesLocation && matchesStars && matchesPrice;
  });

  const renderStars = (rating: number) => {
    const rounded = Math.round(rating * 2) / 2;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        stars.push(
          <svg key={i} className="star-icon" viewBox="0 0 24 24" width="16" height="16">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
          </svg>
        );
      } else if (i - 0.5 === rounded) {
        stars.push(
          <svg key={i} className="star-icon" viewBox="0 0 24 24" width="16" height="16">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#half-${i})`} />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="star-icon star-empty" viewBox="0 0 24 24" width="16" height="16">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#d1d5db" />
          </svg>
        );
      }
    }
    return (
      <span className="stars" title={`${rating} out of 5`}>
        {stars}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </span>
    );
  };

  const handleCardClick = (id: number) => {
    setSelectedRestaurant(id);
  };

  const closeFlyover = () => {
    setSelectedRestaurant(null);
  };

  const activeDetail = selectedRestaurant !== null
    ? restaurants.find(r => r.id === selectedRestaurant) || null
    : null;

  const mapsUrl = (address: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const directionsUrl = (address: string) =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  const reviewStars = (rating: number) => {
    const rounded = Math.round(rating * 2) / 2;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        stars.push(
          <svg key={i} className="star-icon" viewBox="0 0 24 24" width="14" height="14">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
          </svg>
        );
      } else if (i - 0.5 === rounded) {
        stars.push(
          <svg key={i} className="star-icon" viewBox="0 0 24 24" width="14" height="14">
            <defs>
              <linearGradient id={`review-half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#review-half-${i})`} />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="star-icon star-empty" viewBox="0 0 24 24" width="14" height="14">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#d1d5db" />
          </svg>
        );
      }
    }
    return <span className="stars">{stars}</span>;
  };

  return (
    <div className="App">
      {/* Hero */}
      <header className="hero">
        <div className="hero-inner">
          <span className="hero-label">Curated for you</span>
          <h1>Restaurant Picks</h1>
          <p className="hero-sub">Handpicked dining experiences — discover, save, and revisit your favorites.</p>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <nav className="filter-bar">
        <div className="filter-bar-inner">
          <div className="filter-row">
            {/* Compact search */}
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setOpenFilter(null)}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">✕</button>
              )}
            </div>

            {/* Filter pills */}
            <div className="filter-pills">
              {/* Tags */}
              <div className="filter-pill-wrapper">
                <button
                  className={`filter-pill ${tagFilters.size > 0 ? 'has-value' : ''} ${openFilter === 'tags' ? 'open' : ''}`}
                  onClick={() => setOpenFilter(openFilter === 'tags' ? null : 'tags')}
                >
                  Tags{tagFilters.size > 0 && ` (${tagFilters.size})`}
                  <span className="pill-arrow">▾</span>
                </button>
                {openFilter === 'tags' && (
                  <div className="filter-dropdown">
                    {(['favorites', 'visited', 'to-try'] as const).map(tag => (
                      <button
                        key={tag}
                        className={`dropdown-option ${tagFilters.has(tag) ? 'selected' : ''}`}
                        onClick={() => toggleTag(tag)}
                      >
                        <span className="option-check">{tagFilters.has(tag) ? '✓' : ''}</span>
                        {tag === 'favorites' && '❤️ Favorites'}
                        {tag === 'visited' && '✅ Visited'}
                        {tag === 'to-try' && '📌 To Try'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cuisine */}
              <div className="filter-pill-wrapper">
                <button
                  className={`filter-pill ${cuisineFilters.size > 0 ? 'has-value' : ''} ${openFilter === 'cuisine' ? 'open' : ''}`}
                  onClick={() => setOpenFilter(openFilter === 'cuisine' ? null : 'cuisine')}
                >
                  {cuisineFilters.size > 0 ? Array.from(cuisineFilters).join(', ') : 'Cuisine'}
                  <span className="pill-arrow">▾</span>
                </button>
                {openFilter === 'cuisine' && (
                  <div className="filter-dropdown">
                    {cuisines.filter(c => c !== 'all').map(c => (
                      <button
                        key={c}
                        className={`dropdown-option ${cuisineFilters.has(c) ? 'selected' : ''}`}
                        onClick={() => toggleCuisine(c)}
                      >
                        <span className="option-check">{cuisineFilters.has(c) ? '✓' : ''}</span>
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="filter-pill-wrapper">
                <button
                  className={`filter-pill ${locationFilter !== 'all' ? 'has-value' : ''} ${openFilter === 'location' ? 'open' : ''}`}
                  onClick={() => setOpenFilter(openFilter === 'location' ? null : 'location')}
                >
                  {locationFilter === 'all' ? 'Location' : locationFilter}
                  <span className="pill-arrow">▾</span>
                </button>
                {openFilter === 'location' && (
                  <div className="filter-dropdown">
                    {locations.map(l => (
                      <button
                        key={l}
                        className={`dropdown-option ${locationFilter === l ? 'selected' : ''}`}
                        onClick={() => { setLocationFilter(l); setOpenFilter(null); }}
                      >
                        <span className="option-check">{locationFilter === l ? '✓' : ''}</span>
                        {l === 'all' ? 'All Locations' : l}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Stars */}
              <div className="filter-pill-wrapper">
                <button
                  className={`filter-pill ${minStars > 0 ? 'has-value' : ''} ${openFilter === 'stars' ? 'open' : ''}`}
                  onClick={() => setOpenFilter(openFilter === 'stars' ? null : 'stars')}
                >
                  {minStars > 0 ? `${minStars}+ Stars` : 'Rating'}
                  <span className="pill-arrow">▾</span>
                </button>
                {openFilter === 'stars' && (
                  <div className="filter-dropdown">
                    {[0, 3, 3.5, 4, 4.5].map(s => (
                      <button
                        key={s}
                        className={`dropdown-option ${minStars === s ? 'selected' : ''}`}
                        onClick={() => { setMinStars(s); setOpenFilter(null); }}
                      >
                        <span className="option-check">{minStars === s ? '✓' : ''}</span>
                        {s === 0 ? 'Any Rating' : `${s}+ Stars`}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="filter-pill-wrapper">
                <button
                  className={`filter-pill ${priceFilters.size > 0 ? 'has-value' : ''} ${openFilter === 'price' ? 'open' : ''}`}
                  onClick={() => setOpenFilter(openFilter === 'price' ? null : 'price')}
                >
                  {priceFilters.size > 0 ? Array.from(priceFilters).join(', ') : 'Price'}
                  <span className="pill-arrow">▾</span>
                </button>
                {openFilter === 'price' && (
                  <div className="filter-dropdown">
                    {['$', '$$', '$$$', '$$$$'].map(p => (
                      <button
                        key={p}
                        className={`dropdown-option ${priceFilters.has(p) ? 'selected' : ''}`}
                        onClick={() => togglePrice(p)}
                      >
                        <span className="option-check">{priceFilters.has(p) ? '✓' : ''}</span>
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear all */}
              {hasActiveFilters && (
                <button className="clear-all-btn" onClick={() => { clearAllFilters(); setOpenFilter(null); }}>✕ Clear</button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop to close dropdowns */}
      {openFilter && <div className="dropdown-backdrop" onClick={() => setOpenFilter(null)} />}

      {/* Main content */}
      <main className="main-content">
        <div className="content-wrapper">
          {/* Add restaurant toggle */}
          <div className="toolbar">
            <p className="results-count">{filteredRestaurants.length} result{filteredRestaurants.length !== 1 ? 's' : ''}</p>
            <button className="add-toggle" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? '✕  Cancel' : '+  Add a Restaurant'}
            </button>
          </div>

          {/* Add restaurant form */}
          {showAddForm && (
            <div className="add-form">
              <h3>Add a New Restaurant</h3>
              <div className="form-grid">
                <input type="text" placeholder="Restaurant name *" value={newName} onChange={e => setNewName(e.target.value)} />
                <input type="text" placeholder="Cuisine type *" value={newCuisine} onChange={e => setNewCuisine(e.target.value)} />
                <input type="text" placeholder="Address" value={newAddress} onChange={e => setNewAddress(e.target.value)} />
                <div className="form-row-inline">
                  <label>
                    <span>Rating</span>
                    <input type="number" min="0" max="5" step="0.1" value={newRating} onChange={e => setNewRating(e.target.value)} />
                  </label>
                  <label>
                    <span>Price</span>
                    <select value={newPrice} onChange={e => setNewPrice(e.target.value as Restaurant['priceRange'])}>
                      <option value="$">$</option>
                      <option value="$$">$$</option>
                      <option value="$$$">$$$</option>
                      <option value="$$$$">$$$$</option>
                    </select>
                  </label>
                </div>
              </div>
              <textarea placeholder="Short description..." rows={3} value={newDescription} onChange={e => setNewDescription(e.target.value)} />
              <button className="add-button" onClick={addRestaurant}>Publish Restaurant</button>
            </div>
          )}

          {/* Restaurant grid */}
          <div className="restaurant-grid">
            {filteredRestaurants.length === 0 ? (
              <p className="empty-message">
                No restaurants match your filters. Try a different combination!
              </p>
            ) : (
              filteredRestaurants.map(r => (
                <article
                  key={r.id}
                  className={`restaurant-card ${r.favorite ? 'is-favorite' : ''}`}
                  onClick={() => handleCardClick(r.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter') handleCardClick(r.id); }}
                >
                  {r.image && (
                    <div className="card-image">
                      <img src={r.image} alt={r.name} loading="lazy" />
                    </div>
                  )}
                  <div className="card-body">
                  <div className="card-cuisine-bar">
                    <span className="cuisine-tag">{r.cuisine}</span>
                    <span className="price-badge">{r.priceRange}</span>
                  </div>
                  <h2>{r.name}</h2>
                  <div className="card-rating">
                    {renderStars(r.rating)}
                  </div>
                  <p className="card-description">{r.description}</p>
                  <p className="card-address">{r.address}</p>
                  <div className="card-divider" />
                  <div className="card-actions">
                    <button
                      className={`fav-button ${r.favorite ? 'is-fav' : ''} ${favAnimating === r.id ? 'fav-animate' : ''}`}
                      onClick={e => { e.stopPropagation(); toggleFavorite(r.id); }}
                      title={r.favorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <span className="fav-heart">{r.favorite ? '❤️' : '🤍'}</span>
                      {r.favorite ? ' Favorited' : ' Favorite'}
                    </button>
                    <button
                      className={`visited-button ${r.visited ? 'is-visited' : ''} ${visitedAnimating === r.id ? 'visited-animate' : ''}`}
                      onClick={e => { e.stopPropagation(); toggleVisited(r.id); }}
                      title={r.visited ? 'Mark as not visited' : 'Mark as visited'}
                    >
                      <span className="visited-icon">{r.visited ? '✅' : '📌'}</span>
                      {r.visited ? ' Visited' : ' To Try'}
                    </button>
                    <button
                      className="remove-button"
                      onClick={e => { e.stopPropagation(); removeRestaurant(r.id); }}
                      title="Remove restaurant"
                    >
                      ✕
                    </button>
                  </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Flyover Detail Panel */}
      {activeDetail && (
        <>
          <div className="flyover-backdrop" onClick={closeFlyover} />
          <aside className="flyover-panel" role="dialog" aria-label={`Details for ${activeDetail.name}`}>
            <button className="flyover-close" onClick={closeFlyover} aria-label="Close">✕</button>

            {activeDetail.image && (
              <div className="flyover-image">
                <img src={activeDetail.image} alt={activeDetail.name} />
              </div>
            )}

            <div className="flyover-header">
              <span className="cuisine-tag">{activeDetail.cuisine}</span>
              <span className="price-badge">{activeDetail.priceRange}</span>
            </div>
            <h2 className="flyover-title">{activeDetail.name}</h2>
            <div className="flyover-rating">{renderStars(activeDetail.rating)}</div>
            <p className="flyover-description">{activeDetail.description}</p>

            {activeDetail.recommendation && (
              <div className="flyover-section recommendation-section">
                <h3>💡 Why We Recommend This</h3>
                <p className="recommendation-text">{activeDetail.recommendation}</p>
              </div>
            )}

            <div className="flyover-section">
              <h3>📍 Address</h3>
              <p>{activeDetail.address}</p>
              <div className="flyover-map-actions">
                <a href={mapsUrl(activeDetail.address)} target="_blank" rel="noopener noreferrer" className="map-link">View on Map</a>
                <a href={directionsUrl(activeDetail.address)} target="_blank" rel="noopener noreferrer" className="directions-link">Get Directions</a>
              </div>
              <div className="flyover-map">
                <iframe
                  title={`Map of ${activeDetail.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(activeDetail.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: 8 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="flyover-section">
              <h3>🕐 Hours</h3>
              <p className="flyover-hours">{activeDetail.hours}</p>
            </div>

            <div className="flyover-section">
              <h3>⭐ Yelp Reviews</h3>
              {(activeDetail.reviews || []).length === 0 ? (
                <p className="review-empty">No reviews yet.</p>
              ) : (
                [...(activeDetail.reviews || [])].sort((a, b) => b.rating - a.rating).map((review, idx) => (
                  <div key={idx} className="review-card">
                    <div className="review-header">
                      <strong>{review.author}</strong>
                      <span className="review-date">{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="review-stars">{reviewStars(review.rating)}</div>
                    <p className="review-text">"{review.text}"</p>
                  </div>
                ))
              )}
            </div>
          </aside>
        </>
      )}

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <p>{restaurants.filter(r => !r.visited).length} restaurant{restaurants.filter(r => !r.visited).length !== 1 ? 's' : ''} left to try</p>
          <p className="footer-brand">Restaurant Picks &mdash; Curated Dining</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
