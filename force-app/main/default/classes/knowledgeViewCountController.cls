public with sharing class knowledgeViewCountController {
    public knowledgeViewCountController() {

    }

    @AuraEnabled(cacheable=true)
    public static Integer getViewCount(Id articleId){
        Integer viewCount = 0;
        viewCount = [SELECT Id, ArticleTotalViewCount FROM Knowledge__kav WHERE Id = :articleId LIMIT 1].ArticleTotalViewCount;
        return viewCount;
    }
}
