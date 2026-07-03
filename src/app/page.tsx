import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mesh-backdrop" />
      <div className="grain-overlay" />
      <Dashboard />
    </div>
  );
}
