/*Dnymaically updates the body that is used during POST method.
In the body you select raw->json and in the content add "{{req_body}}"*/
let data_index=pm.environment.get("data_index"); //this is integer value of data[i] to use for this cycle, at the end it will increase or set to 0
let data_max=pm.environment.get("data_max"); //this is the count of data[i] existing
console.log("data="+"data["+data_index+"]");
try{
    let inputData=pm.environment.get("data["+data_index+"]"); //gets the value from environment named 'data[i]' where i is an integer value from 0 to max
    console.log("inputData="+inputData);
    let jsonData=JSON.parse(inputData);// converts it to json
    console.log("jsonData="+jsonData);
    let body=JSON.stringify(jsonData)//converts it back to text
    console.log("body="+body);
    pm.collectionVariables.set('req_body', body);//places text to environment named 'req_body'.
    //pm.variables.set('body', jsonData);
}catch(e){
    console.error(e); 
    pm.collectionVariables.set('req_body', "");
    pm.test("Exception:", function () {
        throw new Error(e.message);
    });
}
if(data_index>=data_max-1){
    pm.environment.set("data_index",0);
}else{
    data_index++
    console.log("data_index="+data_index);
    pm.environment.set("data_index",data_index);
}
