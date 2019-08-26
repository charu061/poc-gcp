Task 1:
Create a Google Cloud Storage bucket.
Task 2: 
We have a sample csv file which contains employee data like name, address, phone and email. We need to upload this sample csv file to cloud storage bucket.
Task 3:
Now we will create a cloud function which will trigger the cloud storage bucket created in task 1. This function is written in nodejs
Task 4:
The cloud function will read the contents of uploaded csv file as it is triggering the GCS bucket.
Task 5:
We will create big-table instance and push the contents of uploaded csv file into bigtable.
Task 6:
The cloud function will return total number of records processed into bigtable and the output is in json format.
