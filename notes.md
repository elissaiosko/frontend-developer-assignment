## Notes

# Run the project
yarn start

# Run tests
yarn run test

### General notes about the implementation
- About the group of emails <br/>
  There is the following scenario. There is a group
<pre>
       - timescale.com<br/>
            - ann@timescale.com +  
            - bob@timescale.com
</pre>

When user clicks + for selecting ann@timescale.com, ann@timescale.com is moved from available recipients to 
selected recipients. Then timescale.com contains bob@timescale.com and it is still a group because it indicates company 
emails which are 2 in total. <br/>
If for this scenario we go another way and remove timescale from groups because it only contains
bob@timescale.com and move it to individual recipient list UX won't be user friendly.
I did it like that initially and I changed it. In case you expect it another way please just let me know and 
I can easily adjust it.



- Add new item <br/>
For adding a new email user has to place a valid email that does not exist in search input.
Then an add icon appears, and if user clicks that icon or press enter they can add it.



- About testing:
I added unit tests for specific functions and I also tested using React testing library
the Recipients component (some common scenarios) with the approach that this library recommends.
