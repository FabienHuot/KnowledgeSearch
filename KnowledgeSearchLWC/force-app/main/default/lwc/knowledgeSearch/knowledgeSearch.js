import { LightningElement, track, wire, api } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';

import KnowledgeArticles from '@salesforce/apex/knowledgeSearchLWC.KnowledgeArticles';
import getPicklistValues from '@salesforce/apex/knowledgeSearchLWC.getPicklistValues_old';

export default class KnowledgeSearchLWC extends NavigationMixin(LightningElement) {
    @track article;
    @track articleList = [];

    @track display;

    @track results

    @track cible = 'Tous';
    @track cibles;

    @api displayCard;

    get componentClass() {
        return (this.displayCard ? 'slds-page-header' : 'slds-m-around_medium');
    }

    @wire(getPicklistValues, {ObjectApi_name : 'Knowledge__kav', Field_name : 'Cible__c'})
    wiredCibles({error, data}) {
        if (data) {
            this.cibles = data;
            this.error = undefined;
        }
        if (error) {
            this.error = error;
            this.cibles = undefined;
        }
    };
    
    @wire(KnowledgeArticles, {input : '$article', cat : '$cible'})
    wiredArticles({error, data}) {
        if (data) {

            this.articleList = [];
            for (let article of data) {
                let myArticle = {};
                myArticle.data = article;

                // Get article url
                this.KnowledgePageRef = {
                    type: "standard__recordPage",
                    attributes: {
                        "recordId": article.Id,
                        "objectApiName": "Knowledge__kav",
                        "actionName": "view"
                    }
                };

                this[NavigationMixin.GenerateUrl](this.KnowledgePageRef)
                    .then(articleUrl => {
                        myArticle.url = articleUrl; 
                        this.articleList.push(myArticle);
                    });
            }

            this.error = undefined;
        }
        if (error) {
            this.error = error;
            this.articleList = undefined;
        }
    }

    showDetails() {
        this.display = !this.display;
    }

    changeHandler(event) {
        this.article = event.target.value;
    }

    handleCible(event) {
        this.cible = event.target.value;
    }

    redirectToArticle(event) {
            // Navigate to the CaseComments related list page
            // for a specific Case record.
            event.preventDefault();

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