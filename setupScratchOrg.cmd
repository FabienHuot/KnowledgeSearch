
echo '##### CREATING SCRATCH ORG #####'
call sfdx force:org:create -f config/project-scratch-def.json -a KnowledgeSearch -s
echo '##### PUSHING METADATA #####'
call sfdx force:source:push -u KnowledgeSearch
echo '##### KNOWLEDGE PERMISSIONSET ASSIGNMENT #####'
call sfdx force:user:permset:assign -n KnowledgeUser -u KnowledgeSearch
echo '##### CREATE KNOWLEDGE USER #####'
sfdx force:user:create --setalias qa-user --definitionfile config/user-def.json
echo '##### OPENING SCRATCH ORG #####'
call sfdx force:org:open