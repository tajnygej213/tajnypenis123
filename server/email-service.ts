export function generateAccessCodeEmail(email: string, code: string, generatorLink: string): { subject: string; html: string } {
  return {
    subject: "Twój kod dostępu do Mamba Services 🐍",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Inter', Arial, sans-serif; background: #000; color: #fff; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #8eb34f; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #8eb34f; text-shadow: 0 0 10px rgba(142, 179, 79, 0.5); }
            .content { background: #1a1a1a; padding: 30px; border: 1px solid #333; border-radius: 8px; margin-bottom: 20px; }
            .thank-you { font-size: 24px; color: #8eb34f; margin-bottom: 20px; font-weight: bold; }
            .code-box { background: #0a0a0a; border: 2px solid #8eb34f; border-radius: 6px; padding: 20px; margin: 20px 0; text-align: center; }
            .code { font-size: 24px; font-family: 'Courier New', monospace; font-weight: bold; color: #8eb34f; letter-spacing: 2px; word-break: break-all; }
            .instructions { background: #1a1a1a; border-left: 4px solid #a855f7; padding: 15px; margin: 20px 0; }
            .step { margin: 10px 0; font-size: 14px; }
            .step-num { color: #8eb34f; font-weight: bold; }
            .link { color: #a855f7; text-decoration: none; word-break: break-all; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🐍 MAMBA SERVICES</div>
            </div>
            
            <div class="content">
              <div class="thank-you">Dziękujemy za Twoją transakcję!</div>
              
              <p>Twoje zamówienie zostało potwierdzone. Oto Twój jednorazowy kod dostępu:</p>
              
              <div class="code-box">
                <div class="code">${code}</div>
              </div>
              
              <div class="instructions">
                <div style="font-weight: bold; margin-bottom: 10px;">📋 Instrukcja aktywacji:</div>
                <div class="step"><span class="step-num">1.</span> Skopiuj kod dostępu powyżej</div>
                <div class="step"><span class="step-num">2.</span> Przejdź na: <a href="${generatorLink}" class="link">${generatorLink}</a></div>
                <div class="step"><span class="step-num">3.</span> Wklej kod i postępuj zgodnie z instrukcjami</div>
              </div>
              
              <p style="color: #999; font-size: 12px;">
                ⚠️ Kod jest jednorazowy. Po jego użyciu nie będzie już dostępny.
              </p>
            </div>
            
            <div class="footer">
              <p>© 2025 Mamba Services. Wszystkie prawa zastrzeżone.</p>
              <p>Email wysłany do: ${email}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export async function sendAccessCodeEmail(email: string, code: string, generatorLink: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY not configured - email not sent");
    return false;
  }

  try {
    const emailContent = generateAccessCodeEmail(email, code, generatorLink);
    
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("[Email] Failed to send:", error);
      return false;
    }

    console.log(`[Email] Successfully sent access code to ${email}`);
    return true;
  } catch (error) {
    console.error("[Email] Error sending email:", error);
    return false;
  }
}
