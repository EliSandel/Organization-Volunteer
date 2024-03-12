import React, { useContext, useState } from 'react'
import APIService from '../APIService'
import { AuthContext } from '../../store/AuthContext'

function Organizations(props) {
  const { isLoggedIn } = useContext(AuthContext)
  
  const editOrganization = (organization) => {
    props.editOrganization(organization)
  }

  const deleteOrganization = (organization) => {
    
    APIService.DeleteOrganization(organization.id)
    .then(() => props.deleteOrganization(organization))
  }


  return (
    <div className="row-container">
        {props.organizations && props.organizations.map(organization => {
          return(
            <div key= {organization.id} className="organization-card">
              <h2>{organization.title}</h2>
              <p>{organization.body}</p>
              <p>{organization.date}</p>

              {isLoggedIn && <div className='row d-grid gap-2'>
                <div className='col-md-1'>
                  <button className='btn btn-primary '
                  onClick={() => editOrganization(organization)}
                  >Update</button>
                </div>
                <div className='col'>
                  <button className='btn btn-danger'
                  onClick={() => deleteOrganization(organization)}
                  >Delete</button>
                </div>
              </div>}

              <hr />
            </div>
          )
      })}

    </div>
  )
}

export default Organizations