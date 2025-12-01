import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, ExternalLink } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-primary" />
            <DialogTitle className="text-2xl font-display tracking-wide text-primary">
              {t.help.title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-300 text-base mt-4">
            {t.help.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <a
            href="https://discord.gg/Ka5TQuWN6s"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Button className="w-full bg-primary text-black hover:bg-primary/90 font-bold h-12 flex items-center justify-center gap-2">
              <ExternalLink className="h-4 w-4" />
              {t.help.joinDiscord}
            </Button>
          </a>

          <a
            href="https://discord.gg/HxGrw2Rf99"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Button className="w-full bg-secondary text-white hover:bg-secondary/90 font-bold h-12 flex items-center justify-center gap-2">
              <ExternalLink className="h-4 w-4" />
              {t.help.createTicket}
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
