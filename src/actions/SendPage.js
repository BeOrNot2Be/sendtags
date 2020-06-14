/** @format */

export const UPDATE_TAGS = "UPDATE_TAGS";
export const UPDATE_CONFIG = "UPDATE_CONFIG";
export const UPDATE_SEND_TO = "UPDATE_SEND_TO";
export const UPDATE_SEND_TYPE = "UPDATE_SEND_TYPE";
export const UPDATE_SENT = "UPDATE_SENT";

export const SUBMIT_SEND_TAG_DATA = "SUBMIT_SEND_TAG_DATA";

export const SET_ERRORS = "SET_ERRORS";
export const RESET_ERRORS = "RESET_ERRORS";

export const RESET_RECIPIENTS = "RESET_RECIPIENTS";

export const updateTags = (dispatch) => (value) => {
  dispatch({
    type: UPDATE_TAGS,
    send_input: value,
  });
};

export const updateConfig = (dispatch) => (value) => {
  dispatch({
    type: UPDATE_CONFIG,
    send_input: value,
  });
};

export const updateSendTo = (dispatch) => (value) => {
  dispatch({
    type: UPDATE_SEND_TO,
    send_input: value,
  });
};

export const updateSendType = (dispatch) => (value) => {
  dispatch({
    type: UPDATE_SEND_TYPE,
    send_input: value,
  });
};

export const updateSent = (dispatch) => (value) => {
  dispatch({
    type: UPDATE_SENT,
    send_input: value,
  });
};

export const submitSendTagData = (dispatch) => () => {
  dispatch({
    type: SUBMIT_SEND_TAG_DATA,
  });
};

export const setErrors = (dispatch) => (errorName, message) => {
  const error = { errorName, message };
  dispatch({
    type: SET_ERRORS,
    send_error: error,
  });
};

export const clearErrors = (dispatch) => () => {
  dispatch({
    type: RESET_ERRORS,
  });
};

export const clearRecipients = (dispatch) => () => {
  dispatch({
    type: RESET_RECIPIENTS,
  });
};
