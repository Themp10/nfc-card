import React, { useEffect } from 'react'
import { del, get } from '../../../http/api'
import axios from 'axios';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import ModalServices from './ModalServices';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function NoDataComp() {
  return <div> Vous n avez pas encore de services a afficher </div>;
};

const Services = ({id_card}) => {

  const [data, setData] = useState([])
  const [modalServices, setModalServices] = useState(false);
  const [maxServicesCount, setMaxServicesCount] = useState(4);


  const handleAddService = () => {
    setModalServices(true);

    // if (maxServicesCount > 0) {
    // } else {
    //   alert('Services maximum atteint pour cette carte.');
    // }
  };


  const handleDeleteService = async (id) => {
    try {
      const response = await del(`services/${id}`);
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
        setData(response.data);
        
        const remainingCount = 4 - response.data.length;
        setMaxServicesCount(remainingCount);
      } catch (error) {
        console.error(error);
      }
    };
  
  useEffect(() => {
    fetchData();
  }, [])

    const updateData = (newService) => {
      setData((prevData) => [...prevData, newService]);
    };

    const columns = [
      {
        name: "Nom du service",
        selector: item => item.name
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


    const customTitle = (
      <div className='services-react-data-table'>
        <h3> Liste des services ajoutés </h3>
            <button onClick={() => handleAddService()}> Ajouter un service </button>
        </div>
    );


  return (
    <div className='services-card'>
        <div className='services-card-body'>
          {/* <h2> Liste des services ajoutés </h2> */}
          <DataTable
            title={customTitle}
            columns={columns}
            data={data}
            noDataComponent={<NoDataComp/>}
          />
        </div>

        {modalServices && <ModalServices updateData={updateData} setModalServices={setModalServices} id_card={id_card} />}
    </div>
  )
}

export default Services