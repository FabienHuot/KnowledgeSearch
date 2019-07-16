
echo '##### CREATING SCRATCH ORG #####'
sfdx force:org:create -f config/project-scratch-def.json -a KnowledgeWidget -s
echo '##### PUSHING METADATA #####'
sfdx force:source:push -u KnowledgeWidget
echo '##### OPENING SCRATCH ORG #####'
sfdx force:org:open