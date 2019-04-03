import { LightningElement, track, wire } from 'lwc';
//import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { NavigationMixin } from 'lightning/navigation';

import SOLUTION from '@salesforce/schema/Knowledge__kav.Solution__c';

import KnowledgeArticles from '@salesforce/apex/knowledgeSearchLWC.KnowledgeArticles';
import getPicklistValues from '@salesforce/apex/knowledgeSearchLWC.getPicklistValues_old';

export default class KnowledgeSearchLWC extends NavigationMixin(LightningElement) {
    @track article;
    @track articleList;
    @track articleListLength;

    @track solution;
    @track solutions;
    
    @track results

    @track cible;
    @track cibles;

    @track support;
    @track supports;


    @wire(getPicklistValues, {ObjectApi_name : 'Knowledge__kav', Field_name : 'Cible__c'})
    wiredCibles({error, data}) {
        if (data) {
            this.cibles = data;
            console.log('picklist value :', data);
            this.error = undefined;
        }
        if (error) {
            this.error = error;
            console.log('error');
            this.cibles = undefined;
        }
    };

    @wire(getPicklistValues, {ObjectApi_name : 'Knowledge__kav', Field_name : 'Solution__c'})
    wiredSolutions({error, data}) {
        if (data) {
            this.solutions = data;
            console.log('picklist value :', data);
            this.error = undefined;
        }
        if (error) {
            this.error = error;
            console.log('error');
            this.solutions = undefined;
        }
    };

    @wire(getPicklistValues, {ObjectApi_name : 'Knowledge__kav', Field_name : 'Support__c'})
    wiredSupports({error, data}) {
        if (data) {
            this.supports = data;
            console.log('picklist value :', data);
            this.error = undefined;
        }
        if (error) {
            this.error = error;
            console.log('error');
            this.supports = undefined;
        }
    };
    
    @wire(KnowledgeArticles, {input : '$article', cat : '$cible'})
    wiredArticles({error, data}) {
        if (data) {
            this.articleList = data;
            this.articleListLength = data.length;
            console.log('data :', data);
            this.error = undefined;
        }
        if (error) {
            this.error = error;
            console.log('error');
            this.articleList = undefined;
        }
    }

    /*@wire(getPicklistValues, { recordTypeId: '0121l0000008kf7AAA', fieldApiName: SOLUTION })
    solutionsResult({error, data}) {
        if (data) {
            this.solutions = data;
            console.log('data :', data);
            this.error = undefined;
        }
        if (error) {
            this.error = error;
            console.log('error');
            this.solutions = undefined;
        }
    }*/

    changeHandler(event) {
            this.article = event.target.value;
            //this.categorie = 'Client';
            console.log(this.categories);
    }

    handleCible(event) {
        this.cible = event.target.value;
    }

    handleSupport(event) {
        this.support = event.target.value;
    }

    handleSolution(event) {
        this.solution = event.target.value;
    }

    redirectToArticle(event) {
            // Navigate to the CaseComments related list page
            // for a specific Case record.
            console.log('2', event.currentTarget.dataset.toto);
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: event.currentTarget.dataset.toto,
                    objectApiName: 'Knowledge__kav',
                    actionName: 'view'
                }
            });
    }
}