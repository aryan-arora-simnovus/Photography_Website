// components/common/ShareButton.jsx
import React, { useState } from 'react';
import { Share2, X, Copy, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';


import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast'; 

const ShareButton = ({ 
  url = window.location.href, 
  title = "Check out this amazing photo!",
  variant = "outline",
  size = "sm",
  className = "border-white/30 text-white hover:bg-white/10"
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard",
      variant: "default",
    });
    setIsOpen(false);
  };
  
  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    setIsOpen(false);
  };
  
  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    setIsOpen(false);
  };
  
  const shareToLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    setIsOpen(false);
  };
  
  const shareByEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this content</DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button onClick={shareToFacebook} variant="outline" className="flex items-center gap-2">
            <Facebook className="h-4 w-4" />
            Facebook
          </Button>
          <Button onClick={shareToTwitter} variant="outline" className="flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>
          <Button onClick={shareToLinkedin} variant="outline" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Button>
          <Button onClick={shareByEmail} variant="outline" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </Button>
          <Button onClick={handleCopyLink} variant="default" className="col-span-2">
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareButton;
