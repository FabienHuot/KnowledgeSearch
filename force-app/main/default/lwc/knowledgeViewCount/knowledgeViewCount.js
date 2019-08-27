import { LightningElement, api, wire, track } from 'lwc';

import getViewCount from '@salesforce/apex/knowledgeViewCountController.getViewCount';


export default class KnowledgeViewCount extends LightningElement {

    @api recordId;
    @track viewCount;

    @wire(getViewCount, {articleId: '$recordId'})
    wiredViewCount({error, data}) {
        if (data) {
            console.log('data', data);
            this.viewCount = data;
            
        } else {
            console.log('error', error);
            //console.log('recordId', recordId);
        }
    }

}