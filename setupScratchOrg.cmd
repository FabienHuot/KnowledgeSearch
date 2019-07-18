
echo '##### CREATING SCRATCH ORG #####'
call sfdx force:org:create -f config/project-scratch-def.json -a KnowledgeSearch -s
echo '##### PUSHING METADATA #####'
call sfdx force:source:push -u KnowledgeSearch
call sfdx force:user:permset:assign -n KnowledgeUser -u KnowledgeSearch
echo '##### OPENING SCRATCH ORG #####'
call sfdx force:org:open