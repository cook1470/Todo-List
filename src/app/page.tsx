'use client';
import { useState } from "react";

export default function Home() {
  // 儲存待辦事項的狀態
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // 處理新增待辦事項
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo(""); // 清空輸入框
    }
  };

  // 處理刪除待辦事項
  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // 切換項目完成狀態
  const toggleCompletion = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">To-Do List</h1>

        {/* 輸入區域 */}
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="新增待辦事項"
          />
          <button
            onClick={handleAddTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            新增
          </button>
        </div>

        {/* 顯示待辦事項 */}
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className='flex items-center justify-between p-2 bg-gray-50 rounded-md dark:bg-gray-700'
              onClick={() => toggleCompletion(index)} // 點擊項目切換完成狀態
            >
              <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.text}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 防止觸發項目點擊事件
                  handleDeleteTodo(index);
                }}
                className="text-red-500 hover:text-red-700"
              >
                刪除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
