console.log('RUNNING FILL PRODUCT SCRIPT')

const product = {
    title: 'Grey Shirt',
    description: 'A great grey shirt',
    price: '50',
}

const fillProduct = async () => {
    //Fills form
    // Get the input elements
    let titleElement = document.getElementById('title');
    let descriptionElement = document.getElementById('description');
    let priceElement = document.getElementById('price');
    let saveDraftButton = document.querySelector('button[data-testid="upload-form-save-draft-button"]');
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
window.onload = function() {
  fillProduct().catch(err => console.log(err))
};
