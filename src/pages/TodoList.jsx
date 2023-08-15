import { useState } from 'react'

export default function App() {
  const [todoName, setTodoName] = useState("")
  const [todoList, setTodoList] = useState([])
  const [horizontalButtons, setHorizontalButtons] = useState("")
  function handleSubmit(form) {
    form.preventDefault()

    let newTodo = {
      id: crypto.randomUUID(),
      title: todoName,
      completed: false
    }

    setTodoList(currentTodoList => [...currentTodoList, newTodo])
    setTodoName("")
  }

  function handleToggleBox(todoId, status) {
    let checkedTodo = currentTodo => currentTodo.id === todoId
      ? { ...currentTodo, completed: status }
      : currentTodo

    setTodoList(currentTodoList => currentTodoList.map(checkedTodo))
  }

  function handleDelete(taskId) {
    setTodoList(currentTodoList => currentTodoList.filter(task => task.id !== taskId))
  }

  function renderTodo(todo) {
    return (
      <li className='renderedTodo' key={todo.id}>
        <label>
          <input
            className='toggleBox'
            type="checkbox"
            onChange={checkbox => handleToggleBox(todo.id, checkbox.target.checked)}
            checked={todo.completed} />
          {todo.title}

          <button
            className='deleteButton'
            onClick={() => handleDelete(todo.id)}>delete</button>
        </label>
      </li>
    )
  }

  function renderHorizontalButton(buttonName) {
    return (
      <button className={buttonName}>
        {buttonName}
      </button>
    )
  }



  return (
    <>
      <h1>Tasks</h1>

      <label className='list'>
        <button className='phonebtn'>
          Phone
        </button>
        <button className='tabletbtn'>
          Tablets
        </button>
        <button className='laptopbtn'>
          Laptops
        </button>
      </label>

      <form className='addTaskForm' onSubmit={form => handleSubmit(form)}>
        <input
          type="text"
          value={todoName}
          onChange={inputText => setTodoName(inputText.target.value)}
          id="input"></input>
        <button className="addButton">add</button>
      </form>

      <ul className='todoList'>
        {todoList.map(todo => renderTodo(todo))}
      </ul>
    </>
  )
}
