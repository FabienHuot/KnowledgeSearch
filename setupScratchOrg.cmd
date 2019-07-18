
echo '##### CREATING SCRATCH ORG #####'
call sfdx force:org:create -f config/project-scratch-def.json -a KnowledgeSearch -s
echo '##### PUSHING METADATA #####'
call sfdx force:source:push -u KnowledgeSearch
echo '##### KNOWLEDGE PERMISSIONSET ASSIGNMENT #####'
call sfdx force:user:permset:assign -n KnowledgeUser -u KnowledgeSearch
call sfdx force:user:permset:assign -n KnowledgeAppUser -u KnowledgeSearch
rem echo '##### CREATE KNOWLEDGE USER #####'
rem sfdx force:user:create --setalias qa-user --definitionfile config/user-def.json
echo '##### UPDATING USER USER WITH KNOWLEDGE LICENCE #####'
call sfdx force:data:record:update -s User -w "Name='User User'" -v "UserPermissionsKnowledgeUser=true"
echo '##### IMPORTING KNOWLEDGE DATA #####'
call sfdx force:data:tree:import -f ./data/Knowledge__kav.json -u KnowledgeSearch
echo '##### OPENING SCRATCH ORG #####'
call sfdx force:org:open