/** @format */

import {
  UPDATE_TAGS,
  UPDATE_CONFIG,
  UPDATE_SEND_TO,
  UPDATE_SEND_TYPE,
  SUBMIT_SEND_TAG_DATA,
  SET_ERRORS,
  RESET_ERRORS,
  UPDATE_SENT,
  RESET_RECIPIENTS,
} from "../actions/SendPage";

const initialState = {
  recipients: new Set(),
  tags: "",
  config: "",
  sendTo: "",
  sendType: true, // true = and; false = or
  sent: false,
  errors: {},
};

const SendPageReducers = (state = initialState, action) => {
  const { type, send_input } = action;

  switch (type) {
    case UPDATE_TAGS:
      return {
        ...state,
        tags: send_input,
      };
    case UPDATE_CONFIG:
      return {
        ...state,
        config: send_input,
      };
    case UPDATE_SEND_TO:
      return {
        ...state,
        sendTo: send_input,
      };
    case UPDATE_SEND_TYPE:
      return {
        ...state,
        sendType: send_input,
      };

    case UPDATE_SENT:
      return {
        ...state,
        sent: send_input,
      };

    case SUBMIT_SEND_TAG_DATA:
      let error_point;

      try {
        error_point = "Send To";
        const tagsArray = state.sendTo
          .replace(/[“”‘’]/g, '"')
          // eslint-disable-next-line no-useless-escape
          .replace(/\s|\"/g, "")
          .split(",");

        error_point = "Peoples Config";
        const recipients_config = JSON.parse(
          state.config.replace(/[“”‘’]/g, '"')
        );

        const recipients = new Set();

        const allTags = state.tags
          .replace(/[“”‘’]/g, '"')
          // eslint-disable-next-line no-useless-escape
          .replace(/\s|\"/g, "")
          .split(",");

        error_point = "tags";
        if (!tagsArray.every((tag) => allTags.includes(tag))) {
          return {
            ...state,
            errors: {
              ...state.errors,
              "List of all tags is not completed.": `Error in ${error_point} input; Send to field has more tags than the full list.`,
            },
          };
        }

        if (state.sendType) {
          // AND
          for (const person of Object.entries(recipients_config)) {
            if (tagsArray.every((tag) => person[1].includes(tag))) {
              recipients.add(person[0]);
            }
          }
        } else {
          // OR
          for (const person of Object.entries(recipients_config)) {
            for (const tag of tagsArray) {
              if (person[1].includes(tag)) {
                recipients.add(person[0]);
              }
            }
          }
        }

        return {
          ...state,
          tags: "",
          config: "",
          sendTo: "",
          recipients: recipients,
        };
      } catch (error) {
        return {
          ...state,
          errors: {
            ...state.errors,
            [error.errorName]: `Error in ${error_point} input ${error.message}`,
          },
        };
      }

    case SET_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.send_error.errorName]: action.send_error.message,
        },
      };

    case RESET_ERRORS:
      return {
        ...state,
        errors: {},
      };

    case RESET_RECIPIENTS:
      return {
        ...state,
        recipients: new Set(),
      };

    default:
      return {
        ...state,
      };
  }
};

export default SendPageReducers;
