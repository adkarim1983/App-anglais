'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageHeader } from '@/components/page-header'
import { SiteFooter } from '@/components/site-footer'
import { Mail, Send, User, MessageSquare, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Réinitialiser le message de succès après 5 secondes
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        alert(data.error || 'Erreur lors de l\'envoi du message')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex flex-col">
      <PageHeader />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 flex-1">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-6 shadow-lg">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Une question, une suggestion ou besoin d'aide ? N'hésitez pas à nous contacter. 
            Nous serons ravis de vous répondre dans les plus brefs délais.
          </p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-950/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-200">
                      Message envoyé avec succès !
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contact Form */}
        <Card className="border-2 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Nom complet
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  Adresse email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-base font-semibold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  Sujet
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Objet de votre message"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-base font-semibold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  Message
                </Label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Écrivez votre message ici..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 text-base border-2 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors resize-none bg-background"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <Card className="border-2 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/30">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                Temps de réponse
              </h3>
              <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-medium">
                  Nous répondons généralement sous 24-48 heures
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Notre équipe est là pour vous aider et répondre à toutes vos questions
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
