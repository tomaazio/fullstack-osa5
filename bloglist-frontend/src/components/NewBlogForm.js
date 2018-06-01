import React from 'react'

const NewBlogForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addBlog}>
        <div>
          <label>
            title:
            <input type="text"
              name="title"
              onChange={props.handleChange}
              value={props.titleValue}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input type="text"
              name="author"
              onChange={props.handleChange}
              value={props.authorValue}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input type="text"
              name="url"
              onChange={props.handleChange}
              value={props.urlValue}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
