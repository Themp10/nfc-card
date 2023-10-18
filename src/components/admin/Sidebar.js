import React,{Fragment,useEffect,useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser,faChartSimple,faIdCard,faList,faRightFromBracket,faGear } from '@fortawesome/free-solid-svg-icons'
import CloseIcon from '../reusable/CloseIcon';
import { useNavigate} from 'react-router-dom';
import {deleteData} from '../../store/Store'
// import { delete} from '../../http/api';
import { get, getImage } from '../../http/api';
import Loading from '../reusable/Loading';
import noImage from "./profile-no-image.png"

const Sidebar = ({updateTitle}) => {
  const [showPers, setShowPers] = useState([])
  const [imagePic, setImagePic] = useState('');

  const [isLoading, setIsLoading] = useState(true)

  const [open,setOpen]=useState(true)
  const [title,setTitle]=useState()
  const navigate = useNavigate();
  useEffect(() => {
    const storedTitle = localStorage.getItem("title");
    setTitle(storedTitle)
  }, []);

  const openSidebar = () => {
    setOpen(!open)
  }
  const handleLogout = () => {
    deleteData("id_user")
    deleteData("token")
    navigate('/login')
  }
  const handleItemClick = (event) => {
    let itemText = event.currentTarget.textContent;
    if (itemText==""){
      itemText="Mon compte"
    }
    console.log(itemText)
     setTitle(itemText)
     updateTitle(itemText)
     localStorage.setItem("title", itemText);
  };


  useEffect(() => {
    const fetchCardData = async() => {
      try {
        const id_user = localStorage.getItem("id_user");
        const response = await get('users/'+id_user);
        setShowPers(response.data);
        setImagePic(`http://ouss.sytes.net:5000/api/uploads/${response.data.image}`);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchCardData();

  },[])


  return (
    <Fragment>
      <div className="closeIcon-container-sidebar">
        <CloseIcon opened={open} openSidebar={openSidebar}/>
      </div>
        
        
      <div className={"sidebar "+(!open?"closed":"")}>

        <div className="sidebar-top">
          {/* <FontAwesomeIcon icon={faCircleUser}  className='icon-fa-user'/> */}
          <FontAwesomeIcon icon={faGear} className='icon-settings' onClick={handleItemClick}/>

          {/* <img src={imagePic} alt='image account' className='sidebar-image-account' />
          <h2 className='sidebar-text'> {showPers.fullname} </h2> */}

          {isLoading ? 
            <Loading/>
              :
              <>
                {/* {imagePic ? (
                  <img src={imagePic} className='sidebar-image-account' alt={showPers.fullname} />
                ) : (
                  <img src={noImage} className='sidebar-image-account'  />
                )} */}
                {/* <img src={imagePic}  className='sidebar-image-account' /> */}
                <img src={imagePic ?  imagePic : noImage} className='sidebar-image-account' alt="&#128100;" />
                <h2 className='sidebar-text'> {showPers.fullname} </h2>
              </>
          }
        
        </div>

        <div className="sidebar-items">
          <div className="sidebar-item" onClick={handleItemClick}>
            <FontAwesomeIcon icon={faChartSimple} className={'icon-sidebar-item '+(title==="Tableau de bord"?"selected-icon":"")} />
            <p className={'sidebar-text '+(title==="Tableau de bord"?"selected-text":"")}>Tableau de bord</p>
          </div>
          <div className="sidebar-item" onClick={handleItemClick}>
            <FontAwesomeIcon icon={faIdCard} className={'icon-sidebar-item '+(title==="Mes cartes"?"selected-icon":"")} />
            <p className={'sidebar-text '+(title==="Mes cartes"?"selected-text":"")}>Mes cartes</p>
          </div>
          <div className="sidebar-item" onClick={handleItemClick}>
            <FontAwesomeIcon icon={faList} className={'icon-sidebar-item '+(title==="Demandes"?"selected-icon":"")} />
            <p className={'sidebar-text '+(title==="Demandes"?"selected-text":"")}>Demandes</p>
          </div>
        </div>

        <div className="sidebar-bottom" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket}  className='icon-fa-user'/>
          <h2 className='sidebar-text'>Se déconnecter</h2>
        </div>
    </div>
    </Fragment>

  )
}

export default Sidebar
