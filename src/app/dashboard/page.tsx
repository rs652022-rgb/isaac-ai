import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <pre className="mt-4 p-4 bg-gray-100 rounded">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
