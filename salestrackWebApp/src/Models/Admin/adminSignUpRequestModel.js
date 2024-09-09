class AdminSignUpRequestModel{
    
    constructor(name="",email="",phoneNumber="",userType=null,reportsTo="") 
    {
        this.name=name,
        this.email=email,
        this.phoneNumber=phoneNumber,
        this.userType=userType,
        this.reportsTo=reportsTo
    }
}