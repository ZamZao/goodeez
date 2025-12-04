export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Commandes en cours</div>
          <div className="text-3xl font-bold text-gray-900">12</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Stock total</div>
          <div className="text-3xl font-bold text-gray-900">1,240</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Budget consommé</div>
          <div className="text-3xl font-bold text-gray-900">45%</div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 text-center py-12">
        <p className="text-gray-500">Graphiques et statistiques détaillées à venir...</p>
      </div>
    </div>
  );
}
