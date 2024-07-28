///<reference types="cypress" />

const { expect } = require("chai");

describe('Testing LetsDoITurl', () => {
    it('RadioBUTTONS', () => {
        cy.visit("https://www.letskodeit.com/practice");
        cy.xpath("//input[@id='bmwradio']").click();
        cy.xpath("//input[@id='benzradio']").click();
        cy.xpath("//input[@id='hondaradio']").click();
    });
    it('CheckBOXES', () => {
        cy.visit("https://www.letskodeit.com/practice");
        cy.xpath("//input[@id='bmwcheck']").click();
        cy.xpath("//input[@id='bmwcheck']").click();
        cy.xpath("//input[@id='benzcheck']").click();
        cy.xpath("//input[@id='benzcheck']").click();
        cy.xpath("//input[@id='hondacheck']").click();
        cy.xpath("//input[@id='hondacheck']").click();
    });
    it('SwitchWINDOW', () => {
        cy.visit("https://www.letskodeit.com/practice");
        cy.xpath("//button[@class='btn-style class1']").click();
        //backend problem of this button.
        //cy.xpath("//button[@class='btn-style class1']").invoke('removeAttr','onclick').click();
        //cy.origin('/courses',()=>{
        //     cy.visit('');
        //     cy.xpath("//img[@src='https://s3.amazonaws.com/contents.newzenler.com/3072/courses/101487/data/thumb/s-9.jpg']").click();
        //}) 
    });
    it('openingTABinSAMEtab', () => {
        cy.visit("https://www.letskodeit.com/practice");
        cy.xpath("//a[@class='btn-style class1 class2']").invoke('removeAttr','target').click();
    });
    it('DropDOWN', () => {
        cy.visit("https://www.letskodeit.com/practice");
        //by Value
        cy.xpath("//select[@id='carselect']").select('benz').should('have.value','benz');
        cy.wait(2000);
        //by Text
        cy.xpath("//select[@id='carselect']").select('BMW').should('have.value','bmw');
        cy.wait(2000);
        //by Index
        cy.xpath("//select[@id='carselect']").select(2).should('have.value','honda');
        cy.wait(2000);
    });
    it('DynamicDROPDOWN', () => {
        cy.visit("https://www.letskodeit.com/practice");
        cy.xpath("//input[@id='autosuggest']").type("Auto");
        cy.xpath('//li[@class="ui-menu-item"]').each(($option)=>{
            if($option.text()=='Cypress Automation'){
                cy.wrap($option).click();
            }
        })
    });
    it('MultipleSELECTexample', () => {
        cy.visit("https://www.letskodeit.com/practice");
        cy.xpath('//select[@id="multiple-select-example"]/option[1]').click();
        cy.wait(2000);
        cy.xpath('//select[@id="multiple-select-example"]/option[2]').click();
        cy.wait(2000);
        cy.xpath('//select[@id="multiple-select-example"]/option[3]').click();
    });
    it('Enabled/Disabled Example', () => {
        cy.visit("https://www.letskodeit.com/practice");
        cy.xpath('//input[@id="disabled-button"]').click();
        cy.xpath('//input[@id="enabled-example-input"]').should('have.attr','disabled');
        cy.xpath('//input[@id="enabled-button"]').click();
        cy.xpath('//input[@id="enabled-example-input"]').should('not.have.attr','disabled');
        cy.xpath('//input[@id="enabled-example-input"]').type('Enabled')
    });
    it('ElementDisplayedEXAMPLE', () => {
        cy.visit("https://www.letskodeit.com/practice");
        cy.xpath('//input[@id="hide-textbox"]').click();
        cy.xpath('//input[@id="displayed-text"]').should('have.css','display','none');
        cy.xpath('//input[@id="show-textbox"]').click();
        cy.xpath('//input[@id="displayed-text"]').should('have.css','display','block');
        cy.xpath('//input[@id="displayed-text"]').type('Showed')
    });
    it('HandlingALERTSandCONFIRM', () => {
        cy.visit("https://www.letskodeit.com/practice");
        cy.xpath('(//input[@class="inputs"])[2]').type('Hirak');
        cy.xpath('//input[@id="alertbtn"]').click();
        cy.wait(2000);
        cy.on('window:alert',(alertmsg)=>{
            expect(alertmsg).to.equal('Hello Hirak, share this practice page and share your knowledge');
            return true;
        })
        cy.xpath('(//input[@class="inputs"])[2]').type('Hirak');
        cy.xpath('//input[@id="confirmbtn"]').click();
        cy.wait(2000);
        cy.on('window:confirm',(confirmmsg)=>{
            expect(confirmmsg).to.equal('Hello Hirak, Are you sure you want to confirm?');
            return true;
            //for pressing cancel
            //return false
        })
    });
    it('MouseHOVER', () => {
        cy.visit("https://www.letskodeit.com/practice");
        cy.xpath('//div[@class="mouse-hover"]').trigger('mouseover', { force: true }).trigger('mouseenter', { force: true });;
        cy.contains('Top').click({ force: true });
    });
    it('Tables', () => {
        cy.visit('https://www.letskodeit.com/practice');
        cy.xpath('//table[@id="product"]/tbody/tr[2]/td[2]').should('include.text','Selenium WebDriver With Java');
        cy.xpath('//table[@id="product"]/tbody/tr[3]/td').each(($ele)=>{
            if($ele.text().includes('Python Programming Language')){
                cy.wrap($ele).next().then((num)=>{
                    cy.log(num.text())
                })
            }
        })
    });
    it('iFrame', () => {
        cy.visit('https://www.letskodeit.com/practice');
        cy.frameLoaded('#courses-iframe');
    });
});