import React, { useState,useEffect } from 'react'
import { get, getImage, patch } from '../../http/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Loading from '../reusable/Loading';
import PasswordModal from './PasswordModal';
import { toast } from 'react-toastify';
import noImgSs from '../../no-image.png';
import axios from 'axios';


const Settings = () => {
  const [loading,setLoading]=useState(true)
  const [file, setFile] = useState("");
  const [userData, setUserData] = useState({
    fullname: '',
    image: null,
  });
  const [openPassModal, setOpenPassModal] = useState(false)
  // const [formData, setFormData] = useState(new FormData());

  const handleValueChange = (e) => {
    if (e.target.name === "image") {
      const selectedFile = e.target.files[0];
      setUserData({
              ...userData,
              [e.target.name]: e.target.files[0],
            });
      setFile(URL.createObjectURL(selectedFile));
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  // const handleValueChange = (e) => {
  //   if (e.target.name === 'image') {
  //     setUserData({
  //       ...userData,
  //       [e.target.name]: e.target.files[0],
  //     });
  //     console.log(e.target.files[0])
  //   } else {
  //     setUserData({
  //       ...userData,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // };


  // const handleValueChange = (e) => {
  //   const { name, value, files } = e.target;
  
  //   if (name === "image") {
  //     const selectedFile = files[0];
  //     setFile(URL.createObjectURL(selectedFile));
  //     setImageFile(selectedFile);
  //     formData.append(name, selectedFile);
  //   } else {
  //     setUserData({ ...userData, [name]: value });
  //     formData.append(name, value);
  //   }
  // };
 
 
  const openModalPass = () => {
    setOpenPassModal(true)
  }

  const closeModalPass = () => {
    setOpenPassModal(false)
  }

  // const editSettings = async () => {
  //   try {
  //     const id_user = localStorage.getItem("id_user");
  //     // const formData = new FormData();
  
  //     // formData.append("fullname", userData.fullname);
  //     // formData.append("image", imageFile);
  //     console.log(formData)
  
  //     const response = await patch('users/user/' + id_user, formData);
  
  //     toast.success("Vos données ont été mises à jour");
  //     console.log(response);
  //   } catch (error) {
  //     console.error('Error updating data:', error);
  //   }
  // };

  const editSettings = async () => {
    try {
      const id_user = localStorage.getItem("id_user");
      const formData = new FormData();


      formData.append("fullname", userData.fullname);
      formData.append("image", userData.image);
  
      const response = await axios.patch('http://localhost:5000/api/users/user/' + id_user, { fullname: userData.fullname, image: userData.image }, { headers: { 'Content-Type': 'multipart/form-data' } }, formData);
  
      toast.success("Vos données ont été mises à jour");
      console.log(response);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };





  useEffect(() => {
    const fetchData = async () => {
      try {
        const id_user = localStorage.getItem("id_user");
        const response = await get('users/'+id_user);
        // const imageData = await getImage(response.data.image);

        const imageData = response.data.image
        ? await getImage(response.data.image)
        : { url: noImgSs };

        setFile(imageData.url)
        setUserData(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); 
  
  }, []);

  return (
    <div className='container'>
      {loading?
      <Loading/>
      :
      <div className="settings-form">
        <div className="settings-data-container">
          <div className="settings-image-container">
              <img src={file} className="settings-image" alt='im' />
              <input type="file" name="image" id="image" accept='image/*' className="inputfile"  onChange={handleValueChange}  hidden/>
              <label htmlFor="image" className="add-image-overlay">
                <FontAwesomeIcon icon={faPlus} className='add-image-button' />
              </label>
          </div>
          <div className="settings-info-container">
            <label htmlFor="fullname">Nom Complet</label>
            <input type="text" id="fullname" name="fullname" className="settings-input"  value={userData.fullname} onChange={handleValueChange}/>

            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" className="settings-input" disabled value={userData.email}/>

            <button onClick={openModalPass} className='changePass'>
              Changer votre mot de passe
            </button>

            {openPassModal && <PasswordModal closeModalPass={closeModalPass} /> }
          </div>
        </div>
        <div className="settings-button-container">
    
          <input type="submit" value="Valider" className="button" onClick={editSettings}/>
          
        </div>
      </div> 
      }
    </div>
  )
}

export default Settings
