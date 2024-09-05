class ApiResponse {
    constructor(isSuccess, message = "", warningMessage = "", result = null, statusCode = 200) 
    {
      this.isSuccess=isSuccess;
      this.message=message;
      this.warningMessage=warningMessage;
      this.result=result;
      this.statusCode=statusCode;
    }
  }
  
  export default ApiResponse
  