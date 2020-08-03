import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, TextField } from "@material-ui/core";
import { Person } from "./agptSlice";
import BottomNavigation from "../../components/BottomNavigation";
import * as yup from "yup";

const NamesSchema = yup.object().shape({
  person: yup.object().shape({
    title: yup.string().required("Required"),
    firstName: yup
      .string()
      .max(50, "Must be less than 50 characters")
      .required("Required"),
    middleName: yup
      .string()
      .max(50, "Must be less than 50 characters")
      .notRequired(),
    lastName: yup
      .string()
      .max(50, "Must be less than 50 characters")
      .required("Required")
      .matches(/^[A-Za-z\s-]+$/, "Letters, spaces and hypens only"),
    preferredName: yup.string().notRequired(),
    otherName: yup.string().notRequired(),
  }),
});

const Names = (props) => {
  const dispatch = useDispatch();
  const person = useSelector((state) => state.login.person);
  const { register, handleSubmit, watch, errors } = useForm({
    validationSchema: NamesSchema,
    defaultValues: { person },
  });
  const watchFirstName = watch("person.firstName");

  const onSubmit = (data) => {
    dispatch(Person(data));
    // action({ postedFrom: props.location.pathname.substring(1), ...data });
  };

  return (
    <Container component="main" maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" component="h1" color="primary">
        Hi{" "}
        <span style={{ textTransform: "capitalize" }}>
          {watchFirstName ? watchFirstName : "Stranger"}
        </span>
        , let's double check your details
      </Typography>

      <div className="info-box">
        Please ensure your first, middle, and last names are as per your medical
        registration
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="person.title"
          label="Title"
          value="Dr"
          inputRef={register}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          disabled
        />

        <TextField
          name="person.firstName"
          label="First name"
          inputRef={register}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          disabled
        />

        <TextField
          name="person.middleName"
          label="Middle name"
          inputRef={register}
          spellCheck={false}
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <TextField
          name="person.lastName"
          label="Last name"
          inputRef={register}
          spellCheck={false}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          disabled
        />

        <TextField
          inputRef={register}
          error={typeof errors?.person?.password != "undefined"}
          helperText={
            errors?.person?.password?.message ||
            "All other names e.g. maiden/married name"
          }
          label="Preferred name"
          name="person.preferredName"
          spellCheck={false}
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <TextField
          inputRef={register}
          error={typeof errors?.person?.otherName != "undefined"}
          helperText={
            errors?.person?.otherName?.message ||
            "All other names e.g. maiden/married name"
          }
          label="Other names known by"
          name="person.otherName"
          spellCheck={false}
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <BottomNavigation />
      </form>
    </Container>
  );
};

export default withRouter(Names);
