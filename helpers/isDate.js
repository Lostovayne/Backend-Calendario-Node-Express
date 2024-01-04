import moment from "moment";

const isDate = (value, { req, location, path }) => {
    if (!value) {
        return false;
    }

    const fecha = moment(value);

    if (fecha.isValid()) {
        return true;
    }
    return false;
};

export default isDate;
