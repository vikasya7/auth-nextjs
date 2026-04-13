import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig"
import bcrypt from "bcryptjs";


connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json();
        const {token,password,confirmPassword}=reqBody
        const user=await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}})
        if(password!==confirmPassword){
            return NextResponse.json({message:"please again confirm password",status:400})
        }
        if(!user){
            return NextResponse.json({message:"not have a registered id",status:400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password=hashedPassword
        user.forgotPasswordToken=undefined
        user.forgotPasswordTokenExpiry=undefined
        await user.save()
        
    } catch (error:unknown) {
        const message =
         error instanceof Error ? error.message : "Internal server error";
        console.error(message);
    }
}