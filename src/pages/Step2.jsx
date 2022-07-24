import React from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Checkbox, FormControlLabel, Typography } from "@mui/material";

import { useData } from "../context/DataContext";

import MainContainer from "../components/MainContainer";
import Form from "../components/Form";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import parsePhoneNumberFromString from "libphonenumber-js";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("* Email should have correct format")
    .required("* Email is a required field"),
  hasPhone: yup.boolean(),
  phoneNumber: yup.string().when("hasPhone", {
    is: true,
    then: yup
      .string()
      .matches(
        /^(\+|00)[1-9][0-9 \-\(\)\.]{7,14}$/gi,
        "* Please enter a valid phone number"
      )
      .required("* Please enter your phone number"),
    otherwise: yup.string().notRequired(),
  }),
});

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) {
    return value;
  }
  return phoneNumber.formatInternational();
};

const Step2 = () => {
  const { data, setValues } = useData();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      email: data.email,
      phoneNumber: data.phoneNumber,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    navigate("/step3");
    setValues(data);
  };
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          type="email"
          name="email"
          label="Email"
          id="email"
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <FormControlLabel
          label="Do you have a phone"
          control={
            <Checkbox
              name="hasPhone"
              {...register("hasPhone")}
              color="primary"
            />
          }
        />
        {hasPhone && (
          <Input
            id="phoneNumber"
            {...register("phoneNumber")}
            name="phoneNumber"
            type="tel"
            label="Phone Number"
            onChange={(e) => {
              e.target.value = normalizePhoneNumber(e.target.value);
            }}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
        )}
        <PrimaryButton disabled={!isValid}>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step2;
