import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { del, get } from '../../../http/api'
import { FaTrash } from 'react-icons/fa';
import ModalGallery from './ModalGallery'



const Galerie = ({id_card}) => {

  const [openGallery, setOpenGallery] = useState(false)  
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    image: null
  });

  const handleGalerieChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0], 
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

    const handleGalerieSubmit = async (e) => {
        e.preventDefault();
        try {
            const id_user = localStorage.getItem("id_user");
            const insertData = new FormData();
    
            insertData.append('id_user', id_user);
            insertData.append('id_card', id_card);

            insertData.append('image', formData.image);
            await axios.post('http://localhost:5000/api/galerie', insertData);
            fetchData();
            toast.success("L'image a été bien ajoutée")
            setOpenGallery(false)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        try {
        const response = await get(`galerie/${id_card}`);
        const galerieData = Array.isArray(response.data) ? response.data : [response.data];
        setData(galerieData);
        console.log(response.data)
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    },[])

    const openAddPicture = () => {
        setOpenGallery(true);
    }

    const handleGalerieDelete = async (id) => {
        try {
          const id_user = localStorage.getItem('id_user')
          await del(`galerie/${id_user}/${id}`, { id_user: id_user });
          toast.success("L'image a été bien supprimée")
          fetchData();
        } catch (error) {
          console.error('Error deleting card:', error);
        }
      };


  return (
    <div>
        <div>
            <div className='container-gallery'>
                  <div style={{ float:'right',   }}>
                      <button onClick={openAddPicture} className='add-service-button'> Ajouter une image </button>
                  </div>
                {data.length > 0 &&(
                    <>
                        <div className='image-gallery'>
                            {data.map((galerie, index) => (
                                    <div className='gallery-item' key={index}>
                                        <img src={`http://localhost:5000/api/uploads/${galerie.image}`} alt='gallery' className='gallery-image' />
                                        <div className='delete-icon' onClick={() => handleGalerieDelete(galerie.id)}>
                                            <FaTrash size={20} color='#dc3545'/>
                                        </div>
                                    </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
        {openGallery && <ModalGallery handleGalerieChange={handleGalerieChange} handleGalerieSubmit={handleGalerieSubmit} setOpenGallery={setOpenGallery} />}
    </div>
  )
}

export default Galerie