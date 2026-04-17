// components/common/DownloadButton.jsx
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast'; 

const DownloadButton = ({ 
  url, 
  filename = `photo-${Date.now()}.jpg`,
  variant = "outline",
  size = "sm",
  className = "border-white/30 text-white hover:bg-white/10"
}) => {
  const { toast } = useToast();
  
  const handleDownload = async () => {
    try {
      // Fetch the image
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: `${filename} is being downloaded`,
        variant: "default",
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download failed",
        description: "There was an error downloading the file",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Button 
      onClick={handleDownload}
      variant={variant}
      size={size}
      className={className}
    >
      <Download className="h-4 w-4 mr-2" />
      Download
    </Button>
  );
};

export default DownloadButton;
