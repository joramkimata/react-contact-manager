import { Modal } from "antd";
import React from "react";

import "./ModalContainerUi.css";

const ModalContainerUi = ({
    title,
    onCancel,
    visible,
    children,
    reset = null,
    top = {
      top: 20,
    },
    width,
  }) => {
    return (
      <>
        <Modal
          title={title}
          visible={visible}
          footer={null}
          style={top}
          onCancel={onCancel}
          width={width}
        >
          {children}
        </Modal>
      </>
    );
  };
  
  export default ModalContainerUi;