export class LoginResponse{

    constructor(fullName="",isPasswordTemporary=false,token="",userId=null,userRole=null) 
    {
        this.fullName=fullName;
        this.isPasswordTemporary=isPasswordTemporary;
        this.token=token;
        this.userId=userId;
        this.userRole=userRole;
    }
}