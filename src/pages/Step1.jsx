import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import MainContainer from "../components/MainContainer";
import Form from "../components/Form";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First Name should not contain numbers")
    .required("First Name is a required field"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last Name should not contain numbers")
    .required("Last Name is a required field"),
});

const Step1 = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    navigate("/step2");
  };
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("firstName")}
          id="firstName"
          type="text"
          label="First Name"
          name="firstName"
          error={!!errors?.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          {...register("lastName")}
          id="lastName"
          type="text"
          label="Last Name"
          name="lastName"
          error={!!errors?.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step1;
