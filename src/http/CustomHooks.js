import { useEffect, useState } from 'react';
import { get } from './api'
import { useParams } from 'react-router-dom';
import noImage from '../no-image.png'


export const useUserData = () => {
    const [userData, setUserData] = useState({});
    const [imageUrl, setImageUrl] = useState('');
  
    const { id_card } = useParams();
    const extractedNumber = id_card.split('-')[1];
  
    const fetchUserData = async () => {
      try {
        const response = await get(`cards/card/${extractedNumber}`);
        setUserData(response.data);
        console.log(extractedNumber);
        setImageUrl(response.data.photo ? `http://localhost:5000/api/uploads/${response.data.photo}` : noImage);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    useEffect(() => {
      fetchUserData();
    }, []);
  
    return { userData, imageUrl };
};

export const useGalleryData = () => {
  const [galleryData, setGalleryData] = useState([]);

  const { id_card } = useParams();
  const extractedNumber = id_card.split('-')[1];

  const fetchGalleryData = async () => {
    try {
      const response = await get(`galerie/${extractedNumber}`);
      const galerieData = Array.isArray(response.data) ? response.data : [response.data];
      setGalleryData(galerieData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGalleryData();
  }, []);

  return galleryData;
};

export const useServiceData = () => {
    const [data, setData] = useState({});

    const { id_card } = useParams();
    const extractedNumber = id_card.split('-')[1];
  
    const fetchData = async () => {
      try {
        const response = await get(`services/${extractedNumber}`);
        const user = response.data;
        setData(user);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return data;
};

export const useHoursData = () => {
  const [hoursData, setHoursData] = useState({});

  const { id_card } = useParams();
  const extractedNumber = id_card.split('-')[1];

  const fetchData = async () => {
    try {
      const response = await get(`bs_hours/${extractedNumber}`);
      const user = response.data;
      setHoursData(user);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return hoursData;
};



