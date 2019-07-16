echo '##### CREATING SCRATCH ORG #####'
sfdx force:org:create -f config/project-scratch-def.json -a KnowledgeWidget -s
echo '##### PUSHING METADATA #####'
sfdx force:source:push -u KnowledgeWidget
echo '##### ASSIGNING PERMISSIONS #####'
#sfdx force:user:permset:assign -n Timesheet -u Timesheet
#sfdx force:user:permset:assign -n ForecastedStaffing -u Timesheet
#sfdx force:user:permset:assign -n Leaving_Request_Authorization_for_Admin -u Timesheet
#sfdx force:user:permset:assign -n Org_Access -u Timesheet
echo '##### IMPORTING DUMMY DATA #####'
sfdx force:data:tree:import -f ./data/Account-Project__c.json -u Timesheet
echo '##### OPENING SCRATCH ORG #####'
sfdx force:org:open -p one/one.app#/n/Timesheet -u Timesheet