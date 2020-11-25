import Axios from "axios";

class Http
{
    constructor()
    {

    }

    /**
     * @function SendJsonDataToServer
     * @param    path
     * @param    data
     * @param    method
     * @param    config
     */
    async SendJsonDataToServer(path, data = {}, method, config)
    {
        let StringifyData = JSON.stringify(data);

        switch(method)
        {
            case "POST":
            {
                return await Axios.post(path, StringifyData, config);
            }
            case "PUT":
            {
                return await Axios.put(path, StringifyData, config);
            }
            case "PATCH":
            {
                return await Axios.patch(path, StringifyData, config);
            }
        }
    }

    /**
     * @param  path
     * @param  data
     * @param  method
     */
    async SendFormDataToServer(path, data = {}, method)
    {
        let bodyData = new FormData();
        Object.keys(data).forEach(key =>
        {
            bodyData.append(key.toString(), data[key]);
        });

        switch(method)
        {
            case "POST":
            {
                return await Axios.post(path, bodyData);
            }
            case "PUT":
            {
                return await Axios.put(path, bodyData);
            }
            case "PATCH":
            {
                return await Axios.patch(path, bodyData);
            }
        }
    }

    /**
     * @param path
     * @param method
     */
    async FetchAllData(path, method = "GET")
    {
        switch(method)
        {
            case "GET":
            {
                return await Axios.get(path)
            }
        }
    }
}

export default Http;