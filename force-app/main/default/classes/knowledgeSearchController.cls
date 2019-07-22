public with sharing class knowledgeSearchController {
    public knowledgeSearchController() {
    }

    @AuraEnabled(cacheable=true)
    public static List<String> KnowledgeRecordTypes(){
        List<String> knowledgeRecordTypesValues = new List<String>();

        // Query all Knowledge__kav active record types
        for (RecordType rt : [SELECT Name FROM RecordType WHERE IsActive = true AND SobjectType = 'Knowledge__kav']) {
            knowledgeRecordTypesValues.add(rt.Name);
        }
        System.debug('knowledgeRecordTypesValues:' + knowledgeRecordTypesValues);
        return knowledgeRecordTypesValues;
    }    


    @AuraEnabled(cacheable=true)
    public static List<Knowledge__kav> KnowledgeArticles(String input, String cat) {
        List<Knowledge__kav> knowledgeArticlesList = new List<Knowledge__kav>();
        
        // Searching in Knowledge Subject
        if (input != '' && input != null) {
            String knowledgeQuery = '';
            if (cat != null && cat != '' && cat != 'All') {
                knowledgeQuery = 'SELECT Id, Title, Summary FROM Knowledge__kav WHERE Title LIKE \'%' + input + '%\' AND RecordType.Name = ' + '\'' + cat + '\' LIMIT 10';
            }
            else {
                knowledgeQuery = 'SELECT Id, Title, Summary FROM Knowledge__kav WHERE Title LIKE \'%' + input + '%\' LIMIT 10';
            }
            knowledgeArticlesList = Database.query(knowledgeQuery);
        }
        return knowledgeArticlesList;
    }
}
