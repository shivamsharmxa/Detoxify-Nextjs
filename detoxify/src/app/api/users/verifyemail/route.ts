import {connect} from '../../../../lib/mongodb'
import User from '../../../../models/User'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import { sendEmail } from 'src/helpers/mailer';
import { send } from 'process';


connect()

export async function POST(request:NextResponse) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

       const user = await User.findOne({verifyToken:token,
            verifyTokenExpiry: {$gt: Date.now()}
        })
        if(!user){
           return NextResponse.json({error: "Invalid token"},{status: 400})
        }
        console.log(user);

        return NextResponse.json({
            message: "Email verified Successfully",
            success: true,
        },{status: 500})


    } catch (error:any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
        
    }
    
}