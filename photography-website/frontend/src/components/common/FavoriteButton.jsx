// components/common/FavoriteButton.jsx
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast'; // Updated path

const FavoriteButton = ({ photoId, initialState = false, size = "sm" }) => {
  const [isFavorited, setIsFavorited] = useState(initialState);
  const { toast } = useToast();
  
  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favoritesArray = JSON.parse(storedFavorites);
      setIsFavorited(favoritesArray.includes(photoId));
    }
  }, [photoId]);
  
  const toggleFavorite = () => {
    // Get current favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    if (isFavorited) {
      // Remove from favorites
      favoritesArray = favoritesArray.filter(id => id !== photoId);
      toast({
        title: "Removed from favorites",
        description: "Photo has been removed from your favorites",
        variant: "default",
      });
    } else {
      // Add to favorites
      favoritesArray.push(photoId);
      toast({
        title: "Added to favorites",
        description: "Photo has been added to your favorites",
        variant: "default",
      });
    }
    
    // Update localStorage
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));
    
    // Update state
    setIsFavorited(!isFavorited);
  };
  
  return (
    <Button 
      onClick={toggleFavorite}
      size={size} 
      variant="ghost" 
      className={`p-1 h-auto ${isFavorited ? 'text-nature-moss' : 'text-white hover:text-nature-sage'}`}
    >
      <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
    </Button>
  );
};

export default FavoriteButton;
