const createRequest = (options = {}) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const { url, method = 'GET', body = null, headers = {} } = options;

        xhr.open(method, url, true);

        for (const [key, value] of Object.entries(headers)) {
            xhr.setRequestHeader(key, value);
        }

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
                    resolve(data);
                } catch (e) {
                    reject(e);
                }
            } else {
                reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`));
            }
        });

        xhr.addEventListener('error', () => {
            reject(new Error('Network error'));
        });

        xhr.send(body);
    });
};

export default createRequest;
