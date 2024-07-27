import axios from 'axios';

const base_url = 'http://127.0.0.1:8000/';

export const logEvent = (eventType, eventData) => {
    const log = {
        event_type: eventType, 
        event_data: JSON.stringify(eventData), 
    };

    axios.post(`${base_url}api/logs`, log)
        .then(response => {
            console.log('Log sent successfully:', response);
        })
        .catch(error => {
            console.error('Error sending log:', error);
        });
};
