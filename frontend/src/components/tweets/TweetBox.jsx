import React, {useState} from 'react';

const TweetBox = ({ text, user, id,  deleteTweet, editTweet }) => {
  const [editMode, setEditMode] = useState(false)
  const [edit, setEdit] = useState(text)

  const handleEditTweet = (e) => {
setEdit(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editTweet(user, id, edit)
    setEditMode(false)
  }

  return <form onSubmit={handleSubmit} className="p-8 my-8 shadow-md card">
    {!editMode ? <h3 className="text-lg">{text}</h3> : <input type="textarea" value={edit} onChange={handleEditTweet} />}
  <div className="flex">
    {editTweet && !editMode && (
      <button
        className="mx-auto mt-8 w-1/4 btn btn-primary"
      onClick={() => setEditMode(true)}
      >
        Edit
      </button>
    )}
    {editTweet && editMode && (
      <button
      type="submit"
        className="mx-auto mt-8 w-1/4 btn btn-primary"
      >
        Save
      </button>
    )}
    {deleteTweet && (
      <button
        className="mx-auto mt-8 w-1/4 btn btn-secondary"
        onClick={deleteTweet}
      >
        Delete
      </button>
    )}
  </div>
  </form>
};

export default TweetBox;
