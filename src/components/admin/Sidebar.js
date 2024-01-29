import React,{Fragment,useEffect,useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple,faIdCard,faRightFromBracket,faGear, faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import CloseIcon from '../reusable/CloseIcon';
import { useNavigate} from 'react-router-dom';
import {deleteData} from '../../store/Store'
import { get } from '../../http/api';
import Loading from '../reusable/Loading';
import noImgss from '../../no-image.png'

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
    if (itemText===""){
      itemText="Mon compte"
    }
    console.log(itemText)
     setTitle(itemText)
     updateTitle(itemText)
     localStorage.setItem("title", itemText);
  };

  const fullName = showPers.fullname;

  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  };


  useEffect(() => {
    const fetchCardData = async() => {
      try {
        const id_user = localStorage.getItem("id_user");
        const response = await get('users/'+id_user);
        setShowPers(response.data);
        // setImagePic(`http://localhost:5000/api/uploads/${response.data.image}`);
        setImagePic(response.data.image ? `http://localhost:5000/api/uploads/${response.data.image}` : noImgss);
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
          {isLoading ? 
            <Loading/>
              :
              <>
                {/* <img src={imagePic} className='sidebar-image-account' alt={getInitials(fullName)} /> */}
                <img src={imagePic} className='sidebar-image-account' />

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
            <FontAwesomeIcon icon={faNoteSticky} className={'icon-sidebar-item '+(title==="Notes"?"selected-icon":"")} />
            <p className={'sidebar-text '+(title==="Notes"?"selected-text":"")}>Notes</p>
          </div>
          <div className="sidebar-item" onClick={handleItemClick}>
            <FontAwesomeIcon icon={faGear} className={'icon-sidebar-item '+(title==="Paramètres"?"selected-icon":"")} />
            <p className={'sidebar-text '+(title==="Paramètres"?"selected-text":"")}>Paramètres</p>
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
