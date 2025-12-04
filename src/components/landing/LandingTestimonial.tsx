import Image from 'next/image';

export default function LandingTestimonial() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-200 overflow-hidden relative border-4 border-white shadow-md">
               {/* Placeholder Avatar */}
               <div className="absolute inset-0 flex items-center justify-center bg-slate-300 text-slate-500 text-4xl font-bold">
                 JD
               </div>
               {/* <Image src="/avatar.jpg" alt="Jane Doe" fill className="object-cover" /> */}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <svg className="w-10 h-10 text-[var(--brand-primary)] opacity-20 mb-4 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.0547 15.3738 15.122 15.9141 14.873C16.5577 14.5765 16.5577 13.9335 16.5577 13.5625C16.5577 11.3228 14.7004 11 13.5355 11C12.3808 11 11.3691 11.8684 11.3691 13.9775C11.3691 15.0185 11.0297 15.9478 10.5145 16.6254C9.5752 17.8586 8.24949 18 7.45862 18C5.44189 18 4 16.1476 4 14.081C4 10.9813 6.81177 6 12.0305 6C15.7978 6 21 8.96386 21 15.7577C21 19.103 18.3688 21 16.4519 21C15.536 21 14.017 21 14.017 21ZM7 9C5.34315 9 4 10.3431 4 12C4 13.6569 5.34315 15 7 15C8.65685 15 10 13.6569 10 12C10 10.3431 8.65685 9 7 9Z" /></svg>
            <blockquote className="text-xl md:text-2xl font-medium text-slate-800 mb-6 leading-relaxed">
              "Avant Goodeez, je passais mes vendredis à faire des cartons. Maintenant, nos nouveaux employés reçoivent leur pack de bienvenue automatiquement. C'est magique."
            </blockquote>
            <div>
              <div className="font-bold text-slate-900">Julie Dubois</div>
              <div className="text-slate-500">Office Manager @ TechStart</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
