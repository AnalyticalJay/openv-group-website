# Skeleton Loaders Implementation Guide

## Overview

Skeleton loaders are animated placeholder components that display while content is loading asynchronously. They maintain visual continuity and improve perceived performance by showing users that content is on the way.

## Components

### Basic Skeleton Components

#### `SkeletonBlock`
Generic skeleton block for any rectangular placeholder.

```tsx
import { SkeletonBlock } from '@/components/SkeletonLoaders';

<SkeletonBlock 
  width="100%" 
  height={20} 
  borderRadius="4px" 
/>
```

**Props:**
- `width`: string | number (default: '100%')
- `height`: string | number (default: '20px')
- `borderRadius`: string (default: '4px')
- `className`: string (optional)

#### `SkeletonText`
Multiple lines of text placeholders.

```tsx
<SkeletonText lines={3} />
```

**Props:**
- `lines`: number (default: 3)

### Section-Specific Skeletons

#### `SkeletonHero`
Full hero section placeholder with title, description, buttons, and image.

```tsx
<SkeletonHero />
```

#### `SkeletonCard`
Single card placeholder with header, content, and footer.

```tsx
<SkeletonCard />
```

#### `SkeletonCardGrid`
Grid of card placeholders.

```tsx
<SkeletonCardGrid count={3} />
```

**Props:**
- `count`: number (default: 3)

#### `SkeletonFeatureList`
List of features with icon and text placeholders.

```tsx
<SkeletonFeatureList count={4} />
```

**Props:**
- `count`: number (default: 4)

#### `SkeletonTable`
Table placeholder with header and rows.

```tsx
<SkeletonTable rows={5} columns={4} />
```

**Props:**
- `rows`: number (default: 5)
- `columns`: number (default: 4)

#### `SkeletonTestimonial`
Testimonial/review placeholder with rating, text, and author info.

```tsx
<SkeletonTestimonial />
```

#### `SkeletonAvatar`
Avatar with text placeholder.

```tsx
<SkeletonAvatar />
```

#### `SkeletonNavBar`
Navigation bar placeholder.

```tsx
<SkeletonNavBar />
```

## Hooks

### `useAsyncData`
Hook for managing single async data request with skeleton state.

```tsx
import { useAsyncData } from '@/hooks/useAsyncData';
import { SkeletonCard } from '@/components/SkeletonLoaders';

function MyComponent() {
  const { data, isLoading, error, retry } = useAsyncData(
    () => fetch('/api/data').then(r => r.json()),
    { delay: 300 } // Minimum delay before showing content
  );

  if (error) return <div>Error: {error.message}</div>;

  return isLoading ? <SkeletonCard /> : <DataCard data={data} />;
}
```

**Options:**
- `delay`: number (default: 0) - Minimum delay before showing content
- `retries`: number (default: 3) - Number of retry attempts on error
- `retryDelay`: number (default: 1000) - Delay between retries in ms

**Returns:**
- `data`: T | null - Fetched data
- `isLoading`: boolean - Loading state
- `error`: Error | null - Error object if fetch failed
- `retry`: () => void - Function to retry the request

### `useAsyncDataMultiple`
Hook for managing multiple async requests simultaneously.

```tsx
const { data, isLoading, error } = useAsyncDataMultiple(
  [
    () => fetch('/api/hero').then(r => r.json()),
    () => fetch('/api/cards').then(r => r.json()),
    () => fetch('/api/features').then(r => r.json()),
  ],
  { delay: 300 }
);

// data is an array of results from each async function
```

### `useAsyncDataPaginated`
Hook for managing paginated data loading.

```tsx
const { 
  data, 
  isLoading, 
  page, 
  hasMore, 
  loadMore, 
  retry 
} = useAsyncDataPaginated(
  (page) => fetch(`/api/items?page=${page}`).then(r => r.json()),
  { delay: 300, pageSize: 10 }
);

return (
  <div>
    {data.map(item => <Item key={item.id} {...item} />)}
    {hasMore && <button onClick={loadMore}>Load More</button>}
  </div>
);
```

## Usage Examples

### Example 1: Simple Card Loading

```tsx
import { useAsyncData } from '@/hooks/useAsyncData';
import { SkeletonCard } from '@/components/SkeletonLoaders';

function ProductCard() {
  const { data, isLoading, error } = useAsyncData(
    () => fetch('/api/product').then(r => r.json()),
    { delay: 300 }
  );

  if (error) return <div className="text-red-600">Failed to load product</div>;

  return isLoading ? (
    <SkeletonCard />
  ) : (
    <div className="p-4 border rounded">
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <p className="font-bold">${data.price}</p>
    </div>
  );
}
```

### Example 2: Hero Section with Skeleton

```tsx
import { useAsyncData } from '@/hooks/useAsyncData';
import { SkeletonHero } from '@/components/SkeletonLoaders';

function HeroSection() {
  const { data, isLoading } = useAsyncData(
    () => fetch('/api/hero').then(r => r.json()),
    { delay: 300 }
  );

  return (
    <section className="py-20">
      {isLoading ? (
        <SkeletonHero />
      ) : (
        <div>
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <p className="text-xl mt-4">{data.subtitle}</p>
        </div>
      )}
    </section>
  );
}
```

### Example 3: Grid of Cards

```tsx
import { useAsyncData } from '@/hooks/useAsyncData';
import { SkeletonCardGrid } from '@/components/SkeletonLoaders';

function ProductGrid() {
  const { data, isLoading } = useAsyncData(
    () => fetch('/api/products').then(r => r.json()),
    { delay: 300 }
  );

  return (
    <div className="grid grid-cols-3 gap-6">
      {isLoading ? (
        <SkeletonCardGrid count={3} />
      ) : (
        data.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}
```

### Example 4: Multiple Sections

```tsx
import { useAsyncDataMultiple } from '@/hooks/useAsyncData';
import { SkeletonHero, SkeletonCardGrid } from '@/components/SkeletonLoaders';

function HomePage() {
  const { data, isLoading } = useAsyncDataMultiple(
    [
      () => fetch('/api/hero').then(r => r.json()),
      () => fetch('/api/featured-products').then(r => r.json()),
    ],
    { delay: 300 }
  );

  if (isLoading) {
    return (
      <div>
        <SkeletonHero />
        <SkeletonCardGrid count={3} />
      </div>
    );
  }

  const [heroData, productsData] = data;

  return (
    <div>
      <HeroSection data={heroData} />
      <ProductGrid products={productsData} />
    </div>
  );
}
```

### Example 5: Paginated List

```tsx
import { useAsyncDataPaginated } from '@/hooks/useAsyncData';
import { SkeletonFeatureList } from '@/components/SkeletonLoaders';

function FeatureList() {
  const { data, isLoading, hasMore, loadMore } = useAsyncDataPaginated(
    (page) => fetch(`/api/features?page=${page}`).then(r => r.json()),
    { delay: 300, pageSize: 10 }
  );

  return (
    <div>
      {isLoading && data.length === 0 ? (
        <SkeletonFeatureList count={4} />
      ) : (
        <div className="space-y-6">
          {data.map(feature => (
            <Feature key={feature.id} {...feature} />
          ))}
        </div>
      )}
      
      {hasMore && (
        <button 
          onClick={loadMore} 
          disabled={isLoading}
          className="mt-8 px-6 py-2 bg-blue-600 text-white rounded"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

## Animation Details

### Skeleton Pulse Animation
- Duration: 2 seconds
- Effect: Opacity fades from 1 to 0.5 and back
- Easing: ease-in-out
- Infinite loop

The animation creates a subtle "breathing" effect that indicates loading without being distracting.

### Customization

To customize the skeleton animation, modify the `skeletonStyles` in `SkeletonLoaders.tsx`:

```tsx
@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

## Best Practices

1. **Use Appropriate Delay**: Set `delay` option to at least 300ms to ensure skeleton is visible
2. **Match Content Shape**: Use skeleton components that match the shape of actual content
3. **Consistent Sizing**: Keep skeleton dimensions consistent with final content
4. **Error Handling**: Always provide error UI for failed requests
5. **Retry Logic**: Use the built-in retry functionality for better UX
6. **Performance**: Skeleton loaders are lightweight and don't impact performance
7. **Accessibility**: Ensure skeletons don't interfere with screen readers

## Browser Support

Skeleton loaders work in all modern browsers that support:
- CSS animations
- CSS gradients
- Flexbox/Grid

## Performance Considerations

- Skeleton components are lightweight and render quickly
- Animation uses CSS (GPU-accelerated)
- No JavaScript animation overhead
- Minimal memory footprint
- No external dependencies

## Troubleshooting

### Skeleton not showing
- Ensure `isLoading` state is true
- Check that `delay` is set appropriately
- Verify component is wrapped in `SkeletonProvider` if using custom styles

### Animation not smooth
- Check browser hardware acceleration is enabled
- Verify CSS animations are not disabled
- Check for conflicting CSS rules

### Content flickering
- Increase `delay` option
- Ensure data fetch is actually async
- Check for rapid state changes
