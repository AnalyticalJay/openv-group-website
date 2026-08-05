import { useAsyncData } from '@/hooks/useAsyncData';
import {
  SkeletonCard,
  SkeletonCardGrid,
  SkeletonHero,
  SkeletonFeatureList,
  SkeletonTestimonial,
} from './SkeletonLoaders';

/**
 * Example component demonstrating skeleton loader usage
 * Shows how to use skeleton states while loading async data
 */

// Mock async data fetchers
const mockFetchHeroData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    title: 'Welcome to OpenV Group',
    subtitle: 'Enterprise Solutions for Modern Technology',
    description: 'Leading innovation in enterprise technology solutions.',
  };
};

const mockFetchCards = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return [
    { id: 1, title: 'Card 1', description: 'Description for card 1' },
    { id: 2, title: 'Card 2', description: 'Description for card 2' },
    { id: 3, title: 'Card 3', description: 'Description for card 3' },
  ];
};

const mockFetchFeatures = async () => {
  await new Promise(resolve => setTimeout(resolve, 1800));
  return [
    { id: 1, title: 'Feature 1', description: 'Description of feature 1' },
    { id: 2, title: 'Feature 2', description: 'Description of feature 2' },
    { id: 3, title: 'Feature 3', description: 'Description of feature 3' },
    { id: 4, title: 'Feature 4', description: 'Description of feature 4' },
  ];
};

/**
 * Example: Hero Section with Skeleton
 */
export function HeroSectionExample() {
  const { data, isLoading, error } = useAsyncData(mockFetchHeroData, { delay: 300 });

  if (error) {
    return <div className="text-red-600">Error loading hero content</div>;
  }

  return (
    <section className="py-16 px-4">
      {isLoading ? (
        <SkeletonHero />
      ) : (
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{data?.title}</h1>
          <h2 className="text-2xl text-gray-600">{data?.subtitle}</h2>
          <p className="text-lg text-gray-700">{data?.description}</p>
        </div>
      )}
    </section>
  );
}

/**
 * Example: Card Grid with Skeleton
 */
export function CardGridExample() {
  const { data, isLoading, error } = useAsyncData(mockFetchCards, { delay: 300 });

  if (error) {
    return <div className="text-red-600">Error loading cards</div>;
  }

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">Our Solutions</h2>
      
      {isLoading ? (
        <SkeletonCardGrid count={3} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((card) => (
            <div key={card.id} className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-700">{card.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Example: Feature List with Skeleton
 */
export function FeatureListExample() {
  const { data, isLoading, error } = useAsyncData(mockFetchFeatures, { delay: 300 });

  if (error) {
    return <div className="text-red-600">Error loading features</div>;
  }

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">Key Features</h2>
      
      {isLoading ? (
        <SkeletonFeatureList count={4} />
      ) : (
        <div className="space-y-6">
          {data?.map((feature) => (
            <div key={feature.id} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg" />
              <div className="flex-1">
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Example: Multiple Sections Loading
 */
export function MultiSectionExample() {
  const heroData = useAsyncData(mockFetchHeroData, { delay: 300 });
  const cardsData = useAsyncData(mockFetchCards, { delay: 300 });
  const featuresData = useAsyncData(mockFetchFeatures, { delay: 300 });

  return (
    <div className="space-y-12">
      <HeroSectionExample />
      <CardGridExample />
      <FeatureListExample />
    </div>
  );
}

/**
 * Example: Testimonial with Skeleton
 */
export function TestimonialSectionExample() {
  const mockFetchTestimonials = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return [
      {
        id: 1,
        rating: 5,
        text: 'Excellent service and support!',
        author: 'John Doe',
        role: 'CEO',
      },
    ];
  };

  const { data, isLoading, error } = useAsyncData(mockFetchTestimonials, { delay: 300 });

  if (error) {
    return <div className="text-red-600">Error loading testimonials</div>;
  }

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
      
      {isLoading ? (
        <SkeletonTestimonial />
      ) : (
        <div className="space-y-4 p-6 bg-white rounded-lg border border-gray-200">
          {data?.map((testimonial) => (
            <div key={testimonial.id}>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">{testimonial.text}</p>
              <div>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
