console.log('RUNNING FILL PRODUCT SCRIPT')

const product = {
    title: 'Grey Shirt',
    description: 'A great grey shirt',
    price: '50',
}
const waitForElemnet = (selector) =>{
    return new Promise(resolve => {
        const elem = document.querySelector(selector)
        if (elem) {
            return resolve(elem);
        }

        const observer = new MutationObserver(() => {
            const element = document.querySelector(selector)
            if (element) {
                resolve(element);
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
const fillProduct = async () => {
    //Fills form
    // Get the input elements
    let titleElement = await waitForElemnet('input[id="title"]');
    let descriptionElement = await waitForElemnet('textarea[id="description"]');
    let priceElement = await waitForElemnet('input[id="price"]');
    let saveDraftButton = await waitForElemnet('button[data-testid="upload-form-save-draft-button"]');
    if (titleElement == null || descriptionElement == null || priceElement == null || saveDraftButton == null){
        console.log('Error getting the elements of the form');
        throw new Error('Error getting the elements of the form');
    }
    //  Fill the input elements
    titleElement.value = product.title;
    titleElement.dispatchEvent(new Event('input', { bubbles: true }));

    
    
    descriptionElement.value = product.description;
    descriptionElement.dispatchEvent(new Event('input', { bubbles: true }));
    
    // Convert the price to a number
    priceElement.focus();
    priceElement.value = product.price;
    priceElement.dispatchEvent(new Event('input', { bubbles: true }));
    // priceElement.blur();

    // Click the save draft button
    saveDraftButton.click();

}
// window.onload = function() {
//   fillProduct().catch(err => console.log(err))
// };
fillProduct().catch(err => console.log(err))


// --------------------------- EXTRA Console Code ---------------------------
// To delete drafts 

// for(let i = 0; i < res.drafts.length; i++){
//     id = res.drafts[i].id
//     await fetch(`https://www.vinted.co.uk/api/v2/items/drafts/${id}`, {
//         "headers": {
//         "accept": "application/json, text/plain, */*",
//         "accept-language": "en-uk-fr",
//         "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
//         "sec-ch-ua-mobile": "?1",
//         "sec-ch-ua-platform": "\"Android\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-csrf-token": "ofLKygCOxbU9XnxQqU-0Jo2Ajhj1-kP_HLppd-mdFrJe6Le9VUplgsA8J42Vd8E2EeeWYuX5fsRzhLPJinvGfQ"
//         },
//         "referrer": "https://www.vinted.co.uk/items/3174226039/edit",
//         "referrerPolicy": "strict-origin-when-cross-origin",
//         "body": null,
//         "method": "DELETE",
//         "mode": "cors",
//         "credentials": "include"
//     });
// }