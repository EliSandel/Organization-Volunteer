import './App.css';
import React, { useState, useEffect, useMemo,useContext } from 'react';
import Organizations from './components/Organizations/Organizations';
import Form from './components/Form/Form';
import APIService from './components/APIService';
import Filter from './components/Filter/Filter';
import CheckboxSelect from './components/Filter/Filter';
import { AuthContext } from './store/AuthContext'
import LoginOption from './components/LoginOption/LoginOption';
import SignUp from './components/SignUp/SignUp';

function App() {

  const { isLoggedIn } = useContext(AuthContext)



  const [organizations, setOrganizations] = useState([])
  const [filteredOrganizations, setFilteredOrganizations] = useState()
  const [editedOrganization, setEditedOrganization] = useState(null)
  const [enterAcount, setEnterAccount] = useState(false)
  const [signUpForm, setSignUpForm] = useState(false)
  const [loginForm, setLoginForm] = useState(false)


  //Locations
  const [selectedLocations, setSelectedLocations] = useState([]);
  const locations = [
    'tsafon',
    'darom',
    'mercaz'
  ];
  const handleLocationChange = (newLocationSelection) => {
    setSelectedLocations(newLocationSelection);
    //call filter function
  };
  //Keys
  //fetch keys when ready
  const keys = [
    'עזרא לזולת',
    'עבודה חקלאית',
    'חלוקת אוכל לחיילים'
  ]  
  const [selectedKeys, setSelectedKeys] = useState([])
  const handleKeyChange = (newKeySelection) => {
    setSelectedKeys(newKeySelection);
    console.log(selectedKeys);
  };
  console.log({selectedKeys,selectedLocations});
  
  useEffect(() => {//get all the jobs 
    fetch('http://127.0.0.1:5000/get', {
      'method': 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => {
      setFilteredOrganizations(data)
      setOrganizations(data)
    })
    .catch(error => console.log(error))

  },[])
  useEffect(()=>{
    console.log('foo');
    //filter the organizations
    if (selectedKeys.length !== 0){
        const newFilteredOrganizations = organizations.filter(organization => selectedKeys.includes(organization.title))
        setFilteredOrganizations(newFilteredOrganizations)

      } else {
        setFilteredOrganizations(organizations)
      }
    
  },[selectedKeys,selectedLocations, organizations])

  const editOrganization = (organization) => {
    setEditedOrganization(organization)
  }

  const updatedData = (organization) => {
    console.log(organization)
    const new_organization = organizations.map(myOrganization => {
      if(myOrganization.id === organization.id){
        return organization
      } else {
        return myOrganization
      }
    })
    setOrganizations(new_organization)
  }

  const openForm = () => {
    setEditedOrganization({title:'', body:''})
  }

  const addData = (organization) => {
    const new_organizations = [...organizations, organization]
    setOrganizations(new_organizations)
  }

  const deleteOrganization = (organization) => {
    const new_organizations = organizations.filter(myOrganization => {
      if(myOrganization.id === organization.id){
        return false
      } else {
        return true
      }
    })
    setOrganizations(new_organizations)
  }

  const myAcount = () => {
    setEnterAccount(true)
  }

  const login = () => {
    console.log('login');

  }

  const signUp = () => {
    setSignUpForm(true)
  }
  


  return (
    <div className="App">
      <div className='row'>
        <div className='col'>
          <h1>Flask and ReactJs</h1>
        </div>
        { isLoggedIn && <div className='col'>
          <button 
          className='btn btn-success mt-3'
          onClick={openForm}
          >Add Organization</button>
        </div>}

        { signUpForm && <SignUp/>}

        <div className='col'>
          <button className='btn btn-success mt-3' onClick={myAcount}>
          My Account
          </button>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <CheckboxSelect
        options={locations}
        selectedOptions={selectedLocations}
        onChange={handleLocationChange}
      />
      <CheckboxSelect
        options={keys}
        selectedOptions={selectedKeys}
        onChange={handleKeyChange}
      />
      </div>
      <Organizations organizations= {filteredOrganizations} editOrganization = {editOrganization} deleteOrganization = {deleteOrganization}/>

      {editedOrganization ? (
        <Form organization = {editedOrganization} updatedData = {updatedData} addData = {addData}/>
        ): null}

      {enterAcount ? (
        <LoginOption login = {login} signUp = {signUp}/>
      ):null
      }
      
    </div>
  );
}

export default App;
