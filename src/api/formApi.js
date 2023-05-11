import Api
 from "./api";
const formApiUrl = process.env.REACT_APP_API_URL + "/form";

class FormApi extends Api { 
    constructor() {
        super(formApiUrl);
    }

    sendForm(form) {
        return this.request("POST", {body: form});
    }
}

export default FormApi;