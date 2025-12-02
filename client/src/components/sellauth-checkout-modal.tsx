import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

interface SellAuthCheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutUrl: string;
}

export function SellAuthCheckoutModal({ open, onOpenChange, checkoutUrl }: SellAuthCheckoutModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const shouldRender = open && checkoutUrl && checkoutUrl.length > 0;

  const openInNewWindow = useCallback(() => {
    const width = 500;
    const height = 700;
    const left = (window.innerWidth - width) / 2 + window.screenX;
    const top = (window.innerHeight - height) / 2 + window.screenY;
    window.open(
      checkoutUrl,
      "sellauth_checkout",
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
    );
    onOpenChange(false);
  }, [checkoutUrl, onOpenChange]);

  useEffect(() => {
    if (shouldRender) {
      setIsLoading(true);
      setIframeBlocked(false);
      document.body.style.overflow = "hidden";
      
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setIframeBlocked(true);
      }, 3000);
    } else {
      document.body.style.overflow = "unset";
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [shouldRender]);

  const handleIframeLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
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

            <iframe
              ref={iframeRef}
              src={checkoutUrl}
              onLoad={handleIframeLoad}
              className="w-full h-full border-0"
              title="Checkout"
              allow="payment"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
            />

            {(isLoading || iframeBlocked) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0f1f] gap-6">
                {isLoading && !iframeBlocked && (
                  <div
                    className="w-12 h-12 rounded-full animate-spin"
                    style={{
                      border: "4px solid rgba(255, 255, 255, 0.2)",
                      borderTopColor: "#5865f2",
                    }}
                  />
                )}
                
                {iframeBlocked && (
                  <>
                    <p className="text-white/70 text-center px-6 text-sm">
                      Strona checkout nie może być załadowana tutaj.
                    </p>
                    <button
                      onClick={openInNewWindow}
                      className="flex items-center gap-2 px-6 py-3 bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-lg font-medium transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Otwórz w nowym oknie
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
