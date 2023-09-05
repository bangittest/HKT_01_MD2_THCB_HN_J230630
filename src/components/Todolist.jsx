import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Todos() {
  const [todo, setTodo] = useState("");
  const [jobs, setJobs] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  let todos = JSON.parse(localStorage.getItem("jobs")) || [];
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      alert("Bạn không được để trống");
      return;
    }
    if (todos.some((item) => item.todo.toLowerCase() === todo.toLowerCase())) {
      alert("Công việc đã tồn tại");
      return;
    }
    const newData = {
      //   id: Math.floor(Math.random() * 10000),
      id: uuidv4(),
      todo: todo,
      done: false,
    };
    alert("bạn đã thêm thành công");
    localStorage.setItem("jobs", JSON.stringify([...todos, newData]));
    setTodo("");
  };
  //hàm xóa
  const handleDeleteTodo = (todo) => {
    if (window.confirm("Bạn có muốn xóa?")) {
      const updatedTodos = todos.filter((item) => item.id !== todo.id);
      localStorage.setItem("jobs", JSON.stringify(updatedTodos));
      setJobs(updatedTodos);
    }
  };

  const handleEditTodo = (editedTodo) => {
    if (editingTodo !== null) {
      return;
    }
    setEditingTodo(editedTodo.id);
    setTodo(editedTodo.todo);
    inputRef.current.focus();
  };

  const handleUpdateTodo = () => {
    if (todo === "") {
      alert("Bạn không được để trống");
      return;
    }

    const updatedTodos = todos.map((item) =>
      item.id === editingTodo ? { ...item, todo: todo } : item
    );

    localStorage.setItem("jobs", JSON.stringify(updatedTodos));
    setEditingTodo(null);
    setTodo("");
  };
  const handleOnchangeChex = (id) => {
    const index = todos.findIndex(e => e.id === id);
    todos[index].done = !todos[index].done
    localStorage.setItem("jobs", JSON.stringify(todos));
    setJobs(todos)
  }
  return (
    <>
      <section className="vh-300 gradient-custom text-white" >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center
                    h-100">
            <div className="col col-xl-10">
              <div className="card bg-danger text-white" style={{ boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset" }}>
                <div className="card-body p-5">
                  <h3 style="text-align: center; margin-bottom:
                                    40px;">
                    TODO LIST</h3>
                  <p>get things done,one item at a time</p>
                  <hr />

                  <div className="tab-content" >
                    <div className="tab-pane fade show active">
                      {todos.map((e) => (
                        <ul className="list-group mb-0 " key={e.id}>
                          <li
                            className="list-group-item d-flex
                                           align-items-center border-0 mb-2
                                           rounded justify-content-between  "
                            style={{ backgroundColor: "#f4f6f7" }}
                          >
                            <div>
                              <input
                                className="form-check-input
                                me-2 "
                                type="checkbox"
                                checked={e.done}
                                onChange={() => handleOnchangeChex(e.id)}
                              />
                              <span style={e.done ? { textDecoration: "line-through" } : { textDecoration: "none" }}>{e.todo}</span>
                            </div>
                            <div>
                              {editingTodo !== e.id && (
                                <>
                                  <a
                                    href="#!"
                                    className="text-info"
                                    title="Sửa công việc"
                                  >
                                    <i
                                      className="fas fa-pencil-alt me-3"
                                      onClick={() => handleEditTodo(e)}
                                    />
                                  </a>

                                  <a
                                    href="#!"
                                    className="text-danger"
                                    title="Xóa công việc"
                                  >
                                    <i
                                      className="fas fa-trash-alt"
                                      onClick={() => handleDeleteTodo(e)}
                                    />
                                  </a>
                                </>
                              )}
                              {editingTodo === e.id && (
                                <>
                                  <button
                                    className="btn btn-success btn-sm"
                                    onClick={handleUpdateTodo}
                                  >
                                    Lưu
                                  </button>
                                  <button
                                    className="btn btn-secondary btn-sm ms-2"
                                    onClick={() => {
                                      setEditingTodo(null);
                                      setTodo("");
                                    }}
                                  >
                                    Hủy
                                  </button>
                                </>
                              )}
                            </div>
                          </li>
                        </ul>
                      ))}
                    </div>
                    <hr />
                    <form className="" onSubmit={handleSubmit} >
                      <label className="text-white " for="form2">Add to the todo list</label>
                      <div className="pd-7 text-white">
                        <input type="text " id="form2"
                        ref={inputRef}
                          className="form-control "
                          value={todo}
                          onChange={(e) => setTodo(e.target.value)} />
                      </div>
                      <button type="submit" className="btn btn-primary
                                        ms-2 mt-2 " >ADD ITEM</button>
                    </form>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
