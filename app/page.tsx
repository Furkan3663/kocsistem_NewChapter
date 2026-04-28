import KanbanBoard from "@/components/KanbanBoard";

export default function Home() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <nav className="bg-white py-6 shadow-sm border-b border-gray-200">
        <h1 className="text-3xl font-black text-black text-center tracking-tighter uppercase">
          TASKFLOW <span className="text-blue-600">PRO</span>
        </h1>
      </nav>
      <div className="container mx-auto">
        <KanbanBoard />
      </div>
    </main>
  );
}