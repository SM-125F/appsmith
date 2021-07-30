import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import DataCollectionForm from "./DataCollectionForm";
import DetailsForm from "./DetailsForm";
import NewsletterForm from "./NewsletterForm";
import AppsmithLogo from "assets/images/appsmith_logo.png";
import {
  WELCOME_FORM_COMPANY_FIELD_NAME,
  WELCOME_FORM_EMAIL_FIELD_NAME,
  WELCOME_FORM_NAME,
  WELCOME_FORM_NAME_FIELD_NAME,
  WELCOME_FORM_PASSWORD_FIELD_NAME,
  WELCOME_FORM_ROLE_FIELD_NAME,
  WELCOME_FORM_VERIFY_PASSWORD_FIELD_NAME,
} from "constants/forms";
import { formValueSelector, InjectedFormProps, reduxForm } from "redux-form";
import { isEmail, isStrongPassword, isValidFullName } from "utils/formhelpers";
import { AppState } from "reducers";
import { SUPER_USER_SUBMIT_PATH } from "constants/ApiConstants";

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SetupFormContainer = styled.div`
  width: 496px;
  padding-top: 120px;
`;

const LogoContainer = styled.div`
  padding-left: ${(props) => props.theme.spaces[17] * 2}px;
  padding-top: ${(props) => props.theme.spaces[12] * 2}px;
  transform: translate(-11px, 0);
  background-color: ${(props) => props.theme.colors.homepageBackground};
  position: fixed;
  width: 496px;
  height: 112px;
  z-index: 1;
  top: 0;
`;

const AppsmithLogoImg = styled.img`
  max-width: 160px;
`;

const SpaceFiller = styled.div`
  height: 100px;
`;

type DetailsFormValues = {
  fullName?: string;
  email?: string;
  password?: string;
  verifyPassword?: string;
  role?: string;
  company?: string;
};

const validate = (values: DetailsFormValues) => {
  const errors: DetailsFormValues = {};
  if (!values.fullName || !isValidFullName(values.fullName)) {
    errors.fullName = "Please enter a valid Full Name";
  }

  if (!values.email || !isEmail(values.email)) {
    errors.email = "Please enter a valid Email address";
  }

  if (!values.password || !isStrongPassword(values.password)) {
    errors.password = "Please enter a strong password";
  }

  if (!values.verifyPassword || values.password != values.verifyPassword) {
    errors.verifyPassword = "Please reenter the password";
  }

  if (!values.role) {
    errors.role = "Please select a role";
  }

  return errors;
};

function SetupForm(props: InjectedFormProps & DetailsFormValues) {
  const { valid } = props;
  const signupURL = `/api/v1/${SUPER_USER_SUBMIT_PATH}`;
  const onSubmit = () => {
    const form: HTMLFormElement = document.querySelector(
      "#super-user-form",
    ) as HTMLFormElement;
    const verifyPassword: HTMLInputElement = document.querySelector(
      `[name="verify_password"]`,
    ) as HTMLInputElement;
    const input = document.createElement("input");
    verifyPassword.removeAttribute("name");
    input.type = "text";
    input.name = "role";
    input.value = props.role as string;
    form.appendChild(input);
    return true;
  };

  return (
    <PageWrapper>
      <SetupFormContainer>
        <LogoContainer>
          <AppsmithLogoImg alt="Appsmith logo" src={AppsmithLogo} />
        </LogoContainer>
        <form
          action={signupURL}
          id="super-user-form"
          method="POST"
          onSubmit={onSubmit}
        >
          <DetailsForm />
          <DataCollectionForm />
          <NewsletterForm invalid={!valid} />
        </form>
        <SpaceFiller />
      </SetupFormContainer>
    </PageWrapper>
  );
}

const selector = formValueSelector(WELCOME_FORM_NAME);
export default connect((state: AppState) => {
  return {
    fullName: selector(state, WELCOME_FORM_NAME_FIELD_NAME),
    email: selector(state, WELCOME_FORM_EMAIL_FIELD_NAME),
    password: selector(state, WELCOME_FORM_PASSWORD_FIELD_NAME),
    verify_password: selector(state, WELCOME_FORM_VERIFY_PASSWORD_FIELD_NAME),
    role: selector(state, WELCOME_FORM_ROLE_FIELD_NAME),
    company: selector(state, WELCOME_FORM_COMPANY_FIELD_NAME),
  };
}, null)(
  reduxForm<DetailsFormValues>({
    validate,
    form: WELCOME_FORM_NAME,
    touchOnBlur: true,
  })(SetupForm),
);
