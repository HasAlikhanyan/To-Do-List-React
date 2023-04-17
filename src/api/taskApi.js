
const taskApiUrl = process.env.REACT_APP_API_URL + "/task";

class TaskApi { 
    #request(method, body=null, taskId=null) {
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

        return fetch(url, params)
        .then((result) => result.json())
        .then((data) => {
            if(data.error) {
                throw data.error;
            }
            return data;
        });
    }

    getAll() {
        return this.#request("GET");
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