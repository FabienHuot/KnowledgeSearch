# Knowledge Search Lightning Web Component
Lightning Web Component used for searching Lightning Knowledge articles


How to use it :<br/>
    <b>Step 1 )</b> Clone the repo<br/>
    <b>Step 2 )</b> Run the command : <b>./setupScratchOrg<br/></b>
    <b>Step 3 )</b> Create cases with record types (QA Salesforce, QA Trailhead)</b><br/>
    <b>Step 4 )</b> Open the component and search for articles</b><br/>
    
        This script will setup a scratch org with this configuration :<br/>
            - Pushging Metadata (Application, Apex Classes, FlexiPage, LWC)<br/>
            - Set the permission set to be a Knowledge User<br/>
            - Set the permission set to access to the Knowledge App<br/>
            - Importing demo's articles<br/>

Current version :

    - Adding redirection to Knowledge articles in a new browser tab.
    - Available for both Lightning Record Page && Utility Bar Item
    - Conditionnal styling (utility component / lightning web component)


TODO : 

    - Remove the "hide/show" when the component is used in the utility bar
    - Make inputs and filters dynamically.

    Scratch Org :

    - Generate a username for the new knowledge user created
    - Enable the 'Organization Admins Can Login as Any User' feature by default
    
