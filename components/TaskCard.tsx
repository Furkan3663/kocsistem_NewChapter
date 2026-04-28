"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../types/kanban";

export default function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-4 min-h-[100px] flex items-center rounded-xl shadow-sm border border-gray-200 cursor-grab ${
        isDragging ? "opacity-30 ring-2 ring-blue-500" : "hover:border-blue-300"
      }`}
    >
      <p className="text-black font-bold w-full break-words leading-tight uppercase text-sm">
        {task.content}
      </p>
    </div>
  );
}