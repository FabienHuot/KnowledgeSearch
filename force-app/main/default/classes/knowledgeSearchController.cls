public with sharing class knowledgeSearchController {
    public knowledgeSearchController() {
    }

    @AuraEnabled
    public static List<RecordType> getKnowledgeRecordTypes(){
        List<RecordType> knowledgeRecordTypesValues = new List<RecordType>();

        // Query all Knowledge__kav active record types
        knowledgeRecordTypesValues = [SELECT Name FROM RecordType WHERE IsActive = true AND SobjectType = 'Knowledge__kav'];
        return knowledgeRecordTypesValues;
    }    


    @AuraEnabled(cacheable=true)
    public static List<Knowledge__kav> KnowledgeArticles(String input, String cat) {
        List<Knowledge__kav> knowledgeArticlesList = new List<Knowledge__kav>();
        
        // Searching in Knowledge Subject
        if (input != '' && input != null) {
            String knowledgeQuery = '';
            if (cat != null && cat != '' && cat != 'Tous') {
                knowledgeQuery = 'SELECT Id, Title, Cible__c, Summary FROM Knowledge__kav WHERE Title LIKE \'%' + input + '%\' AND Cible__c INCLUDES (\''+ cat + '\')  LIMIT 10';
            }
            else {
                knowledgeQuery = 'SELECT Id, Title, Cible__c, Summary FROM Knowledge__kav WHERE Title LIKE \'%' + input + '%\' LIMIT 10';
            }
            knowledgeArticlesList = Database.query(knowledgeQuery);
        }
        return knowledgeArticlesList;
    }
}
