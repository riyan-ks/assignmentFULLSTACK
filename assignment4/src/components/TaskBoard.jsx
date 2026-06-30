import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export default function TaskBoard() {
  const [tasks, setTasks] = useLocalStorage('cipher_tasks', []);
  const [subtasks, setSubtasks] = useLocalStorage('cipher_subtasks', []);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [newSubtaskTitles, setNewSubtaskTitles] = useState({});

  // State to track which task is currently fading out
  const [animatingTaskId, setAnimatingTaskId] = useState(null);

  const groupTasks = (taskList) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const groups = { Overdue: [], Today: [], Upcoming: [], 'No Date': [] };

    taskList.forEach(task => {
      if (task.completed) return;

      if (!task.dueDate) {
        groups['No Date'].push(task);
      } else if (task.dueDate < todayStr) {
        groups['Overdue'].push(task);
      } else if (task.dueDate === todayStr) {
        groups['Today'].push(task);
      } else {
        groups['Upcoming'].push(task);
      }
    });

    return groups;
  };

  const activeGroups = groupTasks(tasks);
  const completedTasks = tasks.filter(t => t.completed);

  const addTask = (e) => {
    e.preventDefault();

    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      dueDate: '',
      completed: false
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const updateDueDate = (taskId, date) => {
    setTasks(
      tasks.map(t =>
        t.id === taskId
          ? { ...t, dueDate: date }
          : t
      )
    );
  };

  // Smooth fade-out before moving to completed
  const toggleTaskCompletion = (taskId, currentlyCompleted) => {
    if (!currentlyCompleted) {
      setAnimatingTaskId(taskId);

      setTimeout(() => {
        setTasks(
          tasks.map(t =>
            t.id === taskId
              ? { ...t, completed: true }
              : t
          )
        );

        setAnimatingTaskId(null);
      }, 400);
    } else {
      setTasks(
        tasks.map(t =>
          t.id === taskId
            ? { ...t, completed: false }
            : t
        )
      );
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const saveInlineEdit = (taskId) => {
    setTasks(
      tasks.map(t =>
        t.id === taskId
          ? { ...t, title: editingTitle }
          : t
      )
    );

    setEditingTaskId(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    setSubtasks(subtasks.filter(st => st.parentId !== taskId));
  };

  const addSubtask = (e, parentId) => {
    e.preventDefault();

    const title = newSubtaskTitles[parentId];

    if (!title || !title.trim()) return;

    const newSub = {
      id: crypto.randomUUID(),
      parentId,
      title: title.trim(),
      completed: false
    };

    setSubtasks([...subtasks, newSub]);

    setNewSubtaskTitles({
      ...newSubtaskTitles,
      [parentId]: ''
    });
  };

  const toggleSubtask = (subtaskId) => {
    setSubtasks(
      subtasks.map(st =>
        st.id === subtaskId
          ? { ...st, completed: !st.completed }
          : st
      )
    );
  };

  return (
    <div>
      <h2>📋 Task Board</h2>

      <form
        onSubmit={addTask}
        style={{
          marginBottom: '25px',
          display: 'flex',
          gap: '10px'
        }}
      >
        <input
          type="text"
          placeholder="Quick add task title..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Task
        </button>
      </form>

      {Object.entries(activeGroups).map(([groupName, groupTasksList]) => (
        <div key={groupName} style={{ marginBottom: '20px' }}>
          <h3
            style={{
              borderBottom: '2px solid #ddd',
              paddingBottom: '5px',
              color:
                groupName === 'Overdue'
                  ? '#ef4444'
                  : '#374151'
            }}
          >
            {groupName} ({groupTasksList.length})
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginTop: '10px'
            }}
          >
            {groupTasksList.map(task => (
              <div
                key={task.id}
                style={{
                  background: '#fff',
                  padding: '15px',
                  borderRadius: '6px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  opacity:
                    animatingTaskId === task.id
                      ? 0
                      : 1,
                  transition:
                    'opacity 400ms ease'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'between',
                    gap: '10px',
                    flexWrap: 'wrap'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      toggleTaskCompletion(
                        task.id,
                        task.completed
                      )
                    }
                  />

                  {editingTaskId === task.id ? (
                    <input
                      value={editingTitle}
                      onChange={(e) =>
                        setEditingTitle(
                          e.target.value
                        )
                      }
                      onBlur={() =>
                        saveInlineEdit(
                          task.id
                        )
                      }
                      onKeyDown={(e) =>
                        e.key === 'Enter' &&
                        saveInlineEdit(
                          task.id
                        )
                      }
                      autoFocus
                      style={{
                        flex: 1,
                        padding: '4px'
                      }}
                    />
                  ) : (
                    <span
                      onClick={() =>
                        startEditing(task)
                      }
                      style={{
                        flex: 1,
                        cursor: 'pointer',
                        fontWeight: 500
                      }}
                    >
                      {task.title}
                    </span>
                  )}

                  <input
                    type="date"
                    value={task.dueDate}
                    onChange={(e) =>
                      updateDueDate(
                        task.id,
                        e.target.value
                      )
                    }
                    style={{
                      padding: '4px',
                      borderRadius: '4px',
                      border:
                        '1px solid #ccc'
                    }}
                  />

                  <button
                    onClick={() =>
                      deleteTask(task.id)
                    }
                    style={{
                      background: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>

                <div
                  style={{
                    marginLeft: '25px',
                    marginTop: '10px',
                    borderLeft:
                      '2px solid #e5e7eb',
                    paddingLeft: '10px'
                  }}
                >
                  {subtasks
                    .filter(
                      st =>
                        st.parentId ===
                        task.id
                    )
                    .map(sub => (
                      <div
                        key={sub.id}
                        style={{
                          display:
                            'flex',
                          alignItems:
                            'center',
                          gap: '8px',
                          margin:
                            '4px 0'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={
                            sub.completed
                          }
                          onChange={() =>
                            toggleSubtask(
                              sub.id
                            )
                          }
                        />

                        <span
                          style={{
                            textDecoration:
                              sub.completed
                                ? 'line-through'
                                : 'none',
                            color:
                              sub.completed
                                ? '#9ca3af'
                                : '#4b5563',
                            fontSize:
                              '14px'
                          }}
                        >
                          {sub.title}
                        </span>
                      </div>
                    ))}

                  <form
                    onSubmit={(e) =>
                      addSubtask(
                        e,
                        task.id
                      )
                    }
                    style={{
                      display:
                        'flex',
                      gap: '5px',
                      marginTop:
                        '6px'
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Add subtask..."
                      value={
                        newSubtaskTitles[
                          task.id
                        ] || ''
                      }
                      onChange={(e) =>
                        setNewSubtaskTitles({
                          ...newSubtaskTitles,
                          [task.id]:
                            e.target.value
                        })
                      }
                      style={{
                        padding:
                          '4px',
                        fontSize:
                          '12px',
                        flex: 1
                      }}
                    />

                    <button
                      type="submit"
                      style={{
                        fontSize:
                          '12px',
                        padding:
                          '2px 8px'
                      }}
                    >
                      +
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {completedTasks.length > 0 && (
        <div
          style={{
            marginTop: '30px',
            opacity: 0.75
          }}
        >
          <h3
            style={{
              borderBottom:
                '2px solid #ddd',
              paddingBottom:
                '5px',
              color:
                '#10b981'
            }}
          >
            Completed
          </h3>

          {completedTasks.map(task => (
            <div
              key={task.id}
              style={{
                background:
                  '#edfdf7',
                padding:
                  '10px 15px',
                borderRadius:
                  '6px',
                margin: '8px 0',
                display:
                  'flex',
                alignItems:
                  'center',
                gap: '10px'
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  toggleTaskCompletion(
                    task.id,
                    task.completed
                  )
                }
              />

              <span
                style={{
                  textDecoration:
                    'line-through',
                  color:
                    '#059669',
                  flex: 1
                }}
              >
                {task.title}
              </span>

              <button
                onClick={() =>
                  deleteTask(task.id)
                }
                style={{
                  background:
                    '#ef4444',
                  color: '#fff',
                  border: 'none',
                  padding:
                    '2px 8px',
                  borderRadius:
                    '4px'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}