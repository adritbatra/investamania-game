import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { backgroundManager, RoundBackground } from "@/lib/background-manager";
import { Upload, X, Image as ImageIcon, Settings } from "lucide-react";

interface BackgroundManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackgroundsUpdated: () => void;
}

export default function BackgroundManagerModal({ 
  isOpen, 
  onClose, 
  onBackgroundsUpdated 
}: BackgroundManagerModalProps) {
  const [rounds, setRounds] = useState<RoundBackground[]>(backgroundManager.getAllRounds());
  const [uploading, setUploading] = useState<number | null>(null);

  const handleFileUpload = async (file: File, roundNumber: number) => {
    setUploading(roundNumber);
    try {
      await backgroundManager.loadImageFile(file, roundNumber);
      setRounds(backgroundManager.getAllRounds());
      onBackgroundsUpdated();
    } catch (error) {
      console.error('Failed to upload background:', error);
    } finally {
      setUploading(null);
    }
  };

  const handleRemoveBackground = (roundNumber: number) => {
    backgroundManager.clearRoundBackground(roundNumber);
    setRounds(backgroundManager.getAllRounds());
    onBackgroundsUpdated();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, roundNumber: number) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file, roundNumber);
    }
    // Reset input value to allow re-uploading same file
    event.target.value = '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-600 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <Settings className="mr-2" size={24} />
            Background Manager
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6">
          <p className="text-slate-300 mb-6">
            Upload custom background images for each round. Images will be automatically resized and positioned to fit the game screen.
          </p>
          
          <div className="grid gap-4">
            {rounds.map((round) => (
              <div 
                key={round.roundNumber}
                className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">
                      Round {round.roundNumber}: {round.title}
                    </h3>
                    <p className="text-sm text-slate-400">{round.subtitle}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {round.imagePath ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-10 rounded border border-slate-500 overflow-hidden">
                          <img 
                            src={round.imagePath} 
                            alt={`Round ${round.roundNumber} background`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          onClick={() => handleRemoveBackground(round.roundNumber)}
                          variant="outline"
                          size="sm"
                          className="text-red-400 border-red-400 hover:bg-red-900/20"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center text-slate-400">
                        <ImageIcon size={16} className="mr-1" />
                        <span className="text-sm">No image</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Label 
                    htmlFor={`file-${round.roundNumber}`}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm font-medium transition-colors">
                      <Upload size={16} />
                      <span>
                        {uploading === round.roundNumber ? 'Uploading...' : 
                         round.imagePath ? 'Replace Image' : 'Upload Image'}
                      </span>
                    </div>
                  </Label>
                  <Input
                    id={`file-${round.roundNumber}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, round.roundNumber)}
                    disabled={uploading === round.roundNumber}
                    className="hidden"
                  />
                  <span className="text-xs text-slate-400">
                    Recommended: 1920x1080 or higher resolution
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-6 space-x-3">
            <Button 
              onClick={onClose}
              variant="outline"
              className="border-slate-600 hover:bg-slate-700"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}