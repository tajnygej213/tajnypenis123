import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShoppingCart } from "lucide-react";

interface SellAuthCheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutUrl: string;
}

export function SellAuthCheckoutModal({ open, onOpenChange, checkoutUrl }: SellAuthCheckoutModalProps) {
  const shouldRender = open && checkoutUrl && checkoutUrl.length > 0;

  const openCheckout = useCallback(() => {
    const width = 500;
    const height = 750;
    const left = (window.innerWidth - width) / 2 + window.screenX;
    const top = (window.innerHeight - height) / 2 + window.screenY;
    window.open(
      checkoutUrl,
      "sellauth_checkout",
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
    );
  }, [checkoutUrl]);

  useEffect(() => {
    if (shouldRender) {
      document.body.style.overflow = "hidden";
      openCheckout();
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [shouldRender, openCheckout]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-[400px] max-w-[95vw] rounded-xl overflow-hidden p-8"
            style={{ backgroundColor: "#0a0f1f" }}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-4 z-10 text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#5865f2]/20 flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-[#5865f2]" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Checkout</h3>
                <p className="text-white/60 text-sm">
                  Strona checkout została otwarta w nowym oknie.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={openCheckout}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-lg font-medium transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                  Otwórz ponownie
                </button>
                
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                >
                  Zamknij
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
