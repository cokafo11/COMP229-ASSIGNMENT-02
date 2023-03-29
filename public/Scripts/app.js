/*Name: Caleb Okafor (301151683)
  Course: COMP229 Assignment 01
  Date: Feb 12, 2022.
  Description: JavaScript file to test the application.*/
(function() {
    function start() {
        console.log("App started...");
        let deleteButton = document.querySelectorAll('.btn-danger');
        for(button of deleteButton) {
          button.addEventListener('click', (event) => {
            if(!confirm("Are you sure?")) {
              event.preventDefault();
              window.location.assign('/contactList')
            }
          });
        }
    }
    window.addEventListener("load", start);
})();