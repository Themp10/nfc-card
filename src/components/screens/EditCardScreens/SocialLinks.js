import React from 'react'
import { FaInstagram, FaTwitter, FaFacebook, FaReddit, FaYoutube, FaLinkedin, FaWhatsapp, FaPinterest, FaTiktok, } from 'react-icons/fa'
import { CgWebsite } from 'react-icons/cg';

const SocialLinks = ({handleEditSubmit, handleEditInputChange, editedCard}) => {




  return (
    <div className='social-links-card'>
      <div className='social-links-card-body'>
        
          <div className='social-links-rows'>
            <div className='social-links-column'>
              <div className='social-links-row-added'>
                <div className='social-links-icon'>
                  <CgWebsite size={30} />
                </div>
                <div className='social-links-input'>
                  <input className='social-links-form-controller' onChange={handleEditInputChange} value={editedCard.website} type='text' placeholder='' name='website' />
                </div>
              </div>
            </div>
          </div>

          <div className='social-links-rows'>
            <div className='social-links-column'>
              <div className='social-links-row-added'>
                <div className='social-links-icon'>
                  <FaInstagram size={30} />
                </div>
                <div className='social-links-input'>
                  <input className='social-links-form-controller' onChange={handleEditInputChange} value={editedCard.instagram} type='text' placeholder='' name='instagram' />
                </div>
              </div>
            </div>
          </div>

          <div className='social-links-rows'>
            <div className='social-links-column'>
              <div className='social-links-row-added'>
                <div className='social-links-icon'>
                  <FaTwitter size={30} />
                </div>
                <div className='social-links-input'>
                  <input className='social-links-form-controller' onChange={handleEditInputChange} value={editedCard.twitter} type='text' placeholder='' name='twitter' />
                </div>
              </div>
            </div>
          </div>

          <div className='social-links-rows'>
            <div className='social-links-column'>
              <div className='social-links-row-added'>
                <div className='social-links-icon'>
                  <FaFacebook size={30} />
                </div>
                <div className='social-links-input'>
                  <input className='social-links-form-controller' onChange={handleEditInputChange} value={editedCard.facebook} type='text' placeholder='' name='facebook' />
                </div>
              </div>
            </div>
          </div>

          <div className='social-links-rows'>
            <div className='social-links-column'>
              <div className='social-links-row-added'>
                <div className='social-links-icon'>
                  <FaReddit size={30} />
                </div>
                <div className='social-links-input'>
                  <input className='social-links-form-controller' onChange={handleEditInputChange} value={editedCard.reddit} type='text' placeholder='' name='reddit' />
                </div>
              </div>
            </div>
          </div>

          <div className='social-links-rows'>
            <div className='social-links-column'>
              <div className='social-links-row-added'>
                <div className='social-links-icon'>
                  <FaYoutube size={30} />
                </div>
                <div className='social-links-input'>
                  <input className='social-links-form-controller' onChange={handleEditInputChange} value={editedCard.youtube} type='text' placeholder='' name='youtube' />
                </div>
              </div>
            </div>
          </div>

          <div className='social-links-rows'>
            <div className='social-links-column'>
              <div className='social-links-row-added'>
                <div className='social-links-icon'>
                  <FaLinkedin size={30} />
                </div>
                <div className='social-links-input'>
                  <input className='social-links-form-controller' onChange={handleEditInputChange} value={editedCard.linkedin} type='text' placeholder='' name='linkedin' />
                </div>
              </div>
            </div>
          </div>

          <div className='social-links-rows'>
            <div className='social-links-column'>
              <div className='social-links-row-added'>
                <div className='social-links-icon'>
                  <FaWhatsapp size={30} />
                </div>
                <div className='social-links-input'>
                  <input className='social-links-form-controller' onChange={handleEditInputChange} value={editedCard.whatsapp} type='text' placeholder='' name='whatsapp' />
                </div>
              </div>
            </div>
          </div>

          <div className='social-links-rows'>
            <div className='social-links-column'>
              <div className='social-links-row-added'>
                <div className='social-links-icon'>
                  <FaPinterest size={30} />
                </div>
                <div className='social-links-input'>
                  <input className='social-links-form-controller' onChange={handleEditInputChange} value={editedCard.pinterrest} type='text' placeholder='' name='pinterrest' />
                </div>
              </div>
            </div>
          </div>

          <div className='social-links-rows'>
            <div className='social-links-column'>
              <div className='social-links-row-added'>
                <div className='social-links-icon'>
                  <FaTiktok size={30} />
                </div>
                <div className='social-links-input'>
                  <input className='social-links-form-controller' onChange={handleEditInputChange} value={editedCard.tiktok} type='text' placeholder='' name='tiktok' />
                </div>
              </div>
            </div>
          </div>

          <div className='social-links-buttons'>
            <button onClick={handleEditSubmit} className='social-links-buttons-save'>
              Sauvegarder
            </button>
            <button className='social-links-buttons-cancel'>
              Annuler
            </button>
          </div>

      </div>
    </div>

  )
}

export default SocialLinks