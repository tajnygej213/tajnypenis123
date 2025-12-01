import { Layout } from "@/components/layout";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Shield, Eye } from "lucide-react";

export default function Privacy() {
  const { language } = useLanguage();
  
  const content = language === "pl" ? {
    title: "POLITYKA PRYWATNOŚCI",
    subtitle: "Jak chronimy Twoje dane",
    sections: [
      {
        icon: Lock,
        title: "Szyfrowanie danych",
        description: "Wszystkie dane przesyłane na naszą platformę są szyfrowane za pomocą najnowszych standardów SSL/TLS 256-bit encryption. Każda transakcja i wymiana informacji odbywa się w bezpiecznym kanale szyfrowanym."
      },
      {
        icon: Shield,
        title: "Bezpieczeństwo przechowywania",
        description: "Twoje dane osobowe są przechowywane na bezpiecznych serwerach z wielowarstwową ochroną. Używamy zaawansowanych systemów bezpieczeństwa, aby zapobiec nieautoryzowanemu dostępowi, modyfikacji lub ujawnieniu danych."
      },
      {
        icon: Eye,
        title: "Brak udostępniania danych",
        description: "Nigdy nie udostępniamy Twoich danych osobowych stronom trzecim bez Twojej wyraźnej zgody. Twoje informacje są używane wyłącznie do świadczenia usług, które zakupiłeś."
      }
    ],
    details: [
      {
        title: "Jakie dane zbieramy?",
        content: "Zbieramy tylko dane niezbędne do świadczenia usług: adres e-mail, nazwa użytkownika Discord (opcjonalnie) i dane transakcji. Nie zbieramy żadnych danych biometrycznych ani lokalizacyjnych."
      },
      {
        title: "Jak używamy Twoje dane?",
        content: "Twoje dane są używane do: (1) Świadczenia usług, które kupiłeś, (2) Komunikacji w sprawie Twojego konta, (3) Zapobiegania oszustwom i bezpieczeństwa, (4) Poprawy naszych usług."
      },
      {
        title: "Jak długo przechowujemy dane?",
        content: "Przechowujemy Twoje dane przez czas, w którym masz aktywne konto. Po usunięciu konta Twoje dane zostaną bezpiecznie usunięte w ciągu 30 dni, z wyjątkiem danych wymaganych do celów prawnych."
      },
      {
        title: "Twoje prawa",
        content: "Masz prawo do dostępu, poprawy lub usunięcia swoich danych. Możesz również żądać kopii wszystkich danych, które posiadamy. Skontaktuj się z nami za pośrednictwem Discord w celu realizacji tych uprawnień."
      },
      {
        title: "Bezpieczeństwo płatności",
        content: "Wszystkie płatności są przetwarzane przez Stripe, wiodącego dostawcę usług płatniczych na świecie. Nie przechowujemy pełnych numerów kart kredytowych - wszystkie dane karty są szyfrowane i przetwarzane bezpośrednio przez Stripe."
      },
      {
        title: "Zmiany w polityce",
        content: "Zastrzegamy sobie prawo do zmiany tej polityki prywatności. W przypadku jakichkolwiek zmian powiadomimy Cię poprzez aktualizację daty ostatniej modyfikacji na tej stronie."
      }
    ],
    lastUpdated: "Ostatnia aktualizacja: 1 grudnia 2025"
  } : {
    title: "PRIVACY POLICY",
    subtitle: "How we protect your data",
    sections: [
      {
        icon: Lock,
        title: "Data Encryption",
        description: "All data transmitted to our platform is encrypted using the latest SSL/TLS 256-bit encryption standards. Every transaction and information exchange occurs through a secure encrypted channel."
      },
      {
        icon: Shield,
        title: "Storage Security",
        description: "Your personal data is stored on secure servers with multi-layered protection. We use advanced security systems to prevent unauthorized access, modification, or disclosure of data."
      },
      {
        icon: Eye,
        title: "No Data Sharing",
        description: "We never share your personal data with third parties without your explicit consent. Your information is used solely to provide the services you have purchased."
      }
    ],
    details: [
      {
        title: "What data do we collect?",
        content: "We only collect data necessary to provide services: email address, Discord username (optional), and transaction data. We do not collect any biometric or location data."
      },
      {
        title: "How do we use your data?",
        content: "Your data is used for: (1) Providing the services you purchased, (2) Communicating about your account, (3) Preventing fraud and security, (4) Improving our services."
      },
      {
        title: "How long do we store data?",
        content: "We store your data while you have an active account. After account deletion, your data will be securely deleted within 30 days, except for data required for legal purposes."
      },
      {
        title: "Your rights",
        content: "You have the right to access, correct, or delete your data. You can also request a copy of all data we hold. Contact us via Discord to exercise these rights."
      },
      {
        title: "Payment Security",
        content: "All payments are processed through Stripe, the world's leading payment processor. We do not store full credit card numbers - all card data is encrypted and processed directly by Stripe."
      },
      {
        title: "Policy Changes",
        content: "We reserve the right to modify this privacy policy. If we make any changes, we will notify you by updating the last modified date on this page."
      }
    ],
    lastUpdated: "Last updated: December 1, 2025"
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black/40 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              {content.title}
            </h1>
            <p className="text-lg text-muted-foreground">{content.subtitle}</p>
          </div>

          {/* Main sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {content.sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <Card key={i} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg font-display text-primary">
                        {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed sections */}
          <div className="space-y-6 mb-12">
            {content.details.map((detail, i) => (
              <Card key={i} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-display text-primary text-lg">
                    {detail.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed">
                    {detail.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Last updated */}
          <div className="text-center text-sm text-muted-foreground">
            <p>{content.lastUpdated}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
