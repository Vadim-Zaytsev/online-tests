async function updateStatistics(action, isSuccess, _csrf) {
    try {
        const response = await fetch('/statistics/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action,
                isSuccess,
                _csrf,
            })
        });

        console.log(response);
    } catch (error) {
        M.toast({html: 'Error sending data', classes: 'red'});
        console.error('Error:', error);
    }
}

export {
    updateStatistics,
}