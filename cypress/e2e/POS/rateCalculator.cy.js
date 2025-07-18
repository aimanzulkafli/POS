describe('Pos Malaysia Rate Calculator', () => {
  it('Should calculate rates from Malaysia to India', () => {
    var postcodeFrom = '35600';
    var countryName = 'India';
    var countryTitle = 'India - IN';
    var weight = '1';

    // Step 1: Visit the rate calculator page
    cy.visit('https://pos.com.my/send/ratecalculator');
    
    cy.get('.floating-option-text').invoke('hide'); // Hide the blocking element

    // Step 2: Enter "Malaysia" as From country and "35600" as postcode
    cy.get('input[formControlName="postcodeFrom"]').type(postcodeFrom);

    // Step 3: Enter "India" as To country and leave postcode empty
    cy.get('input[name="country"]')
      .click()
      .clear()
      .type(countryName);
    cy.wait(1000)
    cy.get('[title="'+countryTitle+'"]').click();

    // Step 4: Enter weight and click Calculate
    cy.get('input[formControlName="itemWeight"]').type(weight);
    
    cy.contains('Calculate').click();

    // Step 5: Verify multiple quotes and shipment options are displayed
    cy.get('a:contains(" Book Now ")')
      .should('exist')
      .should('have.length.greaterThan', 1); // Multiple options

    cy.get('a:contains(" Book Now ")').then(($items) => {
      const itemCount = $items.length;  
      cy.log(`Number of Book Now : ${itemCount}`);
    })
  });
});