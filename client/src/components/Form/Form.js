import React, { useEffect, useState } from 'react'
import APIService from '../APIService'

function Form(props) {
  const [title, setTitle] = useState(props.organization.title)
  const [body, setBody] = useState(props.organization.body)
  const [formVisible, setFormVisible] = useState(true);


  useEffect(() => {
    setTitle(props.organization.title)
    setBody(props.organization.body)
    setFormVisible(true)
  },[props.organization])

  const updateOrganization = () => {
    APIService.UpdateOrganization(props.organization.id, {title, body})
    .then(resp => {
      props.updatedData(resp);
      setFormVisible(false);
    })
    .catch(error => console.log(error))

  }

  const addOrganization = () => {
    APIService.AddOrganization({title, body})
    .then(resp => {
      props.addData(resp)
      setFormVisible(false)
    })
    .catch(error => console.log(error))
  }

  const cancelForm = () => {
    setFormVisible(false)
  }


  return (
    <div className='form-container'>
        {formVisible && props.organization ?  (
          <div className = "mb-3">

            <label htmlFor='title' className='form-label'>Title</label>

            <input type='text' className='form-control'
            value={title}
            placeholder='Please Enter Title'
            onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor='body' className='form-label'>Description</label>

            <textarea className='form-control' rows={5}
            value={body}
            placeholder='Please Enter Description'
            onChange={(e) => setBody(e.target.value)}
            />

            <div className='row'>
              <div className='col'>
                {
                props.organization.id ? <button 
                className='btn btn-success mt-3'
                onClick={updateOrganization}
                >Update</button>
                :
                <button 
                className='btn btn-success mt-3'
                onClick={addOrganization}
                >Add</button>
                }
              </div>
              <div className='col'>
                <button
                className='btn btn-danger mt-3'
                onClick={cancelForm}
                >Cancel</button>

              </div>
            </div>



            

          </div>
        ) : null}

    </div>
  )
}

export default Form
