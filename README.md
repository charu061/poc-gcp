# POC On NodeJs

We are creating a cloud function using NodeJs code which will read data from csv file and push the data into bigtable and return output in the json format.

## Getting Started

* Create a Google Cloud Storage bucket.
* We have a sample csv file which contains employee data like name, address, phone and email. We need to upload this sample csv file to cloud storage bucket.
* Now we will create a cloud function which will trigger the cloud storage bucket created in task 1. This function is written in nodejs
* The cloud function will read the contents of uploaded csv file as it is triggering the GCS bucket.
* We will create big-table instance and push the contents of uploaded csv file into bigtable.
* The cloud function will return total number of records processed into bigtable and the output is in json format.

### Prerequisites
NodeJs Client APIs and other dependencies must be updated correctly in package.json file in cloud function.
```
{
    "name": "sample-cloud-storage",
    "version": "0.0.1",
    "dependencies": {
      "@google-cloud/storage": "^1.6.0",
      "@google-cloud/bigtable": "^2.0.5",
      "fast-csv": "^3.4.0"
    }
  }
  ```
