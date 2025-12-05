import Link from 'next/link';

export default function LegalPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-8">Informations Légales</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/legal/mentions-legales" className="block p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Mentions Légales</h2>
          <p className="text-slate-600">Informations sur l'éditeur du site et l'hébergeur.</p>
        </Link>

        <Link href="/legal/cgu" className="block p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
          <h2 className="text-xl font-semibold mb-2">CGU</h2>
          <p className="text-slate-600">Conditions Générales d'Utilisation du service.</p>
        </Link>

        <Link href="/legal/confidentialite" className="block p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Confidentialité</h2>
          <p className="text-slate-600">Politique de protection des données personnelles.</p>
        </Link>
      </div>
    </div>
  );
}
