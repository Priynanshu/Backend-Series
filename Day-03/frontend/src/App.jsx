import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      description: " test description 1",
    },
    {
      title: "test title 2",
      description: " test description 2",
    },

    {
      title: "test title 3",
      description: " test description 3",
    },
    {
      title: "test title 4",
      description: " test description 4",
    }
  ])
  const [editDesc, setEditDesc] = useState({});

  function fetchNotes() {
    axios.get("http://localhost:3000/notes")
      .then((res) => {
        setNotes(res.data.notes);
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;

    axios.post("http://localhost:3000/notes", {
      title: title.value,
      description: description.value
    })
      .then((res) => {
        fetchNotes()
      })
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:3000/notes/` + id)
      .then((res) => {
        fetchNotes()
      })
  }

  function handleUpdate(id) {
  const input = document.getElementById(`desc-${id}`);
  const updatedDescription = input.value;

  axios.patch(`http://localhost:3000/notes/${id}`, {
    description: updatedDescription,
  }).then(() => {
    fetchNotes();
  });
}


  return (
    <>
      <form onSubmit={handleSubmit} className="note-create-form">
        <input type="text" name="title" placeholder='enter title' />
        <input type="text" name="description" placeholder='enter description' />
        <button className='submit-btn'>submit</button>
      </form>
      <div className='notes'>
        {notes.map((note, idx) => {
          return <div key={idx} className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <input
              type="text"
              defaultValue={note.description}
              id={`desc-${note._id}`}
            />
            <button onClick={() => handleDelete(note._id)}>Delete</button>
            <button onClick={() => handleUpdate(note._id)}>Update</button>
          </div>
        })}
      </div>
    </>
  )
}

export default App