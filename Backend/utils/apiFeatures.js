class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    //search functionality
    search(){
        const keyword=this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",

            }
        }
        :{};
        this.query=this.query.find({...keyword});
        return this;

    }
    //filter
    filter(){
    const queryCopy = {...this.queryStr};
    //removing some fiels for category
    const removeFields=["keyword","page","limit"];
   removeFields.forEach((key)=>delete queryCopy[key]);

   //filter for price and rating
   let queryStr=JSON.stringify(queryCopy);
   queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

   this.query=this.query.find(JSON.parse(queryStr));
   return this;
}
}
module.exports=ApiFeatures;