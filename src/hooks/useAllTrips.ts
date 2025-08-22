import { Trip } from '@/types/trip';
import { useState, useEffect } from 'react';

const useAllTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/trips/all`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setTrips(data);
        console.log('Trips fetched:', data);
        
      } catch (error) {
        console.error('Error fetching trips:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return { trips, loading, error };
};

export default useAllTrips;