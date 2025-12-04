const CASES = [
  { title: "Onboarding", gradient: "from-blue-500 to-cyan-400" },
  { title: "Événements", gradient: "from-purple-500 to-pink-500" },
  { title: "Cadeaux clients", gradient: "from-amber-500 to-orange-500" },
  { title: "Remote teams", gradient: "from-emerald-500 to-teal-500" },
  { title: "Anniversaires", gradient: "from-rose-500 to-red-500" }
];

export default function LandingUseCases() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">
          Pour toutes les occasions de votre entreprise
        </h2>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
          {CASES.map((item, idx) => (
            <div 
              key={idx} 
              className={`relative overflow-hidden rounded-2xl h-32 md:h-40 group cursor-pointer hover:scale-105 transition duration-300 shadow-md`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90 group-hover:opacity-100 transition`}></div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-white font-bold text-lg md:text-xl drop-shadow-md">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
