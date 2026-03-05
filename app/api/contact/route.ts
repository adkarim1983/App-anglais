import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Vérifier si Resend est configuré
    const resendApiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || 'aderrab.karim1983@gmail.com'

    if (!resendApiKey) {
      console.warn('⚠️ RESEND_API_KEY non configurée. Le message sera seulement loggé.')
      console.log('📧 Message reçu:', { name, email, subject, message })
      
      return NextResponse.json(
        { 
          success: true,
          message: 'Message reçu (mode développement - configurez RESEND_API_KEY pour l\'envoi réel)',
          devMode: true
        },
        { status: 200 }
      )
    }

    // Envoyer l'email avec Resend
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'App-Anglais <onboarding@resend.dev>', // Utilisez votre domaine vérifié
          to: [contactEmail],
          reply_to: email,
          subject: `[Contact App-Anglais] ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Nouveau message de contact</h2>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Nom :</strong> ${name}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Sujet :</strong> ${subject}</p>
              </div>
              
              <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h3 style="color: #374151; margin-top: 0;">Message :</h3>
                <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 4px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px;">
                  💡 Vous pouvez répondre directement à cet email pour contacter ${name}
                </p>
              </div>
            </div>
          `,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Erreur Resend:', errorData)
        throw new Error('Erreur lors de l\'envoi avec Resend')
      }

      const data = await response.json()
      console.log('✅ Email envoyé avec succès:', data.id)

      return NextResponse.json(
        { 
          success: true,
          message: 'Message envoyé avec succès',
          emailId: data.id
        },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erreur lors du traitement de la requête:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la requête' },
      { status: 500 }
    )
  }
}
