import React, { useState } from "react";
import Modal from "react-modal";

function HACSModal(props) {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  React.useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen}>
        <button onClick={close}>x</button>
        {props.children}
      </Modal>
    </>
  );
}
export default HACSModal;
