// Validation function that accepts selectedQueryParam and selectedParamValue and returns true if it is a valid combo for fetching
export const validateGeneralQueryCombo = ({ param, value }) => {
    switch (param) {
        case "Instructor":
            return value.length > 0;
            break;
        case "Building":
            return value.length > 0;
            break;
        case "Meeting Days":
            return ["M/W", "T/R", "F"].includes(value);
            break;
        case "Faculty Ratio":
            return ["Most Support", "Least Support"].includes(value);
        default:
            return false;
    }
};
