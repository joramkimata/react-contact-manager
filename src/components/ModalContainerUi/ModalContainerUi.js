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
  footer,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <>
      <Modal
        title={title}
        open={visible}
        footer={null}
        style={top}
        onCancel={onCancel}
        width={width}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {children}
          {footer}
        </form>
      </Modal>
    </>
  );
};

export default ModalContainerUi;
