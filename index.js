const Bigtable = require('@google-cloud/bigtable');
const TABLE_ID = 'Hello-Bigtable';
const COLUMN_FAMILY_ID = 'cf1';
const INSTANCE_ID = 'testinstance';
var storage = require('@google-cloud/storage')();
var csv = require('fast-csv');

var dataArray=[];
var output={};

// Reading data from test.csv file and push it into array
exports.myGCS = (event, context) => {
  var datastream=storage
 .bucket('taskpoc')
 .file('test.csv')
 .createReadStream();
 
 csv.parseStream(datastream,{headers:true})
 .on('data',function(data){
   dataArray.push(data);
 })
 .on('end',()=>{
     console.log(dataArray);
     output['Rows processed']=dataArray.length;
     console.log(output);
 });
 
 // Creating big-table instance and check whether table exists 
 async function writeBT (){
  try {
    const bigtableClient = new Bigtable();
    const instance = bigtableClient.instance(INSTANCE_ID);

    const table = instance.table(TABLE_ID);
    const [tableExists] = await table.exists();
    if (!tableExists) {
      console.log(`Creating table ${TABLE_ID}`);
      const options = {
        families: [
          {
            name: COLUMN_FAMILY_ID,
            rule: {
              versions: 1,
            },
          },
        ],
      };
      await table.create(options);
    }

    console.log('Writing into the table');
    const employees = dataArray;
    const rowsToInsert = employees.map((employee, index) => ({
      key: `Employee${index}`,
      data: {
        [COLUMN_FAMILY_ID]: {
          ['Name']: {
            timestamp: new Date(),
            value: employees[index].NAME,
          },
          ['Address']: {
            timestamp: new Date(),
            value: employees[index].ADDRESS,
          },
          ['Phone']: {
            timestamp: new Date(),
            value: employees[index].PHONE,
          },
          ['Email']: {
            timestamp: new Date(),
            value: employees[index].EMAIL,
          },
        },
      },
    }));
    await table.insert(rowsToInsert);
  }
  catch(e){
  console.log(e);
  }
}    
  writeBT();
};
