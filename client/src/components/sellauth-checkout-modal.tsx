import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SellAuthCheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutUrl: string;
}

export function SellAuthCheckoutModal({ open, onOpenChange, checkoutUrl }: SellAuthCheckoutModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  const shouldRender = open && checkoutUrl && checkoutUrl.length > 0;

  useEffect(() => {
    if (shouldRender) {
      setIsLoading(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [shouldRender]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

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
            className="relative w-[450px] h-[700px] max-w-[95vw] max-h-[90vh] rounded-xl overflow-hidden"
            style={{ backgroundColor: "#0a0f1f" }}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-4 z-10 text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-7 w-7" />
            </button>

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-12 h-12 rounded-full animate-spin"
                  style={{
                    border: "4px solid rgba(255, 255, 255, 0.2)",
                    borderTopColor: "#5865f2",
                  }}
                />
              </div>
            )}

            <iframe
              src={checkoutUrl}
              onLoad={handleIframeLoad}
              className="w-full h-full border-0"
              style={{ display: isLoading ? "none" : "block" }}
              title="Checkout"
              allow="payment"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
