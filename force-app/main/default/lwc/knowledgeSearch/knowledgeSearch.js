import { LightningElement, track, wire, api } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';

import getKnowledgeRecordTypes from '@salesforce/apex/knowledgeSearchController.getKnowledgeRecordTypes';
//import getPicklistValues from '@salesforce/apex/knowledgeSearchLWC.getPicklistValues_old';

export default class KnowledgeSearchLWC extends NavigationMixin(LightningElement) {
    @track article;
    @track articleList = [];


    @track results

    @track cible = 'Tous';
    @track rt;

    @api displayCard;

    get componentClass() {
        return (this.displayCard ? 'slds-page-header' : 'slds-m-around_medium');
    }

    @wire(getKnowledgeRecordTypes)
    wiredCibles({error, data}) {
        if (data) {
            this.rt = data;
            console.log('data', data);
            this.error = undefined;
        }
        if (error) {
            this.error = error;
            console.log('data error', data);
            this.rt = undefined;
        }
    };
    
    /*@wire(KnowledgeArticles, {input : '$article', cat : '$cible'})
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
    }*/

    changeHandler(event) {
        this.article = event.target.value;
    }

    handleCible(event) {
        this.rt = event.target.value;
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