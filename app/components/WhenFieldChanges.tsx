import React from "react";
import PropTypes from "prop-types";
import { useForm, useFormState } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import {get} from "lodash";

const WhenFieldChanges = ({ shouldChangeHandler, field, set, to }) => {
  const { values } = useFormState();
  const form = useForm();

  return (
    <OnChange name={field}>
      {() => {
        if (shouldChangeHandler)
          shouldChangeHandler(get(values, field)) &&
            form.change(set, to);
        else form.change(set, to);
      }}
    </OnChange>
  );
};

WhenFieldChanges.propTypes = {
  field: PropTypes.string.isRequired,
  set: PropTypes.string.isRequired,
  shouldChangeHandler: PropTypes.func,
  to: PropTypes.any.isRequired
};
WhenFieldChanges.defaultProps = {};

export default WhenFieldChanges;