import React from 'react'
import "./TemplatesSection.css"
import ModalImage from "../Modals/ModalImage"
import first_one from "../../Assets/theme1_image_profile.png"
import second_one from '../../Assets/theme2_image_profile.png'
import third_one from '../../Assets/theme3_image_profile.png'
import fourth_one from '../../Assets/theme4_image_profile.png'
import fifth_one from '../../Assets/theme5_image_profile.png'
import sixth_one from '../../Assets/theme6_image_profile.png'


const TemplatesSection = () => {
  return (
    <div className='wb-templates-container' id='third-div'>
         <div className='wb-templates-content'>
            <h2 style={{ textAlign: 'center', paddingTop: "50px" }}> Explorez nos modèles pré-construits  </h2>
            <div className='wb-templates-images'>
                <div className='wb-templates-line'>
                    <ModalImage src={first_one} />
                    <ModalImage src={second_one} />
                    <ModalImage src={third_one} />
                    <ModalImage src={fourth_one} />
                    <ModalImage src={fifth_one} />
                    <ModalImage src={sixth_one} />
                </div>
            </div>
         </div>
    </div>
  )
}

export default TemplatesSection