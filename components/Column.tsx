"use client";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

// Tipleri dışarıdan çağırmak yerine buraya yazıyoruz
type Id = string | number;
type ColumnType = { id: Id; title: string };
type Task = { id: Id; columnId: Id; content: string };

interface Props {
  column: ColumnType;
  tasks: Task[];
  onAddTask: (id: Id) => void;
}

export default function Column({ column, tasks, onAddTask }: Props) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div ref={setNodeRef} className="bg-gray-100 w-80 h-[75vh] rounded-2xl flex flex-col shadow-sm border border-gray-300">
      <div className="p-4 flex justify-between items-center bg-white rounded-t-2xl border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">{tasks.length}</span>
          <h2 className="text-black font-black uppercase text-sm tracking-tighter">{column.title}</h2>
        </div>
        <button onClick={() => onAddTask(column.id)} className="text-blue-600 font-bold text-xl">+</button>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-4 overflow-y-auto">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}