import type { User } from "@/services/api";
import { Badge } from "@/components/ui/Badge";

type TableRowProps = {
  user: User;
};

export function TableRow({ user }: TableRowProps) {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      <td className="px-4 py-3 text-sm text-slate-900">{user.name}</td>
      <td className="px-4 py-3 text-sm text-slate-700">{user.email}</td>
      <td className="px-4 py-3 text-sm text-slate-700">{user.phone}</td>
      <td className="px-4 py-3 text-sm text-slate-700">{user.website}</td>
      <td className="px-4 py-3 text-sm text-slate-700">
        <Badge className="bg-slate-100 px-2 py-0.5 text-slate-600">
          {user.company.name}
        </Badge>
      </td>
    </tr>
  );
}
