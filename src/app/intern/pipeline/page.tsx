import { PageShell } from "@/components/intern/layout/page-shell";
import { KanbanBoard } from "@/components/intern/pipeline/kanban-board";

export default function PipelinePage() {
  return (
    <PageShell title="Pipeline" subtitle="Drag & Drop zum Status ändern">
      <KanbanBoard />
    </PageShell>
  );
}
