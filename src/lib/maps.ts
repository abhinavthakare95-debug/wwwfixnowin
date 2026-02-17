// Replace with your actual Google Maps API key
export const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

// Default center: Noida, India
export const DEFAULT_CENTER = { lat: 28.5355, lng: 77.3910 };
export const DEFAULT_ZOOM = 14;

// Simulated provider locations near Noida
export const providerLocations = [
  { id: 1, name: "Rajesh Kumar", service: "Mechanic", lat: 28.5385, lng: 77.3950, rating: 4.8 },
  { id: 2, name: "Amit Singh", service: "Mechanic", lat: 28.5320, lng: 77.3870, rating: 4.6 },
  { id: 3, name: "Priya Sharma", service: "Electrician", lat: 28.5400, lng: 77.3880, rating: 4.9 },
  { id: 4, name: "Vikram Patel", service: "Plumber", lat: 28.5290, lng: 77.3960, rating: 4.7 },
];

// Simulate a moving provider for live tracking
export const simulateProviderMovement = (
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
  step: number,
  totalSteps: number
) => {
  const progress = Math.min(step / totalSteps, 1);
  return {
    lat: start.lat + (end.lat - start.lat) * progress,
    lng: start.lng + (end.lng - start.lng) * progress,
  };
};
