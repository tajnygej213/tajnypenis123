import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface DiscordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DiscordModal({ open, onOpenChange }: DiscordModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display tracking-wide text-primary">
            CHOOSE YOUR SERVER
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Select which Discord community you'd like to join.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <a
            href="https://discord.gg/Ka5TQuWN6s"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 hover:border-primary/60 transition-all hover:shadow-[0_0_20px_hsl(142_70%_50%_/_0.3)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-display font-bold text-primary group-hover:text-primary/80 transition-colors">
                  MambaObywatel
                </h3>
                <ExternalLink className="h-4 w-4 text-primary/60 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-xs text-zinc-400 mb-4">
                Join our community for citizen identity services
              </p>
              <Button className="w-full bg-primary text-black hover:bg-primary/90 font-bold text-sm">
                JOIN SERVER
              </Button>
            </div>
          </a>

          <a
            href="https://discord.gg/HxGrw2Rf99"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="p-4 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 hover:border-secondary/60 transition-all hover:shadow-[0_0_20px_hsl(267_80%_50%_/_0.3)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-display font-bold text-secondary group-hover:text-secondary/80 transition-colors">
                  MambaReceipts
                </h3>
                <ExternalLink className="h-4 w-4 text-secondary/60 group-hover:text-secondary transition-colors" />
              </div>
              <p className="text-xs text-zinc-400 mb-4">
                Join our community for receipt generation services
              </p>
              <Button className="w-full bg-secondary text-white hover:bg-secondary/90 font-bold text-sm">
                JOIN SERVER
              </Button>
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
