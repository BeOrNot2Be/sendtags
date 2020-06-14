/** @format */

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  updateTags,
  updateConfig,
  updateSendTo,
  updateSendType,
  updateSent,
  submitSendTagData,
  clearErrors,
  clearRecipients,
} from "../actions/SendPage";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const SendTagsPage = ({
  tags,
  config,
  sendTo,
  sendType,
  sent,
  recipients,
  updateTags,
  updateConfig,
  updateSendTo,
  updateSendType,
  updateSent,
  submitSendTagData,
  errors,
}) => {
  const handleChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "tags":
        updateTags(value);
        return;
      case "config":
        updateConfig(value);
        return;
      case "sendTo":
        updateSendTo(value);
        return;
      case "sendType":
        const sendTypeValue = value.toUpperCase() === "AND" ? true : false;
        updateSendType(sendTypeValue);
        return;
      default:
        return;
    }
  };

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    submitSendTagData();
    updateSent(true);
  };

  const onFocus = (event) => {
    event.preventDefault();
    clearRecipients();
    updateSent(false);
    clearErrors();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          <div style={{ padding: "30px", textAlign: "center" }}>
            <div>
              <TextField
                style={{ margin: "10px" }}
                id="outlined-search"
                name="tags"
                onChange={handleChange}
                onFocus={onFocus}
                label="Tags (separated by commas):"
                value={tags}
                type="text"
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <TextField
                style={{ margin: "10px" }}
                id="outlined-search"
                name="config"
                onChange={handleChange}
                onFocus={onFocus}
                label="People Configs"
                value={config}
                type="text"
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <TextField
                style={{ margin: "10px" }}
                id="outlined-search"
                name="sendTo"
                onChange={handleChange}
                onFocus={onFocus}
                label="Send To"
                value={sendTo}
                type="text"
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <ToggleButtonGroup
                onFocus={onFocus}
                value={sendType}
                exclusive
                onChange={(event, newAlignment) => updateSendType(newAlignment)}
                aria-label="AND/OR"
              >
                <ToggleButton value={true} aria-label="AND">
                  AND
                </ToggleButton>
                <ToggleButton value={false} aria-label="OR">
                  OR
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button type="submit" value="Send Messages" variant="outlined">
              Submit
            </Button>
          </div>
        </form>
        {sent && (
          <div>
            <p>
              Sent to:{" "}
              {recipients.size < 1
                ? "No matching tags"
                : [...recipients].join(", ")}
            </p>
          </div>
        )}
        {recipients.size < 1 && !!Object.getOwnPropertyNames(errors).length && (
          <span>{JSON.stringify(errors)}</span>
        )}
      </div>
    </ThemeProvider>
  );
};

SendTagsPage.propTypes = {
  tags: PropTypes.string,
  config: PropTypes.string,
  sendTo: PropTypes.string,
  sendType: PropTypes.bool,
  sent: PropTypes.bool,
  recipients: PropTypes.instanceOf(Set),
  errors: PropTypes.instanceOf(Object),
};

const mapStateToProps = (state) => {
  return {
    tags: state.sandTags.tags,
    config: state.sandTags.config,
    sendTo: state.sandTags.sendTo,
    sendType: state.sandTags.sendType,
    sent: state.sandTags.sent,
    recipients: state.sandTags.recipients,
    errors: state.sandTags.errors,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateTags: updateTags(dispatch),
  updateConfig: updateConfig(dispatch),
  updateSendTo: updateSendTo(dispatch),
  updateSendType: updateSendType(dispatch),
  updateSent: updateSent(dispatch),
  submitSendTagData: submitSendTagData(dispatch),
  clearErrors: clearErrors(dispatch),
  clearRecipients: clearRecipients(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SendTagsPage);
