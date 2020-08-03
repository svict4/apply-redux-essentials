import React from "react";
import { useForm } from "react-hook-form";

import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";

import updateAction from "../actions/updateAction";
import TextFieldWithErrors from "../../components/TextFieldWithErrors";
import BottomNavigation from "../components/BottomNavigation";

import { Typography, Container, Grid } from "@material-ui/core";
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
    otherName: yup.string().notRequired()
  })
});

const Names = props => {
  const { state, action } = useStateMachine(updateAction, {
    debugName: "names"
  });
  const [isSubmitting, setisSubmitting] = React.useState(false);

  const { register, handleSubmit, watch, errors } = useForm({
    validationSchema: NamesSchema,
    defaultValues: { ...state.data }
  });
  const watchFirstName = watch("person.firstName");

  const onSubmit = data => {
    setisSubmitting(!isSubmitting);
    setTimeout(() => {
      setisSubmitting(isSubmitting => !isSubmitting);
    }, 10000);
    action({ postedFrom: props.location.pathname.substring(1), ...data });
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
        {/* <FormControl fullWidth margin="normal">
          <InputLabel>Title</InputLabel>
          <Controller
            name="person.title"
            defaultValue="Dr"
            control={control}
            as={
              <Select disabled>
                <MenuItem value="Dr">Dr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
                <MenuItem value="Ms">Ms</MenuItem>
                <MenuItem value="Miss">Miss</MenuItem>
                <MenuItem value="Mr">Mr</MenuItem>
              </Select>
            }
          />
        </FormControl> */}

        <TextFieldWithErrors
          name="person.title"
          errors={errors}
          inputRef={register}
          margin="normal"
          fullWidth
          disabled
          value="Dr"
          label="Title"
        />

        <TextFieldWithErrors
          name="person.firstName"
          errors={errors}
          inputRef={register}
          margin="normal"
          spellCheck={false}
          autoComplete="given-name"
          fullWidth
          label="First name"
        />

        <TextFieldWithErrors
          errors={errors}
          inputRef={register}
          margin="normal"
          spellCheck={false}
          fullWidth
          label="Middle name"
          name="person.middleName"
        />

        <TextFieldWithErrors
          errors={errors}
          inputRef={register}
          margin="normal"
          spellCheck={false}
          autoComplete="family-name"
          fullWidth
          label="Last name"
          name="person.lastName"
        />

        <TextFieldWithErrors
          errors={errors}
          inputRef={register}
          margin="normal"
          fullWidth
          id="person.preferredName"
          label="Preferred name"
          name="person.preferredName"
          helperText={
            watchFirstName && `If you don't usually go by '${watchFirstName}'`
          }
        />

        <TextFieldWithErrors
          errors={errors}
          inputRef={register}
          margin="normal"
          fullWidth
          id="person.otherName"
          label="Other names known by"
          name="person.otherName"
          helperText="All other names e.g. maiden/married name"
        />

        <BottomNavigation disabled={isSubmitting} />
      </form>
    </Container>
  );
};

export default withRouter(Names);
