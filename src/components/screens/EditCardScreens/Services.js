import React, { useEffect } from 'react'
import { del, get } from '../../../http/api'
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import ModalServices from './ModalServices';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loading from '../../reusable/Loading';

function NoDataComp() {
  return <div> Vous n'avez pas encore de services à afficher </div>;
};

const Services = ({id_card}) => {

  const [data, setData] = useState([])
  const [modalServices, setModalServices] = useState(false);

  const [isLoading, setIsLoading] = useState(true)



  const handleAddService = () => {
    setModalServices(true);
  };


  const handleDeleteService = async (id) => {
    try {
      const id_user = localStorage.getItem('id_user')
      const response = await del(`services/${id_user}/${id}`, { id_user: id_user });
      toast.success("Le service a été bien supprimé")
      console.log(response)
      fetchData();
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };


    const fetchData = async () => {
      try {
        const response = await get(`services/${id_card}`);
        const servicesData = Array.isArray(response.data) ? response.data : [response.data];
        setData(servicesData);
        console.log(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
  
  useEffect(() => {
    fetchData();
  },[modalServices])

    const updateData = (newService) => {
      setData((prevData) => [...prevData, newService]);
    };

    const columns = [
      {
        name: "Nom du service",
        selector: item => item.name,
      },
      {
        name: "Description du service",
        selector: item => item.description
      },
      {
        name: "action",
        cell: item => (
          <div className='delete-service-icon'>
            <FaTrash size={20} color='#dc3545' onClick={() => handleDeleteService(item.id)} />
          </div>
        )
      }
    ]

    const customStyles = {
      rows: {
        style: {
          backgroundColor: `var(--bg-300)`,
          color: `var(--text-100)`
        },
      },
      headCells: {
        style: {
          backgroundColor: `var(--bg-300)`,
          color: `var(--text-100)`
        },
      },
    };

    
    // const customTitle = (
    //   <div className='services-react-data-table'>
    //         <button onClick={() => handleAddService()}> Ajouter un service </button>
    //     </div>
    // );

  


  return (
    <div className='services-card'>
        <div className='services-card-body'>
          <h2> Liste des services ajoutés </h2>
          <div className='services-react-data-table'>
            <button onClick={() => handleAddService()}> Ajouter un service </button>
        </div>
          {isLoading ?
            <Loading/> 
            :
            <DataTable
              // title={customTitle}
              columns={columns}
              data={data}
              noDataComponent={<NoDataComp/>}
              customStyles={customStyles}
            />
          }
        </div>

        {modalServices && <ModalServices updateData={updateData} setModalServices={setModalServices} id_card={id_card} />}
    </div>
  )
}

export default Services