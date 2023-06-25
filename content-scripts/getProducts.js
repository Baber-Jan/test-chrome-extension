console.log('RUNNING GETPRODUCTS SCRIPT')

const getProducts = async () => {
    //Returns array of product objects
    let products = [];
    let page = 1;
    let hasMore = true;
    let userId = null;
    try{
        const path = window.location.pathname; // e.g., "/member/59783356-lessthanten"
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
        const response = await fetch(`https://www.vinted.co.uk/api/v2/users/${userId}/items?page=${page}&per_page=20&order=relevance`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-uk-fr",
            "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrf-token": csrfToken,
            "x-money-object": "true"
        },
        "referrer": "https://www.vinted.co.uk/member/59783356-lessthanten",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
        });
    
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        products = products.concat(data.items);
        if (data.pagination.current_page === data.pagination.total_pages || data.items.length === 0) {
            hasMore = false;
        }
        else {
            page++;
        }
    }
    
    return products;
      
}

//Please catch any errors 
getProducts().then(products => {
    console.log(products);
  }).catch(error => {
    console.error('There was an error!', error);
  });
