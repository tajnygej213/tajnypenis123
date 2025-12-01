import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AccountMenu() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];
  const email = localStorage.getItem("mamba_user_email");
  
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("mamba_user_email");
    localStorage.removeItem("mamba_user_id");
    setLocation("/");
  };

  const handleChangePassword = async () => {
    if (!newPassword || !oldPassword || !confirmPassword) {
      toast({ title: "Błąd", description: "Wypełnij wszystkie pola", duration: 3000 });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Błąd", description: "Nowe hasła się nie zgadzają", duration: 3000 });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Błąd", description: "Hasło musi mieć co najmniej 6 znaków", duration: 3000 });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email?.toLowerCase(),
          oldPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast({ title: "Błąd", description: error.error || "Nie udało się", duration: 3000 });
        setIsLoading(false);
        return;
      }

      toast({ title: "Sukces", description: t.account.changePassword.success, duration: 3000 });
      setChangePasswordOpen(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({ title: "Błąd", description: "Coś poszło nie tak", duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast({ title: "Błąd", description: "Wpisz hasło", duration: 3000 });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email?.toLowerCase(),
          password: deletePassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast({ title: "Błąd", description: error.error || "Nie udało się", duration: 3000 });
        setIsLoading(false);
        return;
      }

      toast({ title: "Sukces", description: t.account.deleteAccount.success, duration: 2000 });
      localStorage.removeItem("mamba_user_email");
      localStorage.removeItem("mamba_user_id");
      setTimeout(() => setLocation("/"), 1000);
    } catch (error) {
      toast({ title: "Błąd", description: "Coś poszło nie tak", duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary hover:text-black font-mono text-xs uppercase tracking-widest cursor-pointer"
          >
            {t.nav.account}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-zinc-950 border-zinc-800 w-56">
          <DropdownMenuLabel className="text-primary">
            {t.nav.loggedInAs}
            <br />
            <span className="text-xs text-foreground/70">{email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-800" />
          <DropdownMenuItem
            onClick={() => setChangePasswordOpen(true)}
            className="cursor-pointer hover:bg-zinc-900"
          >
            <Settings className="mr-2 h-4 w-4" />
            {t.nav.changePassword}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteAccountOpen(true)}
            className="cursor-pointer hover:bg-red-900/20 text-red-400"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t.nav.deleteAccount}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-800" />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-zinc-900">
            <LogOut className="mr-2 h-4 w-4" />
            {t.nav.logout}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-primary">{t.account.changePassword.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t.account.changePassword.oldPassword}</Label>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="bg-zinc-900 border-zinc-800"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label>{t.account.changePassword.newPassword}</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-zinc-900 border-zinc-800"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label>{t.account.changePassword.confirmPassword}</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-zinc-900 border-zinc-800"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleChangePassword}
              className="w-full bg-primary text-black hover:bg-primary/90 font-bold"
              disabled={isLoading}
            >
              {isLoading ? "Poczekaj..." : t.account.changePassword.submit}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
        <DialogContent className="bg-zinc-950 border-red-900/50">
          <DialogHeader>
            <DialogTitle className="text-red-400">{t.account.deleteAccount.title}</DialogTitle>
            <DialogDescription className="text-red-300/70">
              {t.account.deleteAccount.warning}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t.account.deleteAccount.password}</Label>
              <Input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="bg-zinc-900 border-red-900/30"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleDeleteAccount}
              className="w-full bg-red-600 text-white hover:bg-red-700 font-bold"
              disabled={isLoading}
            >
              {isLoading ? "Poczekaj..." : t.account.deleteAccount.submit}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
