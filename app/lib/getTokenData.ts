import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export default class getTokenData {
    protected cookieName: any = process.env.LOGIN_COOKIE;
    protected secret: any = process.env.SECRECT_KEY;
    protected token: any;
    protected decodedToken: any;

    constructor(request: NextRequest) {
        this.token = request.cookies.get(this.cookieName)?.value || "";
        this.decodedToken = jwt.verify(this.token, this.secret!);
    }

    public userID() {
        return this.decodedToken.user_id;
    }
    public firstName() {
        return this.decodedToken.firstName;
    }
    public lastName() {
        return this.decodedToken.lastName;
    }
    public pinCode() {
        return this.decodedToken.pinCode;
    }
    public mobile() {
        return this.decodedToken.mobile;
    }
}