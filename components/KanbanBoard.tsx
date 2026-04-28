"use client";
import { useState, useEffect } from "react";
import { 
  DndContext, 
  DragOverEvent, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  rectIntersection 
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { ColumnType, Task, Id } from "../types/kanban";
import Column from "./Column";

const defaultCols: ColumnType[] = [
  { id: "todo", title: "YAPILACAKLAR" },
  { id: "doing", title: "İŞLEMDE" },
  { id: "done", title: "BİTENLER" },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("taskflow-final-v1");
    
    // Hata veren setState işlemini setTimeout içine alarak React'i rahatlatıyoruz
    const timer = setTimeout(() => {
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setTasks(parsed);
        } catch (e) {
          console.error("Veri okuma hatası:", e);
        }
      }
      setHasMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("taskflow-final-v1", JSON.stringify(tasks));
    }
  }, [tasks, hasMounted]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    setTasks((prev) => {
      const activeIndex = prev.findIndex((t) => t.id === activeId);
      const overIndex = prev.findIndex((t) => t.id === overId);
      const isOverCol = defaultCols.some(col => col.id === overId);
      const newColId = isOverCol ? overId : prev[overIndex]?.columnId;

      if (activeIndex !== -1) {
        const updated = [...prev];
        updated[activeIndex].columnId = newColId;
        return arrayMove(updated, activeIndex, overIndex !== -1 ? overIndex : activeIndex);
      }
      return prev;
    });
  }

  const addTask = (columnId: Id) => {
    const content = window.prompt("Görev içeriği:");
    if (!content) return;
    setTasks((prev) => [...prev, { id: Date.now().toString(), columnId, content }]);
  };

  if (!hasMounted) return null;

  return (
    <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragOver={onDragOver}>
      <div className="flex gap-8 justify-center p-10 overflow-x-auto">
        {defaultCols.map((col) => (
          <Column 
            key={col.id} 
            column={col} 
            tasks={tasks.filter((t) => t.columnId === col.id)} 
            onAddTask={addTask} 
          />
        ))}
      </div>
    </DndContext>
  );
}