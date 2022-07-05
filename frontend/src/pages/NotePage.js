import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/chevron-left.svg'

const NotePage = ({ match, history }) => {
  const { id } = useParams()

  const [note, setNote] = useState()

  useEffect(() => {
    getNote()
  }, [id])

  let getNote = async () => {
    if (id === 'new') return
    let reponse = await fetch(`/api/notes/${id}/`)
    let data = await reponse.json()
    setNote(data)
  }

  let updateNote = async () => {
    fetch(`/api/notes/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': 'django-insecure-yd@8@n)2_@hcf$jq1_x@^iygw3!#tsm!v8u6_7ca3gag0o@h3h',
      },
      body: JSON.stringify(note),
    })
  }

  let createNote = async () => {
    fetch('/api/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': 'django-insecure-yd@8@n)2_@hcf$jq1_x@^iygw3!#tsm!v8u6_7ca3gag0o@h3h',
      },
      body: JSON.stringify(note),
    })
  }

  let deleteNote = async () => {
    fetch(`/api/notes/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  let handleSubmit = async () => {
    if (id !== 'new' && note.body === '') {
      deleteNote()
    } else if (id !== 'new' && note.body !== '') {
      console.log(note.body)
      updateNote()
    } else if ((id === 'new') & (note !== null)) {
      createNote()
    }
  }

  let handleChange = async (e) => {
    console.log(e.target.body)
    setNote((not) => ({ ...not, body: e.target.value }))
  }

  return (
    <div className="note">
      <div className="note-header">
        <Link to="/">
          <h3>
            <ArrowLeft onClick={handleSubmit} />
            {id !== 'new' ? (
              <button onClick={deleteNote}>Delete</button>
            ) : (
              <button onClick={handleSubmit}>Done</button>
            )}
          </h3>
        </Link>
      </div>

      <textarea onChange={(e) => handleChange(e)} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage
