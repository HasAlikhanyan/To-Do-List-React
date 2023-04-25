
const taskApiUrl = process.env.REACT_APP_API_URL + "/task";

class TaskApi { 
    #request(method, body=null, taskId=null, filters=null) {
        const params = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        }
        if(body !== null) {
            params.body = JSON.stringify(body);
        }
        let url = taskApiUrl;
        if(taskId !== null) {
            url = `${url}/${taskId}`
        }

        if(filters){
            let query = '?';
            Object.entries(filters)
            .forEach(([key, value])=>{
            if(!value){
                return;
            }
                query+= `${key}=${value}&`;
            });
            url+=query;
        }

        return fetch(url, params)
        .then((result) => result.json())
        .then((data) => {
            if(data.error) {
                throw data.error;
            }
            return data;
        });
    }

    getAll(filters) {
        return this.#request("GET", null, null, filters);
    }

    add(task) {
        return this.#request("POST", task);
    }

    update(task, taskId) {
        return this.#request("PUT", task, taskId);
    }

    delete(taskId) {
        return this.#request("DELETE", null, taskId);    
    }

    deleteMany(taskIds) {
        return this.#request("PATCH", {tasks: taskIds});    
    }
}

export default TaskApi;