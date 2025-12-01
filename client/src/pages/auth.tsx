import { Layout } from "@/components/layout";
import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({ title: "Błąd", description: "Wpisz email i hasło", duration: 3000 });
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      toast({ title: "Błąd", description: "Hasła się nie zgadzają", duration: 3000 });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast({ title: "Błąd", description: error.error || "Nie udało się", duration: 3000 });
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem("mamba_user_email", data.email);
      localStorage.setItem("mamba_user_id", data.id);

      toast({ title: "Sukces", description: "Zalogowano pomyślnie!", duration: 2000 });
      
      setTimeout(() => setLocation("/dashboard"), 500);
    } catch (error) {
      toast({ title: "Błąd", description: "Coś poszło nie tak", duration: 3000 });
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-zinc-950 border-zinc-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display text-primary">MAMBA AUTH</CardTitle>
            <CardDescription>Zaloguj się lub utwórz konto</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "signup")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-900/50 border border-white/5">
                <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-black">
                  Logowanie
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-black">
                  Rejestracja
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="bg-zinc-900 border-zinc-800"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hasło</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-zinc-900 border-zinc-800"
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-black hover:bg-primary/90 font-bold mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Poczekaj...
                      </>
                    ) : (
                      "Zaloguj się"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="bg-zinc-900 border-zinc-800"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hasło</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-zinc-900 border-zinc-800"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Potwierdź hasło</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-zinc-900 border-zinc-800"
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-black hover:bg-primary/90 font-bold mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Poczekaj...
                      </>
                    ) : (
                      "Utwórz konto"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
