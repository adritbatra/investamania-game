// Background image management for Investamania rounds

export interface RoundBackground {
  roundNumber: number;
  imagePath?: string;
  fallbackClass: string;
  title: string;
  subtitle: string;
}

export const roundBackgrounds: RoundBackground[] = [
  {
    roundNumber: 1,
    imagePath: undefined, // Will be set when image is uploaded
    fallbackClass: "round-1",
    title: "Greyscale Startup World",
    subtitle: "Begin your journey in the monochrome world of early-stage ventures"
  },
  {
    roundNumber: 2,
    imagePath: undefined,
    fallbackClass: "round-2", 
    title: "Urban Debtown",
    subtitle: "Navigate the gritty city streets where fortunes are made and lost"
  },
  {
    roundNumber: 3,
    imagePath: undefined,
    fallbackClass: "round-3",
    title: "Green Suburbia", 
    subtitle: "Explore stable residential markets and traditional investments"
  },
  {
    roundNumber: 4,
    imagePath: undefined,
    fallbackClass: "round-4",
    title: "Financial District",
    subtitle: "Enter the towering blue skyscrapers of high finance"
  },
  {
    roundNumber: 5,
    imagePath: undefined,
    fallbackClass: "round-5",
    title: "Golden Desert",
    subtitle: "Traverse the harsh landscape where only the strong survive"
  },
  {
    roundNumber: 6,
    imagePath: undefined,
    fallbackClass: "round-6",
    title: "Cosmic Markets",
    subtitle: "Venture into the mysterious purple void of space trading"
  },
  {
    roundNumber: 7,
    imagePath: undefined,
    fallbackClass: "round-7",
    title: "Tropical Jungle",
    subtitle: "Navigate the dense green wilderness of emerging markets"
  },
  {
    roundNumber: 8,
    imagePath: undefined,
    fallbackClass: "round-8",
    title: "Arctic Tundra",
    subtitle: "Brave the frozen wasteland of conservative investments"
  },
  {
    roundNumber: 9,
    imagePath: undefined,
    fallbackClass: "round-9",
    title: "Storm Clouds",
    subtitle: "Weather the dark tempest of market volatility"
  },
  {
    roundNumber: 10,
    imagePath: undefined,
    fallbackClass: "round-10",
    title: "Volcanic Investibeast's Lair",
    subtitle: "Final confrontation in the fiery depths of ultimate risk"
  }
];

export class BackgroundManager {
  private backgrounds: RoundBackground[] = [...roundBackgrounds];
  private storageKey = 'investamania-backgrounds-v3';

  constructor() {
    this.loadFromStorage();
  }

  // Load backgrounds from compressed storage
  private loadFromStorage() {
    try {
      // Clear old storage formats
      ['investamania-backgrounds', 'investamania-backgrounds-v2', 'investamania-backgrounds-session'].forEach(key => {
        if (localStorage.getItem(key) || sessionStorage.getItem(key)) {
          localStorage.removeItem(key);
          sessionStorage.removeItem(key);
        }
      });

      let loadedCount = 0;
      
      // Load from new compressed format
      for (let i = 1; i <= 10; i++) {
        const key = `investamania-bg-${i}`;
        const stored = localStorage.getItem(key);
        if (stored) {
          try {
            const data = JSON.parse(stored);
            const bg = this.backgrounds.find(bg => bg.roundNumber === i);
            if (bg && data.imagePath) {
              bg.imagePath = data.imagePath;
              loadedCount++;
              console.log(`✓ Loaded compressed background for round ${i}`);
            }
          } catch (e) {
            localStorage.removeItem(key);
          }
        }
        
        // Also try old format as fallback
        const oldKey = `${this.storageKey}-round-${i}`;
        const oldStored = localStorage.getItem(oldKey);
        if (oldStored && !this.backgrounds.find(bg => bg.roundNumber === i)?.imagePath) {
          try {
            const data = JSON.parse(oldStored);
            const bg = this.backgrounds.find(bg => bg.roundNumber === i);
            if (bg && data.imagePath) {
              bg.imagePath = data.imagePath;
              loadedCount++;
              console.log(`✓ Loaded background for round ${i} from old format`);
              // Remove old format after successful load
              localStorage.removeItem(oldKey);
            }
          } catch (e) {
            localStorage.removeItem(oldKey);
          }
        }
      }
      
      if (loadedCount > 0) {
        console.log(`✓ Successfully loaded ${loadedCount} backgrounds total`);
      } else {
        console.log('No saved backgrounds found - starting fresh');
      }
    } catch (error) {
      console.warn('Failed to load backgrounds from storage:', error);
    }
  }

  // Save backgrounds using compressed storage with chunking
  private saveToStorage() {
    const backgroundsWithImages = this.backgrounds.filter(bg => 
      bg.imagePath && typeof bg.imagePath === 'string' && bg.imagePath.length > 0
    );
    
    if (backgroundsWithImages.length === 0) return;

    // Save metadata to track all backgrounds
    const metadata = backgroundsWithImages.map(bg => ({
      roundNumber: bg.roundNumber,
      title: bg.title,
      hasImage: true
    }));
    
    try {
      localStorage.setItem('investamania-backgrounds-metadata', JSON.stringify(metadata));
      console.log(`✓ Saved metadata for ${backgroundsWithImages.length} backgrounds`);
    } catch (error) {
      console.warn('Failed to save metadata:', error);
    }

    // Try to save each background individually with compression
    let savedCount = 0;
    backgroundsWithImages.forEach(bg => {
      const key = `investamania-bg-${bg.roundNumber}`;
      try {
        // Compress the image data by reducing quality for storage
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          // Reduce size for storage efficiency
          const maxWidth = 800;
          const maxHeight = 600;
          let { width, height } = img;
          
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Save compressed version
          try {
            const compressedData = canvas.toDataURL('image/jpeg', 0.7);
            const data = {
              roundNumber: bg.roundNumber,
              imagePath: compressedData,
              title: bg.title,
              timestamp: Date.now()
            };
            localStorage.setItem(key, JSON.stringify(data));
            console.log(`✓ Compressed and saved background for round ${bg.roundNumber}`);
          } catch (storageError) {
            console.warn(`Failed to save compressed background for round ${bg.roundNumber}`);
          }
        };
        
        img.src = bg.imagePath || '';
        savedCount++;
      } catch (error) {
        // Fallback: try saving original
        try {
          const data = {
            roundNumber: bg.roundNumber,
            imagePath: bg.imagePath,
            title: bg.title,
            timestamp: Date.now()
          };
          localStorage.setItem(key, JSON.stringify(data));
          console.log(`✓ Saved original background for round ${bg.roundNumber}`);
        } catch (fallbackError) {
          console.warn(`Failed to save background for round ${bg.roundNumber}`);
        }
      }
    });
  }

  // Set background image for a specific round
  setRoundBackground(roundNumber: number, imagePath: string) {
    const background = this.backgrounds.find(bg => bg.roundNumber === roundNumber);
    if (background && imagePath && typeof imagePath === 'string') {
      background.imagePath = imagePath;
      console.log(`✓ Set background for round ${roundNumber}`);
      this.saveToStorage();
    }
  }

  // Get background for a specific round
  getRoundBackground(roundNumber: number): RoundBackground | undefined {
    return this.backgrounds.find(bg => bg.roundNumber === roundNumber);
  }

  // Get CSS class or inline style for a round
  getRoundBackgroundStyle(roundNumber: number): { className?: string; style?: React.CSSProperties } {
    const background = this.getRoundBackground(roundNumber);
    if (!background) return { className: "round-1" };

    if (background.imagePath) {
      return {
        style: {
          backgroundImage: `url(${background.imagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }
      };
    }

    return { className: background.fallbackClass };
  }

  // Load background images from uploaded files
  async loadImageFile(file: File, roundNumber: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imagePath = e.target?.result as string;
        this.setRoundBackground(roundNumber, imagePath);
        resolve(imagePath);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Clear background image for a round (revert to fallback)
  clearRoundBackground(roundNumber: number) {
    const background = this.backgrounds.find(bg => bg.roundNumber === roundNumber);
    if (background) {
      background.imagePath = undefined;
      this.saveToStorage();
    }
  }

  // Get all rounds with their background status
  getAllRounds(): RoundBackground[] {
    return [...this.backgrounds];
  }
}

// Global background manager instance
export const backgroundManager = new BackgroundManager();