'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    question: "Comment sont gérés les délais de production ?",
    answer: "Pour les produits en stock, nous expédions en 24-48h. Pour les produits personnalisés à la demande, comptez 5 à 10 jours ouvrés selon la complexité."
  },
  {
    question: "Peut-on personnaliser les packs par équipe ?",
    answer: "Absolument. Vous pouvez créer des collections spécifiques (ex: Sales, Tech, Marketing) avec des produits différents et des budgets adaptés."
  },
  {
    question: "Y a-t-il un minimum de commande ?",
    answer: "Non, c'est la force de Goodeez. Vous pouvez commander 1 seul pack pour un nouvel arrivant. Nous gérons le stock pour vous."
  },
  {
    question: "Comment se passe la facturation ?",
    answer: "Vous recevez une facture mensuelle consolidée avec le détail de toutes les commandes passées par vos équipes. Plus de notes de frais éparpillées."
  }
];

export default function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-slate-50 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-center">
          Questions fréquentes
        </h2>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="font-bold text-slate-900 text-lg">{faq.question}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {openIndex === idx && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
