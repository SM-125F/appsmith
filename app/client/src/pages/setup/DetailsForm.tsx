import React, { memo } from "react";
import styled from "styled-components";
import {
  Field,
  WrappedFieldInputProps,
  WrappedFieldMetaProps,
} from "redux-form";
import { useState } from "react";
import {
  FormBodyWrapper,
  FormHeaderIndex,
  FormHeaderLabel,
  FormHeaderWrapper,
} from "./common";
import Dropdown from "components/ads/Dropdown";
import StyledFormGroup from "components/ads/formFields/FormGroup";
import { createMessage } from "constants/messages";
import FormTextField, {
  FormTextFieldProps,
} from "components/ads/formFields/TextField";

const DetailsFormWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-left: ${(props) => props.theme.spaces[17] * 2}px;
  padding-right: ${(props) => props.theme.spaces[4]}px;
`;

const StyledFormBodyWrapper = styled(FormBodyWrapper)`
  width: 260px;
`;

const RoleDropdownWrapper = styled(StyledFormGroup)`
  && {
    margin-bottom: 33px;
  }
  && .cs-text {
    width: 100%;
  }
`;

function Fieldropdown(
  ComponentProps: FormTextFieldProps & {
    meta: Partial<WrappedFieldMetaProps>;
    input: Partial<WrappedFieldInputProps>;
  },
) {
  function onSelect(value?: string, option: options = {}) {
    ComponentProps.input.onChange && ComponentProps.input.onChange(value);
    ComponentProps.input.onBlur && ComponentProps.input.onBlur(value);
    setSelected(option);
  }

  const [selected, setSelected] = useState<options>({});

  return (
    <Dropdown
      onSelect={onSelect}
      options={roleOptions}
      selected={selected}
      showLabelOnly
      width="260px"
    />
  );
}

export default memo(function DetailsForm() {
  const ref = React.createRef<HTMLDivElement>();

  return (
    <DetailsFormWrapper ref={ref}>
      <FormHeaderWrapper>
        <FormHeaderIndex>1/3</FormHeaderIndex>
        <FormHeaderLabel>What should we call you?</FormHeaderLabel>
      </FormHeaderWrapper>
      <StyledFormBodyWrapper>
        <StyledFormGroup label={createMessage(() => "FULL NAME")}>
          <FormTextField autoFocus name="name" placeholder="" type="text" />
        </StyledFormGroup>
        <StyledFormGroup label={createMessage(() => "EMAIL ID")}>
          <FormTextField name="email" placeholder="" type="email" />
        </StyledFormGroup>
        <StyledFormGroup label={createMessage(() => "CREATE PASSWORD")}>
          <FormTextField name="password" placeholder="" type="password" />
        </StyledFormGroup>
        <StyledFormGroup label={createMessage(() => "VERIFY PASSWORD")}>
          <FormTextField
            name="verify_password"
            placeholder=""
            type="password"
          />
        </StyledFormGroup>
        <RoleDropdownWrapper
          label={createMessage(() => "WHAT ROLE DO YOU PLAY?")}
        >
          <Field
            asyncControl
            component={Fieldropdown}
            name="role"
            placeholder=""
            type="text"
          />
        </RoleDropdownWrapper>
        <StyledFormGroup label={createMessage(() => "COMPANY NAME(OPTIONAL)")}>
          <FormTextField name="companyName" placeholder="" type="text" />
        </StyledFormGroup>
      </StyledFormBodyWrapper>
    </DetailsFormWrapper>
  );
});

type options = {
  label?: string;
  value?: string;
};

const roleOptions: options[] = [
  {
    label: "Engineer",
    value: "engineer",
  },
  {
    label: "Product manager",
    value: "product_manager",
  },
  {
    label: "Founder",
    value: "founder",
  },
  {
    label: "Operations",
    value: "operations",
  },
  {
    label: "Business Analyst",
    value: "business_analyst",
  },
];
