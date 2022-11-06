import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

import * as Yup from "yup";
import Input from "../Input/Input";
import ModalContainerUi from "../ModalContainerUi/ModalContainerUi";
import ModalFooterUi from "../ModalFooterUi/ModalFooterUi";

const ChangePasswordUi = ({
  isChangPass,
  opened,
  setOpened,
  handlePasswordChangex,
}) => {
  const formSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const handlePasswordChange = (data) => {
    handlePasswordChangex(data);
  };

  return (
    <>
      <ModalContainerUi
        top={200}
        onCancel={() => setOpened(false)}
        visible={opened}
        handleSubmit={handleSubmit}
        onSubmit={handlePasswordChange}
        title={`Change Password`}
        footer={<ModalFooterUi onCancel={() => null} loading={isChangPass} />}
      >
        <Input
          errors={errors}
          label="Password"
          type="password"
          name="password"
          register={register}
        />
        <Input
          errors={errors}
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          register={register}
        />
      </ModalContainerUi>
    </>
  );
};

export default ChangePasswordUi;
