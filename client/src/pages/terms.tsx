import { Layout } from "@/components/layout";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCheck, Shield } from "lucide-react";

export default function Terms() {
  const { language } = useLanguage();
  
  const content = language === "pl" ? {
    title: "WARUNKI KORZYSTANIA",
    subtitle: "Proszę przeczytaj uważnie przed użyciem naszych usług",
    intro: "Korzystając z Mamba Services, akceptujesz następujące warunki. Jeśli się z nimi nie zgadzasz, prosimy nie korzystać z naszych usług.",
    sections: [
      {
        icon: FileCheck,
        title: "1. Akceptacja Warunków",
        content: "Uzyskując dostęp do naszych usług, potwierdzasz, że jesteś w wieku 18 lat lub starszy i masz prawo do zawarcia wiążącej umowy. Akceptujesz wszystkie warunki zawarte na tej stronie."
      },
      {
        icon: AlertCircle,
        title: "2. Odpowiedzialność Użytkownika",
        content: "Jesteś odpowiedzialny za utrzymanie poufności swoich danych logowania i hasła. Jesteś w pełni odpowiedzialny za wszystkie działania wykonane na Twoim koncie. Zobowiązujesz się do niezwłocznego powiadomienia nas o każdym nieautoryzowanym dostępie do Twojego konta."
      },
      {
        icon: Shield,
        title: "3. Ograniczenia Korzystania",
        content: "Nie wolno Ci: (a) Używać usługi do celów незаконных, (b) Naruszyć prywatność lub prawa innej osoby, (c) Rozpowszechniać wirusy lub złośliwe oprogramowanie, (d) Próbować uzyskać nieautoryzowany dostęp do naszych systemów, (e) Handlować lub odsprzedawać naszą usługę bez zgody."
      }
    ],
    details: [
      {
        title: "4. Dostarczanie Usług",
        content: "Zapewniamy Ci dostęp do naszych narzędzi i aplikacji. Rezerwujemy sobie prawo do modyfikacji, zawieszenia lub przerwania usług w dowolnym momencie. Usługi są dostarczane 'TAK JAK SĄ' bez żadnych gwarancji."
      },
      {
        title: "5. Płatności i Zwroty",
        content: "Wszystkie płatności są ostateczne i nieodwracalne. Po zakupie usługi uzyskujesz dostęp natychmiast. Zwroty są możliwe w ciągu 14 dni od daty zakupu, pod warunkiem że nie skorzystałeś z usługi. Skontaktuj się z nami przez Discord w celu przetworzenia zwrotu."
      },
      {
        title: "6. Zrzeczenie się Gwarancji",
        content: "Usługi są dostarczane bez jakichkolwiek gwarancji, wyrażonych lub domniemanych. Nie gwarantujemy, że usługi będą wolne od błędów lub przerw. Nie ponosimy odpowiedzialności za żadne straty lub szkody wynikające z korzystania z naszych usług."
      },
      {
        title: "7. Ograniczenie Odpowiedzialności",
        content: "W żadnym wypadku nasza odpowiedzialność za Twoją szkodę nie będzie wyższa niż kwota, którą zapłaciłeś za usługę. Nie ponosimy odpowiedzialności za utratę danych, utratę zysku lub inne straty pośrednie."
      },
      {
        title: "8. Prawo do Modyfikacji",
        content: "Zastrzegamy sobie prawo do zmiany tych warunków w dowolnym momencie. Będziemy Cię powiadamiać o istotnych zmianach. Dalsze korzystanie z usług po takich zmianach oznacza Twoją akceptację nowych warunków."
      },
      {
        title: "9. Rozwiązanie Konta",
        content: "Możesz usunąć swoje konto w dowolnym momencie. Bezpośrednio po usunięciu utrasisz dostęp do wszystkich usług. Twoje dane będą usunięte zgodnie z naszą polityką prywatności."
      },
      {
        title: "10. Prawo Właściwe",
        content: "Te warunki podlegają prawu polskiemu. Wszelkie spory będą rozstrzygane przez sądy polska."
      }
    ],
    lastUpdated: "Ostatnia aktualizacja: 1 grudnia 2025"
  } : {
    title: "TERMS OF SERVICE",
    subtitle: "Please read carefully before using our services",
    intro: "By using Mamba Services, you accept the following terms. If you do not agree, please do not use our services.",
    sections: [
      {
        icon: FileCheck,
        title: "1. Acceptance of Terms",
        content: "By accessing our services, you confirm that you are 18 years or older and have the right to enter into a binding agreement. You accept all terms contained on this page."
      },
      {
        icon: AlertCircle,
        title: "2. User Responsibility",
        content: "You are responsible for maintaining the confidentiality of your login credentials and password. You are fully responsible for all activities on your account. You agree to notify us immediately of any unauthorized access to your account."
      },
      {
        icon: Shield,
        title: "3. Usage Restrictions",
        content: "You may not: (a) Use the service for illegal purposes, (b) Violate the privacy or rights of another person, (c) Distribute viruses or malware, (d) Attempt to gain unauthorized access to our systems, (e) Trade or resell our service without consent."
      }
    ],
    details: [
      {
        title: "4. Service Delivery",
        content: "We provide you with access to our tools and applications. We reserve the right to modify, suspend, or terminate services at any time. Services are provided 'AS IS' without any warranties."
      },
      {
        title: "5. Payments and Refunds",
        content: "All payments are final and non-refundable. Upon purchase, you gain access immediately. Refunds are possible within 14 days of purchase, provided you have not used the service. Contact us via Discord to process a refund."
      },
      {
        title: "6. Disclaimer of Warranties",
        content: "Services are provided without any warranties, express or implied. We do not guarantee that services will be error-free or uninterrupted. We are not responsible for any losses or damages arising from the use of our services."
      },
      {
        title: "7. Limitation of Liability",
        content: "In no event shall our liability for your damage exceed the amount you paid for the service. We are not responsible for data loss, loss of profit, or other indirect damages."
      },
      {
        title: "8. Right to Modify",
        content: "We reserve the right to change these terms at any time. We will notify you of material changes. Continued use of services after such changes means you accept the new terms."
      },
      {
        title: "9. Account Termination",
        content: "You can delete your account at any time. Immediately after deletion, you will lose access to all services. Your data will be deleted according to our privacy policy."
      },
      {
        title: "10. Governing Law",
        content: "These terms are governed by Polish law. Any disputes will be resolved by Polish courts."
      }
    ],
    lastUpdated: "Last updated: December 1, 2025"
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black/40 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              {content.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{content.subtitle}</p>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full shadow-[0_0_10px_hsl(142_70%_50%)]" />
          </div>

          {/* Intro */}
          <Card className="bg-zinc-900/50 border-primary/20 backdrop-blur-sm mb-8">
            <CardContent className="pt-6">
              <p className="text-zinc-300 leading-relaxed text-base">
                {content.intro}
              </p>
            </CardContent>
          </Card>

          {/* Main sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {content.sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <Card key={i} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-sm font-display text-primary">
                        {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed sections */}
          <div className="space-y-4 mb-12">
            {content.details.map((detail, i) => (
              <Card key={i} className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-display text-primary text-base">
                    {detail.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed text-sm">
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
