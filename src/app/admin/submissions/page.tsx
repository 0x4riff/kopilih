import { AdminSubmissions } from "@/components/admin-submissions";
import { requireAdminAuth } from "@/lib/admin-auth";

export default async function AdminSubmissionsPage() {
  await requireAdminAuth();
  return <AdminSubmissions />;
}
