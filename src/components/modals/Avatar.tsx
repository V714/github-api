import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import { listElement } from "../interfaces/interfaces";

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

interface Props {
    user: listElement,
    isModalOpen: boolean,
    openModal: () => void,
    closeModal: () => void
}

const customStyles = {
    content: {
      boxShadow: '0px 4px 10px 2px #0002',
      border: 'unset',
      borderRadius: '20px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export const Avatar: React.FC<Props> = (props) => {


    return(
        <>
            <Modal
                isOpen={props.isModalOpen}
                onRequestClose={props.closeModal}
                style={customStyles}
                contentLabel="Modal"
                closeTimeoutMS={300}
            >
                <div className="modal">
                    <div className="modal-title">{props.user.username}</div>
                    <img className="modal-photo" src={props.user.avatar}/>
                    <button className="modal-button" onClick={props.closeModal}>zamknij</button>
                </div>
            </Modal>
        </>
    )
}