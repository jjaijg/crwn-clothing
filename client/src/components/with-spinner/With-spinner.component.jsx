import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./With-spinner.styles";

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  console.log("isLoading : ", isLoading);
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer></SpinnerContainer>
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
