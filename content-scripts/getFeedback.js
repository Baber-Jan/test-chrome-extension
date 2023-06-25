console.log('RUNNING GETFEEDBACK SCRIPT')



const getFeedback = async () => {
    //Return array of feeback objects
    let feedbacks = [];
    let page = 1;
    let hasMore = true;

    let userId = null;
    try{
        const path = window.location.pathname; // e.g., "''/member/59783356-lessthanten"
        const segments = path.split('/'); // splits the path into segments
        userId = segments[2].split('-')[0]; // the user ID is the third segment's first half
    }
    catch(err){
        console.log('Error getting user ID' + err);
        throw new Error('Error getting user ID' + err);
    }
        
    let csrfToken = null;
    try{
        csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    }
    catch(err){
        console.log('Error getting CSRF token' + err);
        throw new Error('Error getting CSRF token' + err);
    }


    while (hasMore) {
        const response = await fetch(`https://www.vinted.co.uk/api/v2/user_feedbacks?user_id=${userId}&page=${page}&per_page=20&by=all`, {
            headers: {
                'accept': 'application/json, text/plain, */*',
                'x-csrf-token': csrfToken
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        feedbacks = [...feedbacks, ...data.user_feedbacks];
        if (data.pagination.current_page === data.pagination.total_pages || data.user_feedbacks.length === 0) {
            hasMore = false;
        }
        else {
            page++;
        }

    }

    return feedbacks;
}


//Please catch any errors 
getFeedback()
.then(feedbacks => console.log(feedbacks))
    .catch(e => console.error(e));